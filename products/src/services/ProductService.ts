import ProductAlreadyExistsException from '../exceptions/ProductAlreadyExists';
import ProductNotFoundException from '../exceptions/ProductNotFoundException';
import Product from '../models/Product';

const PG_UNIQUE_CONSTRAINT_VIOLATION = '23505';

const create = async (
  name: string,
  description: string,
  image: string,
  price: number,
  inStock: number
) => {
  const productToSave = new Product({
    name,
    description,
    image,
    price,
    inStock,
  });
  try {
    const persisted: Product = await productToSave.save();
    return persisted;
  } catch (err) {
    if (err && err.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
      throw new ProductAlreadyExistsException(name);
    }
    throw err;
  }
};

const getAll = async () => {
  return await Product.find();
};

const getById = async (id: number) => {
  return await Product.findOne(id);
};

const update = async (id: number, product: Product) => {
  const productToUpdate: Product = await Product.findOne(id);

  if (!productToUpdate) {
    throw new ProductNotFoundException(id);
  }

  productToUpdate.name = product.name;
  productToUpdate.description = product.description;
  productToUpdate.price = product.price;
  productToUpdate.inStock = product.inStock;

  try {
    const updated: Product = await productToUpdate.save();
    return updated;
  } catch (err) {
    if (err && err.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
      throw new ProductAlreadyExistsException(product.name);
    }
    throw err;
  }
};

const remove = async (product: Product) => {
  await Product.remove(product);
};

export default {
  create,
  getAll,
  getById,
  update,
  remove,
};
