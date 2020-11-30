import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from 'src/post/post.schema';


@Schema()
export class Feed extends Document {
  @Prop()
  uid: number;

  @Prop({ default: 0 })
  count: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: Post.name }] })
  posts: Post[];
}

export const FeedSchema = SchemaFactory.createForClass(Feed);