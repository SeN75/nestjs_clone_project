import { ApiProperty } from '@nestjs/swagger';

export class ForgetPasswordDto {
  @ApiProperty()
  email: string;
}
