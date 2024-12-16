import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(createTagDto: CreateTagDto) {
    const existingTag = await this.prisma.tag.findUnique({
      where: { name: createTagDto.name },
    });

    if (existingTag) {
      throw new ConflictException('Tag already exists');
    }

    return this.prisma.tag.create({
      data: createTagDto,
    });
  }

  async findAll() {
    return this.prisma.tag.findMany({
      include: {
        posts: {
          include: {
            post: true,
          },
        },
      },
    });
  }

  async findOne(uuid: string) {
    const tag = await this.prisma.tag.findUnique({
      where: { uuid },
      include: {
        posts: {
          include: {
            post: true,
          },
        },
      },
    });

    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return tag;
  }

  async update(uuid: string, updateTagDto: UpdateTagDto) {
    return this.prisma.tag.update({
      where: { uuid },
      data: updateTagDto,
    });
  }

  async remove(uuid: string) {
    return this.prisma.tag.delete({
      where: { uuid },
    });
  }
}