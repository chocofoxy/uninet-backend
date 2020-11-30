import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClubModule } from './club/club.module';
import { FeedModule } from './feed/feed.module';
import { RangModule } from './rang/rang.module';
import { GroupModule } from './group/group.module';
import { HomeModule } from './home/home.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PostModule } from './post/post.module';
import { ProfileModule } from './profile/profile.module';


@Module({
  imports: [
    UserModule,
    AuthModule,
    ClubModule,
    FeedModule,
    RangModule,
    GroupModule,
    HomeModule,
    NotificationsModule,
    PostModule,
    ProfileModule,
    MongooseModule.forRoot(
      'mongodb+srv://root:root@cluster0.bvyxh.mongodb.net/uninet?retryWrites=true&w=majority', 
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'uninet',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
