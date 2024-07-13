import { InjectModel } from '@nestjs/mongoose';
import { PostsRepository } from '../posts.repository';
import { Model } from 'mongoose';
import { Posts } from 'src/posts/schemas/posts.schema';
import { IPosts } from 'src/posts/schemas/models/posts.interface';

export class PostsMongooseRepository extends PostsRepository {
  constructor(
    @InjectModel(Posts.name) private readonly postsModel: Model<Posts>,
  ) {
    super();
  }

  async getAllPosts(limit: number, page: number): Promise<IPosts[]> {
    const offset = (page - 1) * limit;
    return this.postsModel.find().skip(offset).limit(limit).exec();
  }
}
