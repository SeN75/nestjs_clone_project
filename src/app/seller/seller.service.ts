import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UpdateUserDto } from '../user/dto/update-user.dto';
import { UserRole } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Seller } from './entities/seller.entity';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller) private readonly sellerRepo: Repository<Seller>,
    private readonly userSrv: UserService,
  ) {}
  async create(createSellerDto: CreateUserDto) {
    createSellerDto.role = UserRole.SELLER;
    const newUser = await this.userSrv.create(createSellerDto);
    const newSeller = this.sellerRepo.create({ user: newUser });
    return await this.sellerRepo
      .save(newSeller)
      .then((seller) => seller)
      .catch((error) => {
        throw new ConflictException('Seller aleady exist');
      });
  }

  async findAll(): Promise<Seller[]> {
    return await this.sellerRepo.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Seller> {
    return await this.sellerRepo
      .findOneOrFail({ where: { id } })
      .then((u) => u)
      .catch((erro) => {
        throw new NotFoundException('seller not exist!!');
      });
  }
}
