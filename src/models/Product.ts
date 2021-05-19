import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column("double")
  price: number;

  @Column("integer")
  inStock: number;

  constructor(
    name: string,
    description: string,
    image: string,
    price: number,
    inStock: number
  ) {
    super();
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = price;
    this.inStock = inStock;
  }
}
