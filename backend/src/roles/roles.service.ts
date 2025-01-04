import {
  Injectable,
  HttpException,
  HttpStatus,
  OnModuleInit,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService implements OnModuleInit {
  private readonly logger = new Logger();
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async onModuleInit() {
    await this.seedRoles();
  }

  async seedRoles() {
    const roles = ['ADMIN', 'USER'];
    const startTime = Date.now();

    this.logger.log(
      `Début du l'enregistrement automatique des rôles à ${new Date().toISOString()}`,
    );

    for (const roleName of roles) {
      try {
        const existingRole = await this.prisma.role.findUnique({
          where: { name: roleName },
        });

        if (!existingRole) {
          await this.prisma.role.create({
            data: { name: roleName },
          });
          this.logger.log(`✅ Rôle "${roleName}" ajouté.`);
        } else {
          this.logger.warn(`⚠️ Rôle "${roleName}" existe déjà.`);
        }
      } catch (error) {
        this.logger.error(
          `Erreur lors du traitement du rôle "${roleName}": ${error.message}`,
        );
      }
    }

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    this.logger.log(`Fin du seedage des rôles à ${new Date().toISOString()}`);
    this.logger.log(`Durée totale : ${duration.toFixed(2)} secondes.`);
  }

  async create(createRoleDto: CreateRoleDto) {
    try {
      const existingRole = await this.prisma.role.findUnique({
        where: { name: createRoleDto.name.trim() },
      });

      if (existingRole) {
        throw new HttpException(
          'Le nom du rôle existe déjà.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newRole = await this.prisma.role.create({
        data: {
          name: createRoleDto.name.trim(),
        },
      });

      return {
        error: false,
        message: 'Rôle créé avec succès.',
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
        message: 'Rôles récupérés avec succès.',
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
        where: { uuid: id },
      });

      if (!role) {
        throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
      }

      return {
        error: false,
        message: 'Rôle récupéré avec succès.',
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
      const existingRole = await this.prisma.role.findUnique({
        where: { uuid: id },
      });

      if (!existingRole) {
        throw new HttpException('Rôle non trouvé', HttpStatus.NOT_FOUND);
      }

      if (existingRole.name === updateRoleDto.name.trim()) {
        throw new HttpException(
          "Le nom du rôle n'a pas changé",
          HttpStatus.BAD_REQUEST,
        );
      }

      const roleWithNewName = await this.prisma.role.findUnique({
        where: { name: updateRoleDto.name.trim() },
      });

      if (roleWithNewName) {
        throw new HttpException(
          'Le nom du rôle existe déjà',
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedRole = await this.prisma.role.update({
        where: { uuid: id },
        data: {
          name: updateRoleDto.name.trim().toUpperCase(),
        },
      });

      return {
        error: false,
        message: 'Rôle mis à jour avec succès.',
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
        throw new HttpException('Rôle non trouvé.', HttpStatus.NOT_FOUND);
      }

      await this.prisma.role.delete({
        where: { uuid: id },
      });

      return {
        error: false,
        message: 'Rôle supprimé avec succès.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
}
