import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Group } from 'src/group/entities/group.entity';
import { User } from '../../user/entities/user.schema';


@Schema({ timestamps: true  , strict: false })

export class Rang extends Document {

  @Prop()
  uid: number;

  @Prop({ unique: true })
  name: string;

  @Prop()
  department: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' , autopopulate: true }] })
  students: User[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Group' , autopopulate: false }] })
  groups: Group[];

}

export const RangSchema = SchemaFactory.createForClass(Rang);
