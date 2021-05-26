import { IsNotEmpty, IsPositive } from 'class-validator';

export default class ProductDTO {
  id: number = 0;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsPositive()
  inStock: number;
}
