import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Checking endpoints', () => {
    it('Get / endpoint', async () => {
        await request.get('/').expect(200);
    });
});
