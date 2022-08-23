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
  @OneToOne(() => Client, (client) => client.id)
  client: Client;

  @ApiProperty({ isArray: true })
  @ManyToOne(() => Product, (product) => product.cart)
  products: Product[];
}
