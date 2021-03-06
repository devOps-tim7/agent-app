import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Purchase from './Purchase';

@Entity()
export default class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  image?: string;

  @Column('double precision')
  price: number;

  @Column('integer')
  inStock: number;

  @OneToMany(() => Purchase, (purchase) => purchase.product, {
    cascade: true,
  })
  purchases: Purchase[];

  constructor(product?: {
    name: string;
    description: string;
    image?: string;
    price: number;
    inStock: number;
  }) {
    super();
    this.name = product?.name;
    this.description = product?.description;
    this.image = product?.image;
    this.price = product?.price;
    this.inStock = product?.inStock;
  }
}
