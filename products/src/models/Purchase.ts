import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Product from './Product';

@Entity()
export default class Purchase extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.purchases, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column('double precision')
  price: number;

  @Column('double precision')
  total: number;

  @Column('integer')
  quantity: number;

  @Column({ type: 'timestamptz' })
  date: Date;

  constructor(product: Product, quantity: number) {
    super();
    this.product = product;
    this.price = product?.price;
    this.quantity = quantity;
    this.total = product?.price * quantity;
    this.date = new Date();
  }
}
