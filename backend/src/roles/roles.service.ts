import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto, createdById: string) {
    try {
      const existingRole = await this.prisma.role.findUnique({
        where: { name: createRoleDto.name.trim() },
      });

      if (existingRole) {
        throw new HttpException('Role name already exists', HttpStatus.BAD_REQUEST);
      }

      const newRole = await this.prisma.role.create({
        data: {
          name: createRoleDto.name.trim(),
        },
      });

      return {
        error: false,
        message: 'Role created successfully.',
        data: newRole,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async findAll() {
    try {
      const roles = await this.prisma.role.findMany();

      return {
        error: false,
        message: 'Roles retrieved successfully.',
        data: roles,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async findOne(id: string) {
    try {
      const role = await this.prisma.role.findUnique({
        where: { uuid: id }
      });

      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }

      return {
        error: false,
        message: 'Role retrieved successfully.',
        data: role,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    try {
      // Vérification si le nom du rôle a changé et si le nouveau nom est unique
      const existingRole = await this.prisma.role.findUnique({
        where: { uuid: id },
      });

      if (!existingRole) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }

      if (existingRole.name === updateRoleDto.name.trim()) {
        throw new HttpException('Role name has not changed', HttpStatus.BAD_REQUEST);
      }

      const roleWithNewName = await this.prisma.role.findUnique({
        where: { name: updateRoleDto.name.trim() },
      });

      if (roleWithNewName) {
        throw new HttpException('Role name already exists', HttpStatus.BAD_REQUEST);
      }

      const updatedRole = await this.prisma.role.update({
        where: { uuid: id },
        data: {
          name: updateRoleDto.name.trim(),
        },
      });

      return {
        error: false,
        message: 'Role updated successfully.',
        data: updatedRole,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async remove(id: string) {
    try {
      const existingRole = await this.prisma.role.findUnique({
        where: { uuid: id },
      });

      if (!existingRole) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }

      await this.prisma.role.delete({
        where: { uuid: id },
      });

      return {
        error: false,
        message: 'Role deleted successfully.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
}
