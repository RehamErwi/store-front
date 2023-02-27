import supertest from 'supertest';
import app from '..';
import db from '../database';
import UserModel, { User } from '../models/user';

const userModel = new UserModel();
const request = supertest(app);
let token = '';

describe('Endpoints', () => {
    const user = {
        email: 'endpointTest@test.com',
        user_name: 'endpointTest',
        first_name: 'endpoint',
        last_name: 'test',
        password: 'test123',
    } as User;

    beforeAll(async () => {
        const testUser = await userModel.create(user);
        user.id = testUser.id;
    });

    afterAll(async () => {
        const connection = await db.connect();
        const sql = 'DELETE FROM users;';
        await connection.query(sql);
        connection.release();
    });

    describe('Authenticate user', () => {
        it('Should get user authentication token', async () => {
            const res = await request
                .post('/users/authenticate')
                .set('Content-type', 'application/json')
                .send({
                    email: 'endpointTest@test.com',
                    password: 'test123',
                });

            const { token: userAuthToken } = res.body.data;
            token = userAuthToken;
        });
    });

    describe('Check existing endpoints', () => {
        it('Get /users endpoint', async () => {
            await request
                .get('/users')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        });

        it('Get /orders endpoint', async () => {
            await request
                .get(`/orders/${user.id}`)
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        });

        it('Get /products endpoint', async () => {
            await request
                .get('/products')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);
        });
    });
});
