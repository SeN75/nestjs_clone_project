import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/entities/product.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
@Entity()
export class Seller {
  @PrimaryColumn()
  @ApiProperty()
  @OneToOne(() => User, (u) => u.id)
  id: string;
  @ApiProperty({ isArray: true })
  @OneToMany(() => Product, (prod) => prod.id)
  @Column('text', { array: true, default: '{}' })
  productsId: string[];
}
