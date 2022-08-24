import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private cartRepo: Repository<Cart>) {}

  async create(createCartDto: CreateCartDto) {
    try {
      const newCart = await this.cartRepo.create(createCartDto);
      const cart = await this.cartRepo.save(newCart);
      return cart;
    } catch (err) {
      throw new HttpException({}, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(relitions = ['client', 'products']) {
    const cart = await this.cartRepo.find({ relations: relitions });
    return cart;
  }

  async findOne(id: string, relitions = ['client', 'products']) {
    try {
      const cart = await this.cartRepo.findOneOrFail({
        where: { id },
        relations: relitions,
      });
      return cart;
    } catch (err) {
      throw new HttpException('cart_not_found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const cart = await this.findOne(id, []);
    const updateCart = { ...cart, ...updateCartDto };

    return await this.cartRepo
      .save(updateCart)
      .then((s) => s)
      .catch((err) => {
        throw new HttpException('', HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    const cart = await this.cartRepo.delete(id);
    if (!cart) throw new HttpException('cart_not_found', HttpStatus.NOT_FOUND);
    return cart;
  }
}
