import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, authorId: string) {
    return this.prisma.comment.create({
      data: {
        ...createCommentDto,
        authorId,
      },
      include: {
        author: true,
        post: true,
      },
    });
  }

  async findAll() {
    return this.prisma.comment.findMany({
      include: {
        author: true,
        post: true,
        replies: true,
      },
    });
  }

  async findOne(uuid: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { uuid },
      include: {
        author: true,
        post: true,
        replies: {
          include: {
            author: true,
          },
        },
      },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async update(uuid: string, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: { uuid },
      data: updateCommentDto,
      include: {
        author: true,
        post: true,
      },
    });
  }

  async remove(uuid: string) {
    return this.prisma.comment.delete({
      where: { uuid },
    });
  }
}