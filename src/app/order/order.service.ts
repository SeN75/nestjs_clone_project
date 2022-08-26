import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartService } from '../cart/cart.service';
import { Product } from '../product/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order, OrderStatus } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private cartSrv: CartService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    try {
      const newOrder = await this.orderRepo.create(createOrderDto);

      const cart = await this.cartSrv.findOne(newOrder.cart.id);
      newOrder.totalPrice = this.getTotalPrice(cart.products);
      newOrder.client = cart.client;
      newOrder.createdDate = new Date();
      const order = await this.orderRepo.save(newOrder);

      if (!order)
        throw new HttpException('can_not_save', HttpStatus.FAILED_DEPENDENCY);
      return order;
    } catch (err) {
      console.log('create_failed ====> ', err);
      throw new HttpException('create_order_failed', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(relations = ['client', 'cart']) {
    const orders = await this.orderRepo.find({ relations: relations });

    return orders;
  }

  async findOne(id: string, relations = ['client', 'cart']) {
    try {
      const order = await this.orderRepo.findOneOrFail({
        where: { id },
        relations: relations,
      });
      return order;
    } catch (error) {
      throw new HttpException('order_not_found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);
    const updateOrder = { ...order, ...updateOrderDto };
    const save = await this.orderRepo.save(updateOrder);

    if (!save)
      throw new HttpException('update_order_faild', HttpStatus.BAD_GATEWAY);
    return { message: 'update_success', statusCode: HttpStatus.ACCEPTED };
  }

  async updateStatus(id, status?: OrderStatus) {
    // switch(status)
    const uOrder = await this.update(id, { status });
    return uOrder;
  }
  async remove(id: string) {
    const order = await this.orderRepo.delete(id);
    console.log('order ===> ', order);
    if (!order)
      throw new HttpException('delete_failed', HttpStatus.BAD_REQUEST);
    return { message: 'delete_success', statusCode: HttpStatus.ACCEPTED };
  }

  getTotalPrice(products: Product[]): number {
    let total = 0;
    products.forEach((p) => (total += p.price));
    return total;
  }
}
