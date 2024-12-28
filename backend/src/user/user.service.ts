import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: {
        uuid: true,
        email: true,
        firstName: true,
        lastName: true,
        isActivated: true,
        activatedAt: true,
        roles: true,
        profileUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  }

  async getUser({ userId }: { userId: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid: userId,
      },
      select: {
        uuid: true,
        email: true,
        firstName: true,
        lastName: true,
        isActivated: true,
        activatedAt: true,
        roles: true,
        profileUrl: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  }
}
