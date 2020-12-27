import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './entities/profile.schema';
import { User, UserSchema } from './entities/user.schema';
import { FeedModule } from 'src/feed/feed.module';
import { RangModule } from 'src/rang/rang.module';
import { NotificationModule } from 'src/notification/notification.module';
import { SaveModule } from 'src/save/save.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Profile.name, schema: ProfileSchema }]),
    forwardRef(() => FeedModule ),
    forwardRef(() => RangModule ),
    forwardRef(() => SaveModule ),
    forwardRef(() => NotificationModule ),
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
