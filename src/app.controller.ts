import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthSrvice } from './auth/auth.service';
import { JwtAuthGurad } from './auth/jwt-auth.guard';
import { LoaclAuthGuard } from './auth/local.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authSrv: AuthSrvice,
  ) {}
}
