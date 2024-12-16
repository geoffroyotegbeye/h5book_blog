import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new ConflictException('Category already exists');
    }

    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        posts: true,
      },
    });
  }

  async findOne(uuid: string) {
    const category = await this.prisma.category.findUnique({
      where: { uuid },
      include: {
        posts: true,
      },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(uuid: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { uuid },
      data: updateCategoryDto,
    });
  }

  async remove(uuid: string) {
    return this.prisma.category.delete({
      where: { uuid },
    });
  }
}