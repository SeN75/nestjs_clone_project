import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/app/user/user.service';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthSrvice {
  constructor(private jwtSrv: JwtService, private userSrv: UserService) {}
  async validator(loginDto: LoginDto) {
    const user = await this.userSrv
      .login(loginDto)
      .then((userExist) => userExist)
      .catch(() => {
        throw new NotFoundException();
      });
    return user;
  }
  async login(loginDto: LoginDto) {
    const user = await this.validator(loginDto);
    const payload = { ...user };
    return {
      access_token: this.jwtSrv.sign(payload),
    };
  }

  async forgetPassword(email: string) {
    const user = await this.userSrv
      .findOneByEmail(email)
      .then((u) => u)
      .catch(() => {
        throw new NotFoundException();
      });
  }
}
