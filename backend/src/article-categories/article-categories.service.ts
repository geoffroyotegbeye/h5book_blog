import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ArticleCategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createArticleCategoryDto: CreateArticleCategoryDto,
  ) {
    try {
      const existingTag = await this.prisma.category.findUnique({
        where: {
          name: createArticleCategoryDto.name,
        },
      });

      if (existingTag) {
        throw new HttpException(
          'Une catégorie existe déjà sous ce nom',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newTag = await this.prisma.category.create({
        data: {
          name: createArticleCategoryDto.name.trim(),
          createdById: createArticleCategoryDto.userId,
        },
      });

      return {
        error: false,
        message: 'Catégorie ajouté avec succès.',
        data: newTag,
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
      const tags = await this.prisma.category.findMany({
        select: {
          uuid: true,
          name: true,
          createdById: true,
          createdAt: true,
        },
      });
      return {
        error: false,
        message: 'Catégories récupérées avec succès.',
        data: tags,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async findOne({ categoryId }: { categoryId: string }) {
    try {
      const existingCategory = await this.prisma.category.findUnique({
        where: {
          uuid: categoryId,
        },
      });

      if (!existingCategory) {
        throw new HttpException(
          'Catégorie introuvable',
          HttpStatus.BAD_REQUEST,
        );
      }
      return {
        error: false,
        message: 'Catégorie récupérée avec succès.',
        data: existingCategory,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async update({
    categoryId,
    updateArticleCategoryDto,
  }: {
    categoryId: string;
    updateArticleCategoryDto: UpdateArticleCategoryDto;
  }) {
    try {
      const existingCategory = await this.prisma.category.findUnique({
        where: {
          uuid: categoryId,
        },
      });

      if (!existingCategory) {
        throw new HttpException(
          'Catégorie introuvable',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (existingCategory.name === updateArticleCategoryDto.name.trim()) {
        throw new HttpException(
          "Erreur lors de la mise à jour. Vous n'avez pas changé le nom de la catégorie.",
          HttpStatus.BAD_REQUEST,
        );
      }

      const existingCategoryName = await this.prisma.category.findUnique({
        where: {
          name: updateArticleCategoryDto.name.trim(),
        },
      });

      if (existingCategoryName) {
        throw new HttpException(
          'Erreur lors de la mise à jour. Une catégorie existe déjà sous ce nom.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedCategory = await this.prisma.category.update({
        where: {
          uuid: categoryId,
        },
        data: {
          name: updateArticleCategoryDto.name.trim(),
          createdById: updateArticleCategoryDto.userId,
        },
      });
      return {
        error: false,
        message: 'Catégorie mis à jour avec succès.',
        data: updatedCategory,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async remove({ categoryId }: { categoryId: string }) {
    try {
      const existingCategory = await this.prisma.category.findUnique({
        where: {
          uuid: categoryId,
        },
      });

      if (!existingCategory) {
        throw new HttpException(
          'Catégorie introuvable',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.prisma.tag.delete({
        where: {
          uuid: categoryId,
        },
      });

      return {
        error: false,
        message: 'Catégorie supprimée avec succès.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
}
