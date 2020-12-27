import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/entities/user.schema';


@Schema({ timestamps: true  , strict: false })
export class Comment extends Document {
  @Prop()
  uid: number;

  @Prop({ type: Types.ObjectId, ref: User.name , autopopulate: true })
  user: User;

  @Prop()
  content: string;

}

export const CommentSchema = SchemaFactory.createForClass(Comment);