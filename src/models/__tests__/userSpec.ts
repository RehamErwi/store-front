import db from '../../database';
import User from '../../types/user.type';
import UserModel from '../user.model';

const userModel = new UserModel();

describe('User Model', () => {
    describe('Check If User CRUD Operations Exists', () => {
        it('Should have createUser method', () => {
            expect(userModel.create).toBeDefined();
        });

        it('Should have getUsers method', () => {
            expect(userModel.getUsers).toBeDefined();
        });

        it('Should have getUser method', () => {
            expect(userModel.getUser).toBeDefined();
        });

        it('Should have updateUser method', () => {
            expect(userModel.updateUser).toBeDefined();
        });

        it('Should have deleteUser method', () => {
            expect(userModel.deleteUser).toBeDefined();
        });
    });

    describe('Test User Model Logic', () => {
        const user = {
            email: 'test1@example.com',
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

        it('Create method should return a new user', async () => {
            const createdUser = await userModel.create({
                email: 'test2@example.com',
                user_name: 'testUser',
                first_name: 'Test',
                last_name: 'User',
                password: 'test123',
            } as User);
            expect(createdUser).toEqual({
                id: createdUser.id,
                email: 'test2@example.com',
                user_name: 'testUser',
                first_name: 'Test',
                last_name: 'User',
            } as User);
        });

        it('getUsers method should return all users', async () => {
            const users = await userModel.getUsers();
            expect(users.length).toBe(2);
        });

        it('getUser by ID method should return testUser', async () => {
            const returnedUser = await userModel.getUser(user.id as string);
            expect(returnedUser.id).toBe(user.id);
            expect(returnedUser.email).toBe(user.email);
            expect(returnedUser.user_name).toBe(user.user_name);
            expect(returnedUser.first_name).toBe(user.first_name);
            expect(returnedUser.last_name).toBe(user.last_name);
        });

        it('updateUser method should return updated user', async () => {
            const updatedUser = await userModel.updateUser({
                ...user,
                user_name: 'updatedUser',
                first_name: 'updated',
                last_name: 'user',
            });
            expect(updatedUser.id).toBe(user.id);
            expect(updatedUser.email).toBe(user.email);
            expect(updatedUser.user_name).toBe('updatedUser');
            expect(updatedUser.first_name).toBe('updated');
            expect(updatedUser.last_name).toBe('user');
        });

        it('deleteUser should delete user from DB', async () => {
            const deletedUser = await userModel.deleteUser(user.id as string);
            expect(deletedUser.id).toBe(user.id);
        });
    });
});
