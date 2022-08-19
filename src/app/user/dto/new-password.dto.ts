import { ApiProperty } from '@nestjs/swagger';

export class NewPasswordDto {
  @ApiProperty()
  currentPassword: string;
  @ApiProperty()
  newPassword: string;
}
