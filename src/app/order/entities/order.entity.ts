import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Cart } from '../../cart/entities/cart.entity';
import { Client } from '../../client/entities/client.entity';
import { Seller } from '../../seller/entities/seller.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum OrderStatus {
  NEW = 'new',
  DELETED = 'deleted',
  REJECT = 'reject',
  SHIPPIED = 'shipped',
  COMPELETED = 'compelted',
}

@Entity()
export class Order extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  address: string;

  @ApiProperty()
  @OneToOne(() => Cart, (cart) => cart.order)
  @Column()
  cart: string;

  @ApiProperty({ type: () => Client })
  @OneToOne(() => Client, (client) => client.currentOrder, { cascade: true })
  currentOrder: Client;

  @ApiProperty({ type: () => Client })
  @OneToOne(() => Client, (client) => client.order)
  @JoinColumn()
  client: Client;

  @ApiProperty()
  @Column({ default: 0 })
  totalPrice: number;

  @ApiPropertyOptional()
  @Column({ default: 0 })
  discount: number;

  @ApiProperty()
  @Column()
  paymentMethod: string;

  @ApiProperty()
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.NEW })
  status: OrderStatus;

  @ManyToOne(() => Client, (client) => client.historyOrder)
  userHistoryOrder: Client;
}
