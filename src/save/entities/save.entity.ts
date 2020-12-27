import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from 'src/post/entities/post.schema';


@Schema({ timestamps: true  , strict: false })
export class Save extends Document {
  @Prop()
  uid: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Post' }]  })
  saved: Post[];

}

export const SaveSchema = SchemaFactory.createForClass(Save);