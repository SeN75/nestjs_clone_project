import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/app/user/user.module';
import { UserService } from 'src/app/user/user.service';
import { env } from 'src/env/env';
import { AuthController } from './auth.controller';
import { AuthSrvice } from './auth.service';
import { JwtStrategy } from './jwt-auth.stratgy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [JwtModule.register(env.jwtSettings), UserModule],
  controllers: [AuthController],
  providers: [AuthSrvice, LocalStrategy, JwtStrategy],
  exports: [AuthSrvice],
})
export class AuthModule {}
