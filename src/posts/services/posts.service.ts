//import { PostsRepository } from '../repositories/posts.repository';
import { Injectable } from '@nestjs/common';
import { IPosts } from '../schemas/models/posts.interface';
import { PostsRepository } from '../repositories/posts.repository';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getAllPosts(limit: number, page: number): Promise<IPosts[]> {
    return this.postsRepository.getAllPosts(limit, page);
  }
  async getPostById(id: string): Promise<IPosts> {
    return this.postsRepository.getPostById(id);
  }

  async createPost(createPostDto: CreatePostDto): Promise<IPosts> {
    const newPost: IPosts = {
      title: createPostDto.title,
      description: createPostDto.description,
      author: createPostDto.author,
      created_at: new Date(),
    };
    return this.postsRepository.createPost(newPost);
  }

  async updatePostById(createPostDto: CreatePostDto & { id: string }) {
    const post = await this.postsRepository.getPostById(createPostDto.id);
    post.title = createPostDto.title;
    post.description = createPostDto.description;
    post.author = createPostDto.author;
    return this.postsRepository.createPost(post);
  }

  async deletePostById(id: string): Promise<IPosts> {
    return this.postsRepository.deletePostById(id);
  }
}
