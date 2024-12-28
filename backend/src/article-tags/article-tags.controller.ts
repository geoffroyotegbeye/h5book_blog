import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ArticleTagsService } from './article-tags.service';
import { CreateArticleTagDto } from './dto/create-article-tag.dto';
import { UpdateArticleTagDto } from './dto/update-article-tag.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('article-tags')
export class ArticleTagsController {
  constructor(private readonly articleTagsService: ArticleTagsService) {}

  @Post()
  create(@Body() createArticleTagDto: CreateArticleTagDto, @Request() req: any) {
    const userId = req.user.userId?.userId;
    return this.articleTagsService.create(createArticleTagDto, userId);
  }

  @Get()
  findAll() {
    return this.articleTagsService.findAll();
  }

  @Get(':tagId')
  findOne(@Param('tagId') tagId: string) {
    return this.articleTagsService.findOne({ tagId });
  }

  @Patch(':tagId')
  update(
      @Param('tagId') tagId: string,
      @Body() updateArticleTagDto: UpdateArticleTagDto,
      @Request() req: any,
  ) {
    const userId = req.user.userId?.userId;
    return this.articleTagsService.update({ tagId, updateArticleTagDto });
  }

  @Delete(':tagId')
  remove(@Param('tagId') tagId: string) {
    return this.articleTagsService.remove({ tagId });
  }
}
