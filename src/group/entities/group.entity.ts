import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Feed } from 'src/feed/entities/feed.schema';
import { Post } from 'src/post/entities/post.schema';
import { Rang } from 'src/rang/entities/rang.schema';
import { User } from 'src/user/entities/user.schema';


@Schema()
export class Group extends Document {
  @Prop()
  uid: number;

  @Prop()
  name: string ;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Rang'  })
  class: Rang;

  @Prop({ type: Types.ObjectId, ref: 'Feed'  })
  feed: Feed;
}

export const GroupSchema = SchemaFactory.createForClass(Group);