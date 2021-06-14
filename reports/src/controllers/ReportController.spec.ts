import { createServer } from '../../server';
import supertest from 'supertest';
import connection from '../helpers/Connection';
import { getManager } from 'typeorm';

const app = createServer();

describe('test ReportsController', () => {
  beforeEach(async () => {
    await connection.clear();
    await getManager().query(`
    INSERT INTO product VALUES (1, 'Test Product 1', 'Test Description', 'test_path_to_image', 5, 0);
    INSERT INTO product VALUES (2, 'Test Product 2', 'Test Description', 'test_path_to_image', 10, 0);
    INSERT INTO product VALUES (3, 'Test Product 3', 'Test Description', 'test_path_to_image', 20, 0);
    INSERT INTO product VALUES (4, 'Test Product 4', 'Test Description', 'test_path_to_image', 50, 0);
    INSERT INTO product VALUES (5, 'Test Product 5', 'Test Description', 'test_path_to_image', 100, 0);
    
    INSERT INTO purchase VALUES (1, 0, 1000, 1, '2021-06-10 21:50:56.646+02', 1);
    INSERT INTO purchase VALUES (2, 0, 800, 10, '2021-06-10 21:50:56.646+02', 2);
    INSERT INTO purchase VALUES (3, 0, 599, 5, '2021-06-10 21:50:56.646+02', 3);
    INSERT INTO purchase VALUES (4, 0, 3900, 12, '2021-06-10 21:50:56.646+02', 4);
    INSERT INTO purchase VALUES (5, 0, 2300, 15, '2021-06-10 21:50:56.646+02', 1);
    INSERT INTO purchase VALUES (6, 0, 120, 20, '2021-06-10 21:50:56.646+02', 1);
    INSERT INTO purchase VALUES (7, 0, 50, 15, '2021-06-10 21:50:56.646+02', 2);
    INSERT INTO purchase VALUES (8, 0, 125, 12, '2021-06-10 21:50:56.646+02', 5);
    INSERT INTO purchase VALUES (9, 0, 250, 7, '2021-06-10 21:50:56.646+02', 2);
    INSERT INTO purchase VALUES (10, 0, 550, 3, '2021-06-10 21:50:56.646+02', 1);
    `);
  });

  it('should return 5 most valuable items', async () => {
    const response = await supertest(app).get('/api/report/mostValuable');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
    const ids = response.body.map((obj) => obj.id);
    expect(ids).toStrictEqual([1, 4, 2, 3, 5]);
  });

  it('should return 5 best selling items', async () => {
    const response = await supertest(app).get('/api/report/bestSelling');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(5);
    const ids = response.body.map((obj) => obj.id);
    expect(ids).toStrictEqual([1, 2, 5, 4, 3]);
  });

  describe('when limit is 3', () => {
    it('should return most valuable items', async () => {
      const response = await supertest(app).get('/api/report/mostValuable?limit=3');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      const ids = response.body.map((obj) => obj.id);
      expect(ids).toStrictEqual([1, 4, 2]);
    });
    it('should return 3 best selling items', async () => {
      const response = await supertest(app).get('/api/report/bestSelling?limit=3');
      expect(response.status).toBe(200);
      expect(response.body.length).toBe(3);
      const ids = response.body.map((obj) => obj.id);
      expect(ids).toStrictEqual([1, 2, 5]);
    });
  });
});
