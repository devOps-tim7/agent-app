import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agent')
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  constructor(user?: { username: string; password: string }) {
    super();
    this.username = user?.username;
    this.password = user?.password;
  }
}
