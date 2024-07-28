import { IPosts } from '../schemas/models/posts.interface';

export abstract class PostsRepository {
  abstract getAllPosts(limit: number, page: number): Promise<IPosts[]>;
  abstract createPost(createPostDto: IPosts): Promise<IPosts>;
  abstract getPostById(id: string): Promise<IPosts>;
  abstract updatePostById(
    updatePostDto: IPosts & { id: string },
  ): Promise<IPosts>;
  abstract deletePostById(id: string): Promise<IPosts>;
}
