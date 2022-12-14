import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Client } from '../../client/entities/client.entity';
import { Product } from '../../product/entities/product.entity';

export class CreateCartDto {
  @ApiProperty({ type: () => Client })
  @IsNotEmpty()
  client: Client;

  @ApiProperty({ type: () => Product })
  @IsArray()
  @IsNotEmpty()
  products: Product[];
}
