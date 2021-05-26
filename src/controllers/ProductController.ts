import { Request, Response } from 'express';
import Product from '../models/Product';
import ProductService from '../services/ProductService';
import ProductNotFoundException from '../exceptions/ProductNotFoundException';

const create = async (req: Request, res: Response) => {
  //TODO: Add DTO Validation
  const product: Product = await ProductService.create(
    req.body.name,
    req.body.description,
    req.file.filename,
    +req.body.price,
    +req.body.inStock
  );
  res.status(201).send(product);
};

const getAll = async (_req: Request, res: Response) => {
  const products: Array<Product> = await ProductService.getAll();
  res.status(200).send(products);
};

const getById = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const product: Product = await ProductService.getById(id);
  if (!product) {
    throw new ProductNotFoundException(id);
  }
  res.status(200).send(product);
};

const update = async (req: Request, res: Response) => {
  //TODO: Add DTO Validation
  const id: number = +req.params.id;
  const name: string = req.body.name;
  const description: string = req.body.description;
  const price: number = req.body.price;
  const inStock: number = req.body.inStock;

  const updateProduct: Product = new Product({
    name,
    description,
    image: undefined,
    price,
    inStock,
  });
  const product: Product = await ProductService.update(id, updateProduct);
  res.status(200).send(product);
};

const remove = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const product: Product = await ProductService.getById(id);
  if (!product) {
    throw new ProductNotFoundException(id);
  }
  await ProductService.remove(product);
  res.status(204).send();
};

const downloadImage = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const product: Product = await ProductService.getById(id);
  if (!product) {
    throw new ProductNotFoundException(id);
  }
  res.download(`${process.env.IMAGE_DIR}/${product.image}`);
};

export default {
  create,
  getAll,
  update,
  getById,
  remove,
  downloadImage,
};
