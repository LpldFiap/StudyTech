import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Posts {
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
