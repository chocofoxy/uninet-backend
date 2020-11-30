import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from 'src/post/post.schema';


@Schema()
export class Comment extends Document {
  @Prop()
  uid: number;

  @Prop()
  userId: number;

  @Prop()
  userName: String;

  @Prop()
  comment: string
}

export const FeedSchema = SchemaFactory.createForClass(Comment);