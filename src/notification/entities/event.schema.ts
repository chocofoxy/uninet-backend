import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from 'src/post/entities/post.schema';
import { User } from 'src/user/entities/user.schema';


@Schema()
export class Event extends Document {
  @Prop()
  uid: number;

  @Prop()
  post: string ;

  @Prop({ type: Types.ObjectId, ref: 'User' , autopopulate: false })
  user: User;

  @Prop()
  message: String;
}

export const EventSchema = SchemaFactory.createForClass(Event);