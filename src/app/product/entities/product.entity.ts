import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDecimal } from 'class-validator';
import { Seller } from '../../seller/entities/seller.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({})
  name: string;

  @ApiProperty()
  @Column({ type: 'decimal' })
  @IsDecimal()
  price: number;

  @ApiProperty()
  @Column({ width: 400 })
  descripition: string;

  @ApiProperty()
  @Column({ default: 0 })
  rate: number;

  @ApiProperty()
  @Column({ default: 1 })
  quntity: number;

  @ApiPropertyOptional()
  @OneToOne(() => Seller, (seller) => seller.id)
  vendorId: string;
}
