import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserRole } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { BalanceDto } from './dto/balance.dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client) private clientRepo: Repository<Client>,
    private readonly userSrv: UserService,
  ) {}
  async create(createClientDto: CreateUserDto) {
    createClientDto.role = UserRole.CLIENT;
    const client = await this.userSrv.create(createClientDto);
    const newClient = await this.clientRepo.create({
      id: client.id,
    });
    return await this.clientRepo
      .save(newClient)
      .then((u) => u)
      .catch(() => {
        throw new ConflictException('client aleady exist!!');
      });
  }

  async findAll(
    relitions = ['currentOrder', 'historyOrder'],
  ): Promise<Client[]> {
    return await this.clientRepo.find({
      relations: relitions,
    });
  }

  async findOne(id: string, relitions = ['currentOrder', 'historyOrder']) {
    const client = await this.clientRepo
      .findOneOrFail({
        where: { id },
        relations: relitions,
      })
      .then((u) => u)
      .catch(() => {
        throw new NotFoundException('client not found or exist!!');
      });
    return client;
  }

  async update(id: string, updateClientDto: UpdateUserDto) {
    const updateUser = await this.userSrv.update(id, updateClientDto);
    return updateUser;
  }

  async incressBalance(balanceDto: BalanceDto) {
    const client = await this.findOne(balanceDto.id, []);
    client.balance += balanceDto.amount;
    console.log('client ===> ', client);
    // client.currentOrder = '';
    return await this.clientRepo
      .save(client)
      .then((data) => {
        return {
          message: 'Client balance updated',
          data: data,
        };
      })
      .catch((error) => {
        console.error(error);
      });
  }
  async decressBalance(balanceDto: BalanceDto) {
    if (!balanceDto) throw new HttpException({}, HttpStatus.BAD_REQUEST);
    const client = await this.findOne(balanceDto.id, []);

    if (client.balance < balanceDto.amount)
      throw new BadRequestException(
        'the amount is more than client haveing in his balance',
      );

    client.balance -= balanceDto.amount;

    return this.clientRepo.save(client).then((data) => {
      return {
        message: 'Client balance updated',
        data: data,
      };
    });
  }
  async setCurrentOrder(clientId: string, orderId: string) {
    const client = await this.findOne(clientId, ['currentOrder']);
    const order = orderId;

    // client.currentOrder = orderId;
    return this.clientRepo
      .save(client)
      .then((data) => {
        return {
          message: 'setting current order to client',
          data: data,
        };
      })
      .catch((error) => {
        throw new NotFoundException();
      });
  }
  async remove(id: string) {
    const user = await this.userSrv.remove(id);
    const client = await this.clientRepo
      .delete({ id })
      .then(() => `client was deleted successfully`)
      .catch(() => {
        throw new NotFoundException('client not found');
      });
    return client;
  }
}
