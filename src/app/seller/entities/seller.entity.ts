import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
@Entity()
export class Seller {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;
  @ApiProperty({ isArray: true })
  @OneToMany(() => Product, (prod) => prod.id)
  @Column('text', { array: true, default: '{}' })
  productsId: string[];

  @OneToOne(() => User, (user) => user.seller)
  @JoinColumn()
  user: User;
}
