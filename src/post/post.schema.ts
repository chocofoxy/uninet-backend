import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Post extends Document {
  @Prop()
  uid: number;

  @Prop({ required: false })
  text: string;

  @Prop({ default: null })
  media: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);