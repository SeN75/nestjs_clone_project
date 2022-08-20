import { IsNotEmpty } from 'class-validator';

export class CreateSellerDto {
  @IsNotEmpty()
  id: string;
}
