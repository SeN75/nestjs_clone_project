import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthSrvice } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authSrv: AuthSrvice) {
    super();
  }
  //can edit
  async validate(username: string, password: string) {
    const user = await this.authSrv;
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
