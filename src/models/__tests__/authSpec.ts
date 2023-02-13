import db from '../../database';
import User from '../../types/user.type';
import UserModel from '../user.model';

const userModel = new UserModel();

describe('Test user authentication', () => {
    describe('Check if user authentication method is defined', () => {
        it('Should have authentication user method', () => {
            expect(userModel.authenticate).toBeDefined();
        });
    });

    describe('Auth logic', () => {
        const user = {
            email: 'test@example.com',
            user_name: 'testUser',
            first_name: 'Test',
            last_name: 'User',
            password: 'test123',
        } as User;

        beforeAll(async () => {
            const createUser = await userModel.create(user);
            user.id = createUser.id;
        });

        afterAll(async () => {
            const connection = await db.connect();
            const sql = 'DELETE FROM users';
            await connection.query(sql);
            connection.release();
        });

        it('Auth method should return auth user', async () => {
            const authUser = await userModel.authenticate(
                user.email,
                user.password as string
            );
            expect(authUser?.email).toBe(user.email);
            expect(authUser?.user_name).toBe(user.user_name);
            expect(authUser?.first_name).toBe(user.first_name);
            expect(authUser?.last_name).toBe(user.last_name);
        });

        it('Auth method should return null', async () => {
            const authUser = await userModel.authenticate(
                'notExist@test.com',
                'wrongPass'
            );
            expect(authUser).toBe(null);
        });
    });
});
