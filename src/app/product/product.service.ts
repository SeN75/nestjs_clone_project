import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseObj } from 'src/types/respons.type';
import { Repository } from 'typeorm';
import { SellerService } from '../seller/seller.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private prodRepo: Repository<Product>,
    private readonly sellerSrv: SellerService,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<ResponseObj<Product>> {
    const seller = await this.sellerSrv.findOne(createProductDto.sellerId);
    if (seller)
      this.res(
        'seller_not_exist',
        HttpStatus.NOT_FOUND,
        createProductDto.sellerId,
      );
    const prod = await this.prodRepo.create(createProductDto);
    const respone = await this.prodRepo
      .save(prod)
      .then((p) => this.res('new_product_created', HttpStatus.CREATED, p))
      .catch((err) =>
        this.res('create_product_failed', HttpStatus.NOT_FOUND, err),
      );
    return await respone;
  }

  async findAll(sellerId = ''): Promise<ResponseObj<Product[]>> {
    const products = this.prodRepo.find({
      where: { sellerId: sellerId },
    });
    const response = await products
      .then((prod) => this.resAll('products_exist', HttpStatus.ACCEPTED, prod))
      .catch((err) =>
        this.resAll('products_not_found', HttpStatus.NOT_FOUND, err),
      );
    return response;
  }

  async findOne(id: string) {
    const product = this.prodRepo.findOneOrFail({ where: { id } });
    const response = await product
      .then((prod) => prod)
      .catch((err) => {
        throw new NotFoundException('product_not_found');
      });
    return await response;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);

    if (Object.keys(updateProductDto).length == 0) {
      return await this.res('fields_required', HttpStatus.BAD_REQUEST);
    }

    const updateProd = { ...product, ...updateProductDto };

    const response = await this.prodRepo
      .save(updateProd)
      .then((prod) =>
        this.res('product_updated', HttpStatus.ACCEPTED, updateProductDto),
      )
      .catch((err) =>
        this.res('update_was_not_complate', HttpStatus.BAD_REQUEST, err),
      );

    return await response;
  }

  async remove(id: string) {
    const response = await this.prodRepo
      .delete(id)
      .then((prod) => {
        return { messsage: 'product_deleted' };
      })
      .catch((err) => {
        throw new NotFoundException('product_delete_faild');
      });
    return response;
  }

  res(
    message: string,
    statusCode: HttpStatus,
    data?: any,
  ): ResponseObj<Product> {
    return {
      message: message,
      statuseCode: statusCode,
      data: statusCode.toString()[0] === '4' ? undefined : data,
      error: statusCode.toString()[0] === '4' ? data : undefined,
    };
  }
  resAll(
    message: string,
    statusCode: HttpStatus,
    data: any,
  ): ResponseObj<Product[]> {
    console.log('hhhhhh');
    if (statusCode.toString()[0] === '4')
      throw new HttpException(message, statusCode);
    return {
      message: message,
      statuseCode: statusCode,
      data: statusCode.toString()[0] === '4' ? undefined : data,
      error: statusCode.toString()[0] === '4' ? data : undefined,
    };
  }
}
