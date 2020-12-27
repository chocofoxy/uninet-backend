import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Profile } from './profile.schema';
import { Notification } from 'src/notification/entities/notification.schema';
import { Rang } from 'src/rang/entities/rang.schema';
import { Save } from 'src/save/entities/save.entity';
import { UserRole } from 'src/roles/roles';


@Schema({ timestamps: true  , strict: false })
export class User extends Document {
  @Prop()
  uid: number;

  @Prop()
  email: String ;

  @Prop()
  cin: string;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ type: Types.ObjectId, ref: Profile.name , autopopulate: true })
  profile: Profile ;

  @Prop({ type: Types.ObjectId, ref: Notification.name , autopopulate: true })
  notification: Notification ;

  @Prop({ type: Types.ObjectId, ref: Rang.name , autopopulate: false })
  class: Rang ;

  @Prop({ type: Types.ObjectId, ref: Save.name , autopopulate: false })
  saves: Save ;

  @Prop()
  password: string;

  @Prop({ default: false })
  valid: boolean;

  @Prop({ default: UserRole.Student , enum: UserRole })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);