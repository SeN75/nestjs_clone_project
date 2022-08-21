import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Client } from 'src/app/client/entities/client.entity';
import { Seller } from 'src/app/seller/entities/seller.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  SELLER = 'seller',
  CLIENT = 'client',
  GUST = 'gust',
}
@Entity()
export class User extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.GUST,
  })
  role: UserRole;

  @ApiProperty({ required: false })
  @Column({ width: 9, nullable: true })
  mobile?: number;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  datebirth?: Date;

  @ApiProperty({ required: false })
  @Column({ nullable: true, type: 'int2' })
  age?: number;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  profilePic?: string;

  @OneToOne(() => Seller, (seller) => seller.user)
  seller: Seller;
  @OneToOne(() => Client, (client) => client.user)
  client: Client;
}
