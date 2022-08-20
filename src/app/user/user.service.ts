import {
  HttpException,
  Injectable,
  HttpStatus,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from '../../auth/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  // signup new user
  async create(createUserDto: CreateUserDto) {
    //
    try {
      if (!createUserDto.role) createUserDto.role = UserRole.GUST;
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

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepo
      .findOneOrFail({ where: { id } })
      .then((u) => u)
      .catch(() => {
        throw new NotFoundException('user not found or exist!!');
      });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    if (updateUserDto['id'])
      throw new BadRequestException("id can't be changed");

    const updateData = { ...user, ...updateUserDto };
    return await this.userRepo
      .save(updateData)
      .then(() => {
        return {
          data: updateUserDto,
          message: 'user update information successfully',
        };
      })
      .catch((err) => {
        throw new HttpException({}, HttpStatus.BAD_REQUEST);
      });
  }

  async remove(id: string) {
    const user = await this.userRepo
      .delete(id)
      .then(() => {
        return { message: `user deleted successfully` };
      })
      .catch(() => {
        throw new NotFoundException('user not found or exist!!');
      });
    return user;
  }
  async login(loginDto: LoginDto) {
    const requst = await this.userRepo.findOneOrFail({
      where: [{ password: loginDto.password, email: loginDto.email }],
    });
    return requst;
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepo.findOneOrFail({ where: { email } });
    return user;
  }
}
