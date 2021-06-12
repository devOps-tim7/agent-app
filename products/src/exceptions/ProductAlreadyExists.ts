import HttpException from './HttpException';
import PropertyError from './PropertyError';

class ProductAlreadyExistsException extends HttpException {
  constructor(name: string) {
    super(409, [
      new PropertyError('name', `Product with name ${name} already exists`),
    ]);
  }
}

export default ProductAlreadyExistsException;
