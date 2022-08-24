import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
import { Client } from 'src/app/client/entities/client.entity';
import { Product } from 'src/app/product/entities/product.entity';

export class CreateCartDto {
  @ApiProperty()
  @IsNotEmpty()
  client: Client;

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  products: Product[];
}
