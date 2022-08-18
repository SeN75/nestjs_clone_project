import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthSrvice {
  constructor(private jwtSrv: JwtService) {}
  async validaterUser(username: string, password: string): Promise<any> {
    const user = { username, password };
    if (user && user.password === password) {
      const { password, username, ...rset } = user;
      return rset;
    }
    return null;
  }
  async login(user: any) {
    user.username = 'saleh';
    user.password = '123456';
    console.log('data ---> ', user);
    const payload = { name: user.username, sub: user.id };
    return {
      access_token: this.jwtSrv.sign(payload),
    };
  }
}
