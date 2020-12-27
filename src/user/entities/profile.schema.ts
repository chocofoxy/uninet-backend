import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Feed } from 'src/feed/entities/feed.schema';


@Schema({ timestamps: true ,  strict: false})
export class Profile extends Document {
  @Prop()
  uid: number;

  @Prop()
  dn: Date;

  @Prop({ default:[] })
  photo: any[] ;

  @Prop()
  bio: string;

  @Prop({ type: Types.ObjectId, ref: "Feed" , autopopulate: true })
  feed: Feed;
  
  @Prop({ default: false })
  seted: Boolean;

}

export const ProfileSchema = SchemaFactory.createForClass(Profile);