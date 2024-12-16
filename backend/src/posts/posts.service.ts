import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import slugify from 'slugify';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, authorId: string) {
    const slug = slugify(createPostDto.title, { lower: true });
    
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        slug,
        authorId,
      },
      include: {
        author: true,
        category: true,
        tags: true,
      },
    });
  }

  async findAll() {
    return this.prisma.post.findMany({
      include: {
        author: true,
        category: true,
        tags: true,
      },
    });
  }

  async findOne(uuid: string) {
    const post = await this.prisma.post.findUnique({
      where: { uuid },
      include: {
        author: true,
        category: true,
        tags: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(uuid: string, updatePostDto: UpdatePostDto) {
    if (updatePostDto.title) {
      updatePostDto['slug'] = slugify(updatePostDto.title, { lower: true });
    }

    return this.prisma.post.update({
      where: { uuid },
      data: updatePostDto,
      include: {
        author: true,
        category: true,
        tags: true,
      },
    });
  }

  async remove(uuid: string) {
    return this.prisma.post.delete({
      where: { uuid },
    });
  }
}