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
  @OneToOne(() => User, (u) => u.id)
  @PrimaryColumn()
  @ApiProperty()
  id: string;
  @ApiProperty()
  @Column()
  balance: number;
  @ApiProperty()
  @Column('text', { array: true, default: '{}' })
  //
  @OneToMany(() => Order, (order) => order.id)
  historyOrder: string[];
  @ApiProperty()
  @JoinColumn()
  @OneToOne(() => Order, (order) => order.id)
  currentOrder: string;
}
