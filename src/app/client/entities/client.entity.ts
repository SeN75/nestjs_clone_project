import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Cart } from 'src/app/cart/entities/cart.entity';
@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;
  @ApiProperty()
  @Column({ default: 0 })
  balance: number;

  @ApiProperty()
  @OneToMany(() => Order, (order) => order.userHistoryOrder, { cascade: true })
  historyOrder: Array<Order>;

  @ApiProperty({ type: () => Order })
  @OneToOne(() => Order, (order) => order.currentOrder)
  @JoinColumn()
  currentOrder: Order;

  @ApiProperty()
  @OneToOne(() => Order, (order) => order.client, { cascade: true })
  order: Order;

  @OneToOne(() => User, (user) => user.client)
  @JoinColumn()
  user: User;

  @OneToOne(() => Cart, (cart) => cart.client)
  @JoinColumn()
  cart: Cart;
}
