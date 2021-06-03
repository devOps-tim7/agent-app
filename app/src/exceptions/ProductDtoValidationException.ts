import HttpException from './HttpException';
import PropertyError from './PropertyError';

export default class ProductDtoValidationException extends HttpException {
  constructor(errors: PropertyError[]) {
    super(400, errors);
  }
}
