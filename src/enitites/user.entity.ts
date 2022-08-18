import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  VENDOR = 'vendor',
  CLIENT = 'client',
  GUST = 'gust',
}

export abstract class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @IsEmail()
  @Column()
  email: string;

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
  profilePic: string;
}
