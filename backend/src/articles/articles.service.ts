import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArticleDto: CreateArticleDto, userId: string) {
    try {
      const newArticle = await this.prisma.article.create({
        data: {
          title: createArticleDto.title.trim(),
          author: createArticleDto.author.trim(),
          source: createArticleDto.source.trim(),
          category: createArticleDto.category.trim(),
          summary: createArticleDto.summary.trim(),
          content: createArticleDto.content.trim(),
          time: createArticleDto.time ? new Date(createArticleDto.time) : undefined,
          image: createArticleDto.image,
          tags: createArticleDto.tags
              ? {
                connect: createArticleDto.tags.map((tagId) => ({
                  uuid: tagId,
                })),
              }
              : undefined,
          createdById: userId,
        },
        include: {
          tags: true,
        },
      });

      return {
        error: false,
        message: 'Article créé avec succès.',
        data: newArticle,
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
      const articles = await this.prisma.article.findMany({
        include: {
          tags: true,
        },
      });

      return {
        error: false,
        message: 'Articles récupérés avec succès.',
        data: articles,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async findOne({ articleId }: { articleId: string }) {
    try {
      const existingArticle = await this.prisma.article.findUnique({
        where: {
          uuid: articleId,
        },
        include: {
          tags: true,
        },
      });

      if (!existingArticle) {
        throw new HttpException('Article introuvable', HttpStatus.NOT_FOUND);
      }

      return {
        error: false,
        message: 'Article récupéré avec succès.',
        data: existingArticle,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async update({
                 articleId,
                 updateArticleDto,
                 userId,
               }: {
    articleId: string;
    updateArticleDto: UpdateArticleDto;
    userId: string;
  }) {
    try {
      const existingArticle = await this.prisma.article.findUnique({
        where: {
          uuid: articleId,
        },
      });

      if (!existingArticle) {
        throw new HttpException('Article introuvable', HttpStatus.NOT_FOUND);
      }

      const updatedArticle = await this.prisma.article.update({
        where: {
          uuid: articleId,
        },
        data: {
          title: updateArticleDto.title.trim(),
          author: updateArticleDto.author.trim(),
          source: updateArticleDto.source.trim(),
          category: updateArticleDto.category.trim(),
          summary: updateArticleDto.summary.trim(),
          content: updateArticleDto.content.trim(),
          time: updateArticleDto.time ? new Date(updateArticleDto.time) : undefined,
          image: updateArticleDto.image,
          tags: updateArticleDto.tags
              ? {
                set: updateArticleDto.tags.map((tagId) => ({ uuid: tagId })),
              }
              : undefined,
        },
        include: {
          tags: true,
        },
      });

      return {
        error: false,
        message: 'Article mis à jour avec succès.',
        data: updatedArticle,
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }

  async remove({ articleId }: { articleId: string }) {
    try {
      const existingArticle = await this.prisma.article.findUnique({
        where: {
          uuid: articleId,
        },
      });

      if (!existingArticle) {
        throw new HttpException('Article introuvable', HttpStatus.NOT_FOUND);
      }

      await this.prisma.article.delete({
        where: {
          uuid: articleId,
        },
      });

      return {
        error: false,
        message: 'Article supprimé avec succès.',
      };
    } catch (error) {
      return {
        error: true,
        message: error.message,
      };
    }
  }
}
