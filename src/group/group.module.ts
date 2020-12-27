import { forwardRef, Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { RangModule } from 'src/rang/rang.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/user/user.module';
import { Group, GroupSchema } from './entities/group.entity';
import { FeedModule } from 'src/feed/feed.module';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
  forwardRef(() => UserModule) ,
  forwardRef(() => RangModule) ,
  forwardRef(() => PostModule) ,
  forwardRef(() => FeedModule) ,
  
],
  exports: [GroupService],
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}
