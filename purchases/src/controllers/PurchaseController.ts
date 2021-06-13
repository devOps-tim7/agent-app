import { Request, Response } from 'express';
import ProductNotFoundException from '../exceptions/ProductNotFoundException';
import PropertyError from '../exceptions/PropertyError';
import PurchaseQuantityException from '../exceptions/PurchaseQuantityException';
import ProductService from '../services/ProductService';
import PurchaseService from '../services/PurchaseService';

const create = async (req: Request, res: Response) => {
  const items = req.body.items;

  await Promise.all(
    items.map(async ({ id, quantity }) => {
      const product = await ProductService.getById(id);
      if (!product) {
        throw new ProductNotFoundException(id);
      }
      if (product.inStock < quantity) {
        throw new PurchaseQuantityException(id, product.inStock, quantity);
      }
      if (quantity < 1) {
        throw new PropertyError('quantity', 'Quantity cannot be lower than 1');
      }
    })
  );

  const purchases = await Promise.all(
    items.map(async ({ id, quantity }) => {
      const product = await ProductService.getById(id);
      product.inStock -= quantity;
      await ProductService.update(id, product);
      return PurchaseService.create(product, quantity);
    })
  );

  res.status(201).send(purchases);
};

export default {
  create,
};
