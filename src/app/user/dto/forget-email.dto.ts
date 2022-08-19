import { ApiProperty } from '@nestjs/swagger';

export class ForgetPasswordDto {
  @ApiProperty({ maxLength: 9 })
  mobile: number;
}
