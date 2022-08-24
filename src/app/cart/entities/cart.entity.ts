import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Seller } from '../../seller/entities/seller.entity';
import { Product } from '../../product/entities/product.entity';
import { Order } from 'src/app/order/entities/order.entity';

@Entity()
export class Cart extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => Client })
  @OneToOne(() => Client, (client) => client.id)
  client: Client;

  @ApiProperty({ type: () => Product, isArray: true })
  @ManyToOne(() => Product, (product) => product.cart)
  products: Product[];

  @OneToOne(() => Order, (order) => order.cart)
  order: Order;
}
