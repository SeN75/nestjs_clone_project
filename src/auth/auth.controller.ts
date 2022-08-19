import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiAcceptedResponse, ApiTags } from '@nestjs/swagger';
import { AuthSrvice } from './auth.service';
import { LoginDto } from './login.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authSrv: AuthSrvice) {}
  @ApiAcceptedResponse()
  @Post('login')
  async loing(@Body() loginDto: LoginDto) {
    const login = await this.authSrv.login(loginDto);
    return login;
  }
}
