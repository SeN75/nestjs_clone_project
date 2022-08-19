import { Module } from '@nestjs/common';
import 'reflect-metadata';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './app/cart/cart.module';
import { UserModule } from './app/user/user.module';

import { ClientModule } from './app/client/client.module';
import { OrderModule } from './app/order/order.module';
import { ProductModule } from './app/product/product.module';
import { SellerModule } from './app/seller/seller.module';
import { TypeOrmConfigOption } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { LocalStrategy } from './auth/local.strategy';

import { JwtStrategy } from './auth/jwt-auth.stratgy';
import { User } from './app/user/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfigOption),
    UserModule,
    ClientModule,
    SellerModule,
    CartModule,
    ProductModule,
    OrderModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, LocalStrategy, JwtStrategy],
})
export class AppModule {}
