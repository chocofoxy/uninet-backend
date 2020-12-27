import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from 'src/post/entities/post.schema';


@Schema({ timestamps: true  , strict: false })
export class Feed extends Document {
  @Prop()
  uid: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: Post.name, autopopulate: true  }] })
  posts: Post[];

}

export const FeedSchema = SchemaFactory.createForClass(Feed);