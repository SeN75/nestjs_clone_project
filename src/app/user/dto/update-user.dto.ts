import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
@ApiTags('User')
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ maxLength: 25 })
  name?: string;

  @ApiPropertyOptional({ maxLength: 25 })
  username?: string;

  @ApiPropertyOptional({ maxLength: 9 })
  mobile?: number;

  @ApiPropertyOptional({
    pattern: '/^w+[+.w-]*@([w-]+.)*w+[w-]*.([a-z]{2,4}|d+)$/i',
    example: 'email@email.com',
  })
  email?: string;

  @ApiPropertyOptional()
  datebirth?: Date;

  @ApiPropertyOptional()
  profilePic?: string;
}
