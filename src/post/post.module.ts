import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema, Post } from './entities/post.schema';
import { TimelineModule } from 'src/timeline/timeline.module';
import { FeedModule } from 'src/feed/feed.module';
import { UserModule } from 'src/user/user.module';
import { CommentSchema, Comment } from './entities/comment.schema';
import { NotificationModule } from 'src/notification/notification.module';
//import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema },{ name: Comment.name, schema: CommentSchema }]),
    /*MulterModule.register({
      dest: '/upload',
    }),*/
    forwardRef( () => NotificationModule ),
    forwardRef( () => TimelineModule ),
    forwardRef( () => UserModule ),
    forwardRef( () => FeedModule )
  ],
  exports: [PostService],
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
