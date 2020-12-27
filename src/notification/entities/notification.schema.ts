import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Event }  from './event.schema';
import { Document, Types } from 'mongoose';


@Schema()
export class Notification extends Document {
  @Prop()
  uid: number;

  @Prop({ default: 0 })
  unread: number;

  @Prop({ type:[{ type: Types.ObjectId, ref: Event.name , autopopulate: true}] , default: [] })
  events: Event[];
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);