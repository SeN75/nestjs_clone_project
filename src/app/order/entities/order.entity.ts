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

export enum OrderStatus {
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
  @Column({ nullable: true })
  address: string;

  @ApiProperty()
  @Column({ default: 0 })
  totalPrice: number;

  @ApiPropertyOptional()
  @Column({ default: 0 })
  discount: number;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  paymentMethod?: string;

  @ApiProperty({ type: 'enum', enum: OrderStatus })
  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.NEW })
  status: OrderStatus;
  @ApiProperty()
  @Column({ default: new Date() })
  createdDate: Date;
  @ManyToOne(() => Client, (client) => client.historyOrder)
  userHistoryOrder: Client;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @OneToOne(() => Client, (client) => client.currentOrder, { cascade: true })
  currentOrder: Client;

  @OneToOne(() => Client, (client) => client.order)
  @JoinColumn()
  client: Client;
}
