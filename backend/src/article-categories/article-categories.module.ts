import { Module } from '@nestjs/common';
import { ArticleCategoriesService } from './article-categories.service';
import { ArticleCategoriesController } from './article-categories.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [ArticleCategoriesController],
  providers: [ArticleCategoriesService, PrismaService],
})
export class ArticleCategoriesModule {}
