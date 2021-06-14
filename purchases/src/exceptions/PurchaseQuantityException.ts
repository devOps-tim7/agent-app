import HttpException from './HttpException';
import PropertyError from './PropertyError';

class PurchaseQuantityException extends HttpException {
  constructor(id: number, inStock: number, quantity: number) {
    super(409, [
      new PropertyError(
        'base',
        `Quantity (${quantity}) must be less than or equal to inStock (${inStock}) for the product with id ${id}`
      ),
    ]);
  }
}

export default PurchaseQuantityException;
