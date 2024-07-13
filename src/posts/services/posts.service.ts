import { PostsRepository } from '../repositories/posts.repository';

export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) {}

  async getAllPosts(limit: number, page: number) {
    return this.postsRepository.getAllPosts(limit, page);
  }
}
