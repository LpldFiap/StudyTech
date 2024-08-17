import { InjectModel } from '@nestjs/mongoose';
import { PostsRepository } from '../posts.repository';
import { Model } from 'mongoose';
import { Posts } from '@src/posts/schemas/posts.schema';
import { IPosts } from '@src/posts/schemas/models/posts.interface';

export class PostsMongooseRepository extends PostsRepository {
  constructor(
    @InjectModel(Posts.name) private readonly postsModel: Model<IPosts>,
  ) {
    super();
  }

  async getAllPosts(limit: number, page: number): Promise<IPosts[]> {
    const offset = (page - 1) * limit;
    return this.postsModel.find().skip(offset).limit(limit).exec();
  }

  async getPostsAdmin(): Promise<IPosts[]> {
    return this.postsModel.find().exec();
  }

  async createPost(createPostDto: IPosts): Promise<IPosts> {
    const createdPost = new this.postsModel(createPostDto);
    return createdPost.save();
  }

  async getPostById(id: string): Promise<IPosts> {
    return this.postsModel.findById(id).exec();
  }

  async search(query: string): Promise<IPosts[]> {
    return this.postsModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    }).exec();
  }

  async deletePostById(id: string): Promise<IPosts> {
    return this.postsModel.findByIdAndDelete(id).exec();
  }

  async updatePostById(
    createPostDtop: IPosts & { id: string },
  ): Promise<IPosts> {
    const { id, ...post } = createPostDtop;
    return this.postsModel.findByIdAndUpdate(id, post, { new: true }).exec();
  }
}
