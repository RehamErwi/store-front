import supertest from 'supertest';
import app from '../..';
import db from '../../database';
import ProductModel, { Product } from '../../models/product';
import UserModel, { User } from '../../models/user';

const productModel = new ProductModel();
const userModel = new UserModel();

const request = supertest(app);
let token = '';

describe('Product API Endpoints', () => {
    const user = {
        email: 'productTest@test.com',
        user_name: 'productTest',
        first_name: 'product',
        last_name: 'test',
        password: 'test123',
    } as User;

    const product = {
        name: 'iPhone 14 Pro Max',
        price: 2900,
        category: 'Electronics',
    } as Product;

    beforeAll(async () => {
        const testProduct = await productModel.create(product);
        const testUser = await userModel.create(user);
        user.id = testUser.id;
        product.id = testProduct.id;
    });

    afterAll(async () => {
        const connection = await db.connect();
        const sql = 'DELETE FROM products; DELETE FROM users;';
        await connection.query(sql);
        connection.release();
    });

    describe('Authenticate user', () => {
        it('Should get user authentication token', async () => {
            const res = await request
                .post('/users/authenticate')
                .set('Content-type', 'application/json')
                .send({
                    email: 'productTest@test.com',
                    password: 'test123',
                });

            const { token: userAuthToken } = res.body.data;
            token = userAuthToken;
        });
    });

    describe('Test Product CRUD API methods', () => {
        it('should create new product', async () => {
            const res = await request
                .post('/products')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'iPhone 14 Pro Max',
                    price: 2000,
                    category: 'Electronics',
                } as Product);
            expect(res.status).toBe(200);

            const { name, price, category } = res.body.data;
            expect(name).toBe('iPhone 14 Pro Max');
            expect(price).toBe('2000');
            expect(category).toBe('Electronics');
        });
    });
});
