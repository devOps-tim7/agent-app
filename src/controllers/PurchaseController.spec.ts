import { createServer } from '../../server';
import supertest from 'supertest';
import connection from '../helpers/Connection';
import Product from '../models/Product';

const app = createServer();

describe('test PurchaseController', () => {
  const product1 = {
    name: 'testName1',
    description: 'testDescription1',
    image: 'pathToImage1',
    price: 100,
    inStock: 20,
  };
  const product2 = {
    name: 'testName2',
    description: 'testDescription2',
    image: 'pathToImage2',
    price: 200,
    inStock: 50,
  };

  beforeEach(async () => {
    await connection.clear();
    await Product.save([new Product(product1), new Product(product2)]);
  });

  it('should return 404 for product that does not exist', async () => {
    const response = await supertest(app)
      .post('/api/purchase')
      .send({ items: [{ id: 99999, quantity: 5 }] });
    expect(response.status).toBe(404);
  });

  it('should return 409 for quantity greather than inStock', async () => {
    const id: number = (await supertest(app).get('/api/product')).body[0].id;
    const response = await supertest(app)
      .post('/api/purchase')
      .send({ items: [{ id, quantity: 21 }] });
    expect(response.status).toBe(409);
  });

  it('successfully purchase multiple products', async () => {
    const ids: number = (await supertest(app).get('/api/product')).body.map((item) => item.id);
    const response = await supertest(app)
      .post('/api/purchase')
      .send({
        items: [
          { id: ids[0], quantity: 10 },
          { id: ids[1], quantity: 30 },
        ],
      });
    expect(response.status).toBe(201);
    expect(response.body[0].product.inStock).toBe(10);
    expect(response.body[0].quantity).toBe(10);
    expect(response.body[0].price).toBe(100);
    expect(response.body[0].total).toBe(1000);

    expect(response.body[1].product.inStock).toBe(20);
    expect(response.body[1].quantity).toBe(30);
    expect(response.body[1].price).toBe(200);
    expect(response.body[1].total).toBe(6000);
  });
});
