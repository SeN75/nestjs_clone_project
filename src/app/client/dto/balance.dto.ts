import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class BalanceDto {
  @ApiProperty()
  @IsNotEmpty()
  id: string;
  @ApiProperty({ minimum: 0, maximum: 100000, nullable: false })
  @IsNumber()
  @Min(0)
  @Max(100000)
  amount: number;
}
