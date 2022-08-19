import {
  HttpException,
  Injectable,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from '../../auth/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  // signup new user
  async create(createUserDto: CreateUserDto) {
    //
    try {
      const user = await this.userRepo.create({
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        role: createUserDto.role,
        username: createUserDto.username,
      });
      //
      return this.userRepo
        .save(user)
        .then((u) => u)
        .catch(() => {
          throw new ConflictException(
            'email or username aleady exist, or invalid role',
          );
        });
      //
    } catch (error) {
      throw new HttpException({}, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async login(loginDto: LoginDto) {
    const requst = await this.userRepo.findOneOrFail({
      where: [{ password: loginDto.password, email: loginDto.email }],
    });
    return requst;
  }
}
