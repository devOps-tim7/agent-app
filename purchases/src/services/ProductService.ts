import ProductAlreadyExistsException from '../exceptions/ProductAlreadyExists';
import ProductNotFoundException from '../exceptions/ProductNotFoundException';
import Product from '../models/Product';

const PG_UNIQUE_CONSTRAINT_VIOLATION = '23505';

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

export default {
  getById,
  update,
};
