import { Request, Response } from 'express';
import Product from '../models/Product';
import ProductService from '../services/ProductService';
import ProductNotFoundException from '../exceptions/ProductNotFoundException';
import ProductDTO from '../dto/ProductDTO';
import { validate } from 'class-validator';
import ProductDtoValidationException from '../exceptions/ProductDtoValidationException';
import PropertyError from '../exceptions/PropertyError';
var cloudinary = require('cloudinary').v2;

const create = async (req: Request, res: Response) => {
  //TODO: Add DTO Validation

  const productDTO: ProductDTO = new ProductDTO({
    ...req.body,
    image: req.file.filename,
  });
  const validationResult = await validate(productDTO, { groups: ['create'] });
  if (validationResult.length) {
    const errors = validationResult.map(
      (result) =>
        new PropertyError(
          result.property,
          Object.keys(result.constraints)
            .map((key) => result.constraints?.[key])
            .join(', ')
        )
    );
    throw new ProductDtoValidationException(errors);
  }
  await new Promise<void>((resolve) => {
    cloudinary.uploader.upload(
      `${process.env.IMAGE_DIR}/${productDTO.image}`,
      function (error, result) {
        console.log(result, error);
        productDTO.image = result.secure_url;
        resolve();
      }
    );
  });

  const product: Product = await ProductService.create(
    productDTO.name,
    productDTO.description,
    productDTO.image,
    productDTO.price,
    productDTO.inStock
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
  const productDTO: ProductDTO = new ProductDTO({
    ...req.body,
  });

  const validationResult = await validate(productDTO, { groups: ['update'] });
  const id: number = +req.params.id;

  if (validationResult.length) {
    const errors = validationResult.map(
      (result) =>
        new PropertyError(
          result.property,
          Object.keys(result.constraints)
            .map((key) => result.constraints?.[key])
            .join(', ')
        )
    );
    throw new ProductDtoValidationException(errors);
  }

  const updateProduct: Product = new Product({
    name: productDTO.name,
    description: productDTO.description,
    image: undefined,
    price: productDTO.price,
    inStock: productDTO.inStock,
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

const changeImage = async (req: Request, res: Response) => {
  const id: number = +req.params.id;
  const image = req.file.filename;
  let image_url = '';
  await new Promise<void>((resolve) => {
    cloudinary.uploader.upload(`${process.env.IMAGE_DIR}/${image}`, function (error, result) {
      console.log(result, error);
      image_url = result.secure_url;
      resolve();
    });
  });
  await ProductService.updateImage(id, image_url);
  res.status(200).send(image_url);
};

export default {
  create,
  getAll,
  update,
  getById,
  remove,
  downloadImage,
  changeImage,
};
