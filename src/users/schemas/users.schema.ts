import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Users {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  role: 'teacher' | 'student';

  @Prop({ default: Date.now })
  created_at: Date;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
