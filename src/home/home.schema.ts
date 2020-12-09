import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Feed } from 'src/feed/feed.schema';
import { Post } from 'src/post/post.schema';


@Schema()
export class Home extends Document {
  @Prop()
  uid: number;

  @Prop({ default: 0 })
  name: string;

  @Prop({ type: Types.ObjectId, ref: Feed.name, autopopulate: true })
  feed: Feed;
}


export const HomeSchema = SchemaFactory.createForClass(Home) ;