import { InjectModel } from '@nestjs/mongoose';
import { PostsRepository } from '../posts.repository';
import { Model } from 'mongoose';
import { Posts } from '../../schemas/posts.schema';
import { IPosts } from '../../schemas/models/posts.interface';

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

  async createPost(createPostDto: IPosts): Promise<IPosts> {
    const createdPost = new this.postsModel(createPostDto);
    return createdPost.save();
  }

  async getPostById(id: string): Promise<IPosts> {
    const post = this.postsModel.findById(id);
    return post;
  }

  async deletePostById(id: string): Promise<IPosts> {
    const post = this.postsModel.findByIdAndDelete(id).exec();
    return post;
  }

  async updatePostById(
    createPostDtop: IPosts & { id: string },
  ): Promise<IPosts> {
    const { id, ...post } = createPostDtop;
    const updatedPost = this.postsModel.findByIdAndUpdate(id, post).exec();
    return updatedPost;
  }
}
