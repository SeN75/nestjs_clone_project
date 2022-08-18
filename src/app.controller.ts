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
  @Post('login')
  login(@Body() req): any {
    return this.authSrv.login(req);
  }
  @UseGuards(JwtAuthGurad)
  @Get('pro')
  getHello(): string {
    return this.appService.getHello();
  }
}
