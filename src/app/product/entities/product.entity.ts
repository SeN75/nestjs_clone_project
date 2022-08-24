import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDecimal } from 'class-validator';
import { Seller } from '../../seller/entities/seller.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from 'src/app/cart/entities/cart.entity';
import { Category } from 'src/app/category/entities/category.entity';

@Entity()
export class Product extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({})
  name: string;

  @ApiProperty()
  @Column({ type: 'decimal' })
  @IsDecimal()
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

  @ManyToOne(() => Category, (cate) => cate.product)
  categories: Category[];

  @OneToOne(() => Seller, (seller) => seller.products)
  seller: Seller;

  @ManyToOne(() => Cart, (cart) => cart.products)
  cart: Cart;
}
