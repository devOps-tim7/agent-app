import HttpException from './HttpException';
import PropertyError from './PropertyError';

class ProductNotFoundException extends HttpException {
  constructor(id: number) {
    super(404, [new PropertyError('base', `Product with id ${id} not found`)]);
  }
}

export default ProductNotFoundException;
