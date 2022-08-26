import { ApiProperty } from '@nestjs/swagger';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
} from 'class-validator';
import { Category } from '../../category/entities/category.entity';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'name_required' })
  @IsString({ message: 'name_must_be_string' })
  name: string;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 3 })
  price: number;

  @ApiProperty()
  @MaxLength(1000000, { message: 'decrpiton_max' })
  description: string;

  @ApiProperty()
  @IsNumber()
  timeOrder: number;

  @ApiProperty()
  @IsNumber({ maxDecimalPlaces: 3 })
  quntity: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'sellerId_required' })
  sellerId: string;

  // @ApiProperty()
  // categories: Category[];
}
