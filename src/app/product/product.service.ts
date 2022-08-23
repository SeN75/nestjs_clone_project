import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseObj } from 'src/types/respons.type';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private prodRepo: Repository<Product>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
  ): Promise<ResponseObj<Product>> {
    const prod = await this.prodRepo.create(createProductDto);
    const respone = await this.prodRepo
      .save(prod)
      .then((p) => this.res('new_product_created', HttpStatus.CREATED, p))
      .catch((err) =>
        this.res('create_product_failed', HttpStatus.NOT_FOUND, err),
      );
    return respone;
  }

  async findAll(sellerId = '') {
    const products = this.prodRepo.find({
      where: { seller: { id: sellerId } },
    });
    const response = await products
      .then((prod) => this.res('products_exist', HttpStatus.ACCEPTED, prod))
      .catch((err) =>
        this.res('products_not_found', HttpStatus.NOT_FOUND, err),
      );
    return response;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  res(
    message: string,
    statusCode: HttpStatus,
    data: any,
  ): ResponseObj<Product> {
    return {
      message: message,
      statuseCode: statusCode,
      data: statusCode.toString()[0] === '4' ? undefined : data,
      error: statusCode.toString()[0] === '4' ? data : undefined,
    };
  }
}
