import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
