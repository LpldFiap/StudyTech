import { IPosts } from '../schemas/models/posts.interface';

export abstract class PostsRepository {
  abstract getAllPosts(limit: number, page: number): Promise<IPosts[]>;
  abstract createPost(createPostDto: IPosts): Promise<IPosts>;
}
