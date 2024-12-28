import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { ArticleTagsModule } from './article-tags/article-tags.module';
import configuration from './config/config';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({
    envFilePath: ['.env.development.local', '.env.development'],
    isGlobal: true,
    load: [configuration]
  }), ArticlesModule, ArticleTagsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
