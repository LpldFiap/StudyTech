import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from '../services/posts.service';

@Controller('stock')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.postsService.getAllPosts(limit, page);
  }
}
