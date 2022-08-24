import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategroy = await this.categoryRepo.create(createCategoryDto);
      const category = await this.categoryRepo.save(newCategroy);
      if (!category)
        throw new HttpException('categroy_aleady_exist', HttpStatus.NOT_FOUND);
      return category;
    } catch (error) {
      throw new HttpException({}, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryRepo.find();
      return categories;
    } catch (err) {
      throw new HttpException('categories_not_found', HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: string) {
    const category = await this.categoryRepo.findOneByOrFail({ id });
    if (!category)
      throw new HttpException('category_not_found', HttpStatus.NOT_FOUND);
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    const updatedCate = { ...category, ...updateCategoryDto };

    try {
      return await this.categoryRepo.save(updatedCate);
    } catch (error) {
      throw new HttpException({}, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
