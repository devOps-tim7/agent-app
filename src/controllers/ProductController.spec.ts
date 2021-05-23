import { createServer } from '../../server';
import supertest from 'supertest';

const app = createServer();

describe('test ProductController', () => {
  it('shoul return 200', async () => {
    await supertest(app).get('/api/products').expect(200);
  });
});
