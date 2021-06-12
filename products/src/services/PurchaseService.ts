import Product from '../models/Product';
import Purchase from '../models/Purchase';

const create = async (product: Product, quantity: number) => {
  const purchase = new Purchase(product, quantity);
  return purchase.save();
};

export default {
  create,
};
