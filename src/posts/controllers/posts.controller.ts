import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostsProvider } from '../provider/posts.provider';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private postsProvider: PostsProvider,
  ) {}

  @Get()
  async getAllPosts(
    @Query('limit') limit: number,
    @Query('page') page: number,
  ) {
    return this.postsService.getAllPosts(limit, page);
  }
  @Get('/:id')
  async getOnePost(@Param('id') id: string) {
    const post = await this.postsService.getPostById(id);
    return post || 'Post não encontrado.';
  }
  //criando a rota para a criação de novas postagens
  @Post()
  async createPost(@Body() createPostDto: CreatePostDto & { user_id: string }) {
    const role = await this.postsProvider.checkUserRole(createPostDto.user_id);
    if (role && role === 'teacher') {
      const createdPost = await this.postsService.createPost(createPostDto);
      return {
        title: createdPost.title,
        description: createdPost.description,
        autor: createdPost.author,
      };
    }
    return 'Você não tem permissão para criar postagens.';
  }

  @Put('/:id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: CreatePostDto & { user_id: string },
  ) {
    const role = await this.postsProvider.checkUserRole(updatePostDto.user_id);
    if (role && role === 'teacher') {
      return this.postsService.updatePostById({ ...updatePostDto, id });
    }
    return 'Você não tem permissão para atualizar postagens.';
  }

  @Delete('/:id')
  async deletePostById(
    @Param('id') id: string,
    @Body() { user_id }: { user_id: string },
  ) {
    const role = await this.postsProvider.checkUserRole(user_id);
    if (role && role === 'teacher') {
      const deletedPost = await this.postsService.deletePostById(id);
      return deletedPost
        ? `Post ${deletedPost.title} deletado com sucesso.`
        : 'Post não encontrado.';
    }
    return 'Você não tem permissão para deletar postagens.';
  }
}
