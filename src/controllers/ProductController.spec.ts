import { createServer } from '../../server';
import supertest from 'supertest';
import connection from '../helpers/Connection';
import Product from '../models/Product';
import path from 'path';

const app = createServer();

describe('test ProductController', () => {
  const product = {
    name: 'testName1',
    description: 'testDescription1',
    image: 'pathToImage1',
    price: 100,
    inStock: 100,
  };

  beforeEach(async () => {
    await connection.clear();
    await Product.save(new Product(product));
  });

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

  it('should return 404 for product that does not exist', async () => {
    const response = await supertest(app).get('/api/product/0');
    expect(response.status).toBe(404);
  });

  it('should successfully remove product', async () => {
    const id: number = (await supertest(app).get('/api/product')).body[0].id;
    const response = await supertest(app).delete(`/api/product/${id}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 for delete product that does not exist', async () => {
    const response = await supertest(app).delete('/api/product/0');
    expect(response.status).toBe(404);
  });

  it('should successfully create product', async () => {
    const data = {
      name: 'testName2',
      description: 'testDescription',
      price: 100,
      inStock: 100,
    };
    const response = await supertest(app)
      .post('/api/product')
      .field('name', data.name)
      .field('description', data.description)
      .field('price', data.price)
      .field('inStock', data.inStock)
      .attach('image', path.resolve(__dirname, '../../resources/random.jpg'));
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(data);
  });

  it('should return 409 on create product that already exists', async () => {
    const response = await supertest(app)
      .post('/api/product')
      .field('name', 'testName1')
      .field('description', 'testDescription')
      .field('price', 100)
      .field('inStock', 100)
      .attach('image', path.resolve(__dirname, '../../resources/random.jpg'));
    expect(response.status).toBe(409);
  });

  it.only('should successfully update product', async () => {
    const id: number = (await supertest(app).get('/api/product')).body[0].id;
    const update = {
      name: 'newProductName',
      description: 'newDescription',
      price: 111,
      inStock: 0,
    };
    const response = await supertest(app)
      .put(`/api/product/${id}`)
      .send(update);
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(update);
  });
});
