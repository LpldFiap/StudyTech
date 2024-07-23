import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IPosts } from './models/posts.interface';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Posts>;

@Schema()
export class Posts implements IPosts {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  author: string;

  @Prop({ default: Date.now })
  created_at: Date;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
