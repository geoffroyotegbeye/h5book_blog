import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { ArticleTagsModule } from './article-tags/article-tags.module';
import { RolesModule } from './roles/roles.module';
import configuration from './config/config';
import { ArticleCategoriesModule } from './article-categories/article-categories.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({
    envFilePath: ['.env','.env.development.local', '.env.development'],
    isGlobal: true,
    load: [configuration]
  }), ArticlesModule, ArticleTagsModule, RolesModule, ArticleCategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
