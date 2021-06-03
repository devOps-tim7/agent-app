import { IsNotEmpty, IsPositive, Min } from 'class-validator';
import Product from '../models/Product';

export default class ProductDTO {
  id: number = 0;

  @IsNotEmpty({ always: true })
  name: string;

  @IsNotEmpty({ always: true })
  description: string;

  @IsNotEmpty({ groups: ['create'] })
  image: string;

  @IsNotEmpty({ always: true })
  @IsPositive({ always: true })
  price: number;

  @IsNotEmpty({ always: true })
  @Min(0, { always: true })
  inStock: number;

  constructor(product?: {
    name: string;
    description: string;
    image: string;
    price: number;
    inStock: number;
  }) {
    this.name = product.name;
    this.description = product.description;
    this.image = product.image;
    this.price = +product.price;
    this.inStock = +product.inStock;
  }

  fromEntity(product: Product): ProductDTO {
    const productDTO = new ProductDTO();
    productDTO.id = product.id;
    productDTO.name = product.name;
    productDTO.description = product.description;
    productDTO.image = product.image;
    productDTO.price = product.price;
    productDTO.inStock = product.inStock;
    return productDTO;
  }
}
