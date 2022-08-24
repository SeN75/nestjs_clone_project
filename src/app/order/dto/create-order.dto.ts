import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Cart } from 'src/app/cart/entities/cart.entity';
import { Client } from 'src/app/client/entities/client.entity';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @ApiPropertyOptional()
  @IsOptional()
  address?: string;

  @ApiProperty({ type: () => Cart })
  @IsNotEmpty()
  cart: Cart;

  @ApiPropertyOptional()
  @IsNumber()
  @Max(100)
  @Min(0)
  discount: number;

  @ApiProperty({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;
}
