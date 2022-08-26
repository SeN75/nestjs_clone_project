import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Client } from '../../client/entities/client.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Cart extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => Client })
  @OneToOne(() => Client, (client) => client.cart)
  client: Client;

  @ApiProperty({ type: () => Product, isArray: true })
  @ManyToMany(() => Product)
  @JoinTable()
  products: Product[];
}
