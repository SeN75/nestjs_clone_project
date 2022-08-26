import { ApiProperty } from '@nestjs/swagger';
import { Seller } from '../../seller/entities/seller.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { Category } from '../../category/entities/category.entity';

@Entity()
export class Product extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({})
  name: string;

  @ApiProperty()
  @Column({ type: 'float', default: 0 })
  price: number;

  @ApiProperty()
  @Column({ width: 400 })
  description: string;

  @ApiProperty()
  @Column({ default: 0 })
  timesOrder: number;

  @ApiProperty()
  @Column({ default: 1 })
  quntity: number;

  @ApiProperty()
  @Column()
  sellerId: string;

  @ApiProperty({ type: () => Category, nullable: true, default: [] })
  @ManyToMany(() => Category, { cascade: true })
  @JoinTable()
  categories: Category[];

  @OneToOne(() => Seller, (seller) => seller.products)
  seller: Seller;

  @ManyToOne(() => Cart, (cart) => cart.products)
  cart: Cart;
}
