import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthSrvice } from './auth.service';
import { LoginDto } from './login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authSrv: AuthSrvice) {
    super();
  }
  //can edit
  async validate(loginDto: LoginDto) {
    const user = this.authSrv.validator(loginDto);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
