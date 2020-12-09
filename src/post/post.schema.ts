import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Comment } from '../comment/comment.schema'
import { Document, Types } from 'mongoose';


@Schema({ timestamps: true  , strict: false })
export class Post extends Document {
  @Prop()
  uid: number;

  @Prop({ required: false })
  user: {} ;

  @Prop({ required: false })
  text: string;

  @Prop({ default: null })
  media: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Comment.name }] })
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);