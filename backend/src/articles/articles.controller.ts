import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @Request() req: any) {
    const userId = req.user.userId?.userId;
    return this.articlesService.create(createArticleDto, userId);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':articleId')
  findOne(@Param('articleId') articleId: string) {
    return this.articlesService.findOne({ articleId });
  }

  @Patch(':articleId')
  update(
      @Param('articleId') articleId: string,
      @Body() updateArticleDto: UpdateArticleDto,
      @Request() req: any,
  ) {
    const userId = req.user.userId?.userId;
    return this.articlesService.update({ articleId, updateArticleDto, userId });
  }

  @Delete(':articleId')
  remove(@Param('articleId') articleId: string) {
    return this.articlesService.remove({ articleId });
  }
}
