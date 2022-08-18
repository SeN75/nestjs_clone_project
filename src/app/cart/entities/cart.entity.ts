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

@Entity()
export class Cart extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  @OneToOne(() => Client, (client) => client.id)
  clientId: string;

  @ApiProperty({ isArray: true })
  @Column('text', { array: true, default: '{}' })
  @ManyToOne(() => Seller, (sellers) => sellers.id)
  sellersIds: string[];

  @ApiProperty({ isArray: true })
  @Column('text', { array: true, default: '{}' })
  @ManyToOne(() => Product, (product) => product.id)
  products: string[];
}
