import HttpException from './HttpException';

class ProductNotFoundException extends HttpException {
  constructor(id: number) {
    super(404, `Product with id ${id} not found`);
  }
}

export default ProductNotFoundException;
