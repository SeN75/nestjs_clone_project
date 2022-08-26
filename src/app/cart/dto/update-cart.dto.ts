import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { Client } from '../../client/entities/client.entity';
import { Product } from '../../product/entities/product.entity';
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
