import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/posts')
  getPosts() {
    return this.appService.getHello('Get /posts');
  }

  @Get('/posts/:id')
  getPost() {
    return this.appService.getHello('Get /posts/:id');
  }

  @Post('/posts')
  createPost() {
    return this.appService.getHello('Post /posts');
  }

  @Put('/posts/:id')
  updatePost() {
    return this.appService.getHello('Put /posts/:id');
  }

  @Delete('/posts/:id')
  deletePost() {
    return this.appService.getHello('Delete /posts/:id');
  }

  @Get('/posts/search')
  searchPost() {
    return this.appService.getHello('Get /posts/search');
  }
}
