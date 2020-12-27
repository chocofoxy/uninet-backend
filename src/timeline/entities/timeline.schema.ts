import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Feed } from 'src/feed/entities/feed.schema';

@Schema({ timestamps: true  , strict: false })
export class Timeline extends Document {
  @Prop()
  uid: number;

  @Prop()
  name: string;

  @Prop({ type: Types.ObjectId, ref: Feed.name , autopopulate: true})
  feed: Feed;

}

export const TimelineSchema = SchemaFactory.createForClass(Timeline);