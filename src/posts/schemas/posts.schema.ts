import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IPosts } from './models/posts.interface';
import mongoose, { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Posts>;

@Schema()
export class Posts implements IPosts {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  autor: string;
  @Prop()
  created_at: Date;
}

export const PostsSchema = SchemaFactory.createForClass(Posts);
