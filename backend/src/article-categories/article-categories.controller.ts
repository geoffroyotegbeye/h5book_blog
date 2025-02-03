import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ArticleCategoriesService } from './article-categories.service';
import { CreateArticleCategoryDto } from './dto/create-article-category.dto';
import { UpdateArticleCategoryDto } from './dto/update-article-category.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

// @UseGuards(JwtAuthGuard)
@Controller('article-category')
export class ArticleCategoriesController {
  constructor(
    private readonly articleCategoriesService: ArticleCategoriesService,
  ) {}

  @Post()
  create(
    @Body() createArticleCategoryDto: CreateArticleCategoryDto,
    @Request() req: any,
  ) {
    // const userId = req.user.userId?.userId;
    return this.articleCategoriesService.create(
      createArticleCategoryDto,
    );
  }

  @Get()
  findAll() {
    return this.articleCategoriesService.findAll();
  }

  @Get(':categoryId')
  findOne(@Param('categoryId') categoryId: string) {
    return this.articleCategoriesService.findOne({ categoryId });
  }

  @Patch(':categoryId')
  update(
    @Param('categoryId') categoryId: string,
    @Body() updateArticleCategoryDto: UpdateArticleCategoryDto,
    // @Request() req: any,
  ) {
    // const userId = req.user.userId?.userId;
    return this.articleCategoriesService.update({
      categoryId,
      updateArticleCategoryDto,
    });
  }

  @Delete(':categoryId')
  remove(@Param('categoryId') categoryId: string) {
    return this.articleCategoriesService.remove({ categoryId });
  }
}
