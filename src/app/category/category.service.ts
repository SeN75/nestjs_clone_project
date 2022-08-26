import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException(
        { message: error.detail } || {},
        HttpStatus.BAD_REQUEST,
      );
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
  async findAllByIds(ids: string[]) {
    const arr = ids.map((id) => {
      return { id };
    });
    try {
      const catgories = await this.categoryRepo.findBy(arr);
      return catgories;
    } catch (erro) {
      console.log('erro ====> ', erro);
      throw new HttpException(
        'some_or_all_categories_not_found',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async findOne(id: string) {
    try {
      const category = await this.categoryRepo.findOneByOrFail({ id });
      return category;
    } catch (err) {
      throw new HttpException('category_not_found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);
    if (Object.keys(updateCategoryDto).length == 0)
      throw new HttpException('body_empty', HttpStatus.BAD_REQUEST);
    const updatedCate = { ...category, ...updateCategoryDto };

    try {
      return await this.categoryRepo.save(updatedCate);
    } catch (error) {
      console.error('error ===> ', error);
      throw new HttpException({}, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    const category = await this.categoryRepo
      .delete(id)
      .then((cate) => {
        return { message: 'category_deleted_successfully' };
      })
      .catch((err) => {
        throw new HttpException('category_not_found', HttpStatus.NOT_FOUND);
      });

    return category;
  }
}
