import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { NotificationModule } from './notification/notification.module';
import { FeedModule } from './feed/feed.module';
import { TimelineModule } from './timeline/timeline.module';
import { GroupModule } from './group/group.module';
import { RangModule } from './rang/rang.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { SaveModule } from './save/save.module';

@Module({
  imports: [UserModule, NotificationModule, PostModule, AuthModule, FeedModule, TimelineModule, GroupModule, RangModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:root@cluster0.bvyxh.mongodb.net/uninet?retryWrites=true&w=majority', 
        {
        connectionFactory: (connection) => {
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        }
      }),
    ServeStaticModule.forRoot({
        rootPath: join(__dirname, '..', 'uploads'),
      }),
    SaveModule,
  ],
  controllers: [AppController],
  providers: [AppService,NotificationModule],
})
export class AppModule {}
