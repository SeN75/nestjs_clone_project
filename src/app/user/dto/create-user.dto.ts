import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    pattern: '/^w+[+.w-]*@([w-]+.)*w+[w-]*.([a-z]{2,4}|d+)$/i',
  })
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
  @ApiProperty({
    examples: Object.keys(UserRole).map((value) => value.toLowerCase()),
  })
  @IsNotEmpty()
  role: UserRole;
}
