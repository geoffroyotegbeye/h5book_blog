import { Module } from '@nestjs/common';
import { ArticleTagsService } from './article-tags.service';
import { ArticleTagsController } from './article-tags.controller';
import {PrismaService} from "../prisma.service";

@Module({
  controllers: [ArticleTagsController],
  providers: [ArticleTagsService, PrismaService],
})
export class ArticleTagsModule {}
