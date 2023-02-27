import supertest from 'supertest';
import app from '../..';
import db from '../../database';
import UserModel, { User } from '../../models/user';

const userModel = new UserModel();
const request = supertest(app);
let token = '';

describe('User API Endpoints', () => {
    const user = {
        email: 'userTest@test.com',
        user_name: 'userTest',
        first_name: 'user',
        last_name: 'test',
        password: 'test123',
    } as User;

    beforeAll(async () => {
        const newUser = await userModel.create(user);
        user.id = newUser.id;
    });

    afterAll(async () => {
        const connection = await db.connect();
        const sql = 'DELETE FROM users;';
        await connection.query(sql);
        connection.release();
    });

    describe('Test Authenticate methods', () => {
        it('should be able to authenticate to get token', async () => {
            const res = await request
                .post('/users/authenticate')
                .set('Content-type', 'application/json')
                .send({
                    email: 'userTest@test.com',
                    password: 'test123',
                });
            expect(res.status).toBe(200);
            const { id, email, token: userToken } = res.body.data;
            expect(id).toBe(user.id);
            expect(email).toBe(user.email);
            token = userToken;
        });
    });

    describe('Test User CRUD API methods', () => {
        it('should create new user', async () => {
            const res = await request
                .post('/users/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    email: 'newUser1@test.com',
                    user_name: 'newUser1',
                    first_name: 'new',
                    last_name: 'user2',
                    password: 'test123',
                } as User);
            expect(res.status).toBe(200);
            const { email, user_name, first_name, last_name } = res.body.data;
            expect(email).toBe('newUser1@test.com');
            expect(user_name).toBe('newUser1');
            expect(first_name).toBe('new');
            expect(last_name).toBe('user2');
        });
    });
});
