import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { SellerModule } from '../seller/seller.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), SellerModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
