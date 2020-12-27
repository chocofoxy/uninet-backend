import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import { Notification } from './entities/notification.schema';
import { Event } from './entities/event.schema';

@Injectable()
export class NotificationService {


  constructor(
    @InjectModel(Notification.name) private notificationModel: Model<Notification> ,
    @InjectModel(Event.name) private eventModel: Model<Event> ,
  ){}
  
  async create() {
    const notification = new this.notificationModel()
    await notification.save()
    return notification._id
  }

  async notify(notificationId , event: Event): Promise<void> {
    const notification = await this.notificationModel.findById(notificationId)
    notification.events.push(event) ;
    notification.unread ++ ;
    await notification.save()
  }

  async clear(notificationId): Promise<void> {
    const notification = await this.notificationModel.findById(notificationId)
    notification.unread = 0
    await notification.save()
  }

  async event( user , post , message ) {
    return await ( new this.eventModel({ user: user , message: message , post: post})).save()
  }

}
