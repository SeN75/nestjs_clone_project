import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { Client } from 'src/app/client/entities/client.entity';
import { Product } from 'src/app/product/entities/product.entity';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @ApiProperty()
  @IsOptional()
  client: Client;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  products: Product[];
}
