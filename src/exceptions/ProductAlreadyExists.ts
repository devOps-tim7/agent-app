import HttpException from './HttpException';

class ProductAlreadyExistsException extends HttpException {
  constructor(name: string) {
    super(409, `Product with name ${name} already exists`);
  }
}

export default ProductAlreadyExistsException;
