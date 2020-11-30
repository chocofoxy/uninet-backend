import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Notification extends Document {
  @Prop()
  uid: number;

  @Prop({ default: 0 })
  unread: number;

  @Prop({ default: [] })
  events: String[];
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);