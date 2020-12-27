import { forwardRef, Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { NotificationSchema, Notification } from './entities/notification.schema';
import { EventSchema, Event } from './entities/event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema },{ name: Event.name, schema: EventSchema }]) ,
    forwardRef(() => UserModule ),
    forwardRef(() => AuthModule ),
  ],
  exports: [NotificationService, NotificationGateway],
  providers: [NotificationGateway, NotificationService]
})
export class NotificationModule {}
