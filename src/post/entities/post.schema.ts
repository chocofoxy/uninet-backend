import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/entities/user.schema';
import { Comment } from './comment.schema';


@Schema({ timestamps: true  , strict: false })
export class Post extends Document {
  @Prop()
  uid: number;

  @Prop({ type: Types.ObjectId, ref: User.name , autopopulate: true })
  user: User;

  @Prop()
  content: string;

  @Prop()
  media: [];

  @Prop({ type: [{ type: Types.ObjectId, ref: Comment.name , autopopulate: true }] , default: [] })
  comments: Comment[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  upvotes: User[];

}

export const PostSchema = SchemaFactory.createForClass(Post);