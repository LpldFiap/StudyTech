import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PostsModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
