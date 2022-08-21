import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Order } from '../../order/entities/order.entity';
@Entity()
export class Client {
  @PrimaryColumn({ unique: true, nullable: false })
  @ApiProperty()
  id: string;
  @ApiProperty()
  @Column({ default: 0 })
  balance: number;
  @ApiProperty()
  @OneToMany(() => Order, (order) => order.userHistoryOrder, { cascade: true })
  historyOrder: Array<Order>;
  @ApiProperty()
  @OneToOne(() => Order, (order) => order.id, { cascade: true })
  @JoinColumn({ name: 'currentOrderId' })
  currentOrder: string;
}
