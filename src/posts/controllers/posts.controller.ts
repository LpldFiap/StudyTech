import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
// import { Posts } from '../schemas/posts.schema';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async getAllPosts(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.postsService.getAllPosts(limit, page);
  }
  //criando a rota para a criação de novas postagens
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto) {
    const createdPost = await this.postsService.createPost(createPostDto);
    return {
      title: createdPost.title,
      description: createdPost.description,
      autor: createdPost.author,
    };
  }
}
