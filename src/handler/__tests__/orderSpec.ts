// import supertest from 'supertest';
// import app from '../..';
// import db from '../../database';
// import { Order } from '../../models/order';
// import UserModel, { User } from '../../models/user';

// const userModel = new UserModel();

// const request = supertest(app);
// let token = '';

// describe('Order API Endpoints', () => {
//     const user = {
//         email: 'orderTest@test.com',
//         user_name: 'orderTest',
//         first_name: 'order',
//         last_name: 'test',
//         password: 'test123',
//     } as User;

//     beforeAll(async () => {
//         const testUser = await userModel.create(user);
//         user.id = testUser.id;
//     });

//     afterAll(async () => {
//         const connection = await db.connect();
//         const sql = 'DELETE FROM orders; DELETE FROM users;';
//         await connection.query(sql);
//         connection.release();
//     });

//     describe('Authenticate user', () => {
//         it('Should get user authentication token', async () => {
//             const res = await request
//                 .post('/users/authenticate')
//                 .set('Content-type', 'application/json')
//                 .send({
//                     email: 'orderTest@test.com',
//                     password: 'test123',
//                 });

//             const { token: userAuthToken } = res.body.data;
//             token = userAuthToken;
//         });
//     });

//     describe('Test Order CRUD API methods', () => {
//         it('should create new order', async () => {
//             const res = await request
//                 .post('/orders')
//                 .set('Content-type', 'application/json')
//                 .send({
//                     user_id: user.id,
//                     status: 'active',
//                 } as Order);
//             expect(res.status).toBe(200);

//             const { user_id, status } = res.body.data;
//             expect(user_id).toBe(user.id);
//             expect(status).toBe('active');
//         });
//     });
// });
