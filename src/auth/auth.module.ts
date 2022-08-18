import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/env/env';
import { AuthSrvice } from './auth.service';
import { JwtStrategy } from './jwt-auth.stratgy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [JwtModule.register(env.jwtSettings)],
  providers: [AuthSrvice, LocalStrategy, JwtStrategy],
  exports: [AuthSrvice],
})
export class AuthModule {}
