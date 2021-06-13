import { createServer } from '../../server';
import supertest from 'supertest';
import connection from '../helpers/Connection';
import UserService from '../services/UserService';

const app = createServer();

describe('test AuthController', () => {
  beforeEach(async () => {
    await connection.clear();
    await UserService.create('admin2', 'admin2');
  });

  it('successfully logs in', async () => {
    const response = await supertest(app).post('/api/auth/login').send({
      username: 'admin2',
      password: 'admin2',
    });
    expect(response.status).toBe(200);
  });

  it('fails to log in', async () => {
    const response = await supertest(app).post('/api/auth/login').send({
      username: 'nonadmin',
      password: 'admin',
    });
    expect(response.status).toBe(400);
  });
});
