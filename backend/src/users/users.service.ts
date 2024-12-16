import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        uuid: true,
        name: true,
        email: true,
        bio: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findOne(uuid: string) {
    return this.prisma.user.findUnique({
      where: { uuid },
      include: {
        profile: true,
        posts: true,
      },
    });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { uuid },
      data: updateUserDto,
    });
  }

  async remove(uuid: string) {
    return this.prisma.user.delete({
      where: { uuid },
    });
  }
}