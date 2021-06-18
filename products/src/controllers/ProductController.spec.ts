import { createServer } from '../../server';
import supertest from 'supertest';
import connection from '../helpers/Connection';
import Product from '../models/Product';
import path from 'path';
import UserService from '../services/UserService';
import AuthService from '../services/AuthService';
import UploadService from '../services/UploadService';

const app = createServer();

const spy = jest.spyOn(UploadService, 'uploadToCloudinary').mockResolvedValue('pathToImage1');

describe('test ProductController', () => {
  const product = {
    name: 'testName1',
    description: 'testDescription1',
    image: 'pathToImage1',
    price: 100,
    inStock: 100,
  };

  let token: string;

  beforeEach(async () => {
    await connection.clear();
    await Product.save(new Product(product));
    await UserService.create('admin', 'admin');
    token = await AuthService.login('admin', 'admin');
  });

  describe('authorized', () => {
    it('should return 404 for product that does not exist', async () => {
      const response = await supertest(app)
        .get('/api/product/0')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
    });

    it('should successfully remove product', async () => {
      const id: number = (
        await supertest(app).get('/api/product').set('Authorization', `Bearer ${token}`)
      ).body[0].id;
      const response = await supertest(app)
        .delete(`/api/product/${id}`)
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(204);
    });

    it('should return 404 for delete product that does not exist', async () => {
      const response = await supertest(app)
        .delete('/api/product/0')
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(404);
    });

    it('should successfully create product', async () => {
      const data = {
        name: 'testName5',
        description: 'testDescription',
        price: 100,
        inStock: 100,
      };
      const response = await supertest(app)
        .post('/api/product')
        .set('Authorization', `Bearer ${token}`)
        .field('name', data.name)
        .field('description', data.description)
        .field('price', data.price)
        .field('inStock', data.inStock)
        .attach('image', path.resolve(__dirname, '../../resources/random.jpg'));
      expect(spy).toBeCalled();
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(data);
    });

    it('should return 409 on create product that already exists', async () => {
      const response = await supertest(app)
        .post('/api/product')
        .set('Authorization', `Bearer ${token}`)
        .field('name', 'testName1')
        .field('description', 'testDescription')
        .field('price', 100)
        .field('inStock', 100)
        .attach('image', path.resolve(__dirname, '../../resources/random.jpg'));
      expect(spy).toBeCalled();
      expect(response.status).toBe(409);
    });

    it('should successfully update product', async () => {
      const id: number = (
        await supertest(app).get('/api/product').set('Authorization', `Bearer ${token}`)
      ).body[0].id;
      const update = {
        name: 'newProductName',
        description: 'newDescription',
        price: 111,
        inStock: 0,
      };
      const response = await supertest(app)
        .put(`/api/product/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(update);
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(update);
    });
  });

  describe('unauthorized', () => {
    it('should return 200 on get all products', async () => {
      const response = await supertest(app).get('/api/product');
      expect(response.body).toMatchObject([product]);
      expect(response.status).toBe(200);
    });

    it('should return 200 on get product by id', async () => {
      const id: number = (await supertest(app).get('/api/product')).body[0].id;
      const response = await supertest(app).get(`/api/product/${id}`);
      expect(response.body).toMatchObject(product);
      expect(response.status).toBe(200);
    });

    it('should return 401 on post', async () => {
      const response = await supertest(app).post(`/api/product`);
      expect(response.status).toBe(401);
    });

    it('should return 401 on put', async () => {
      const response = await supertest(app).put(`/api/product/1`);
      expect(response.status).toBe(401);
    });

    it('should return 401 on delete', async () => {
      const response = await supertest(app).delete(`/api/product/1`);
      expect(response.status).toBe(401);
    });
  });
});
