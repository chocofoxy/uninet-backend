import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { UserModule } from 'src/user/user.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  exports: [PostService],
  imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  forwardRef(() => UserModule), 
  forwardRef(() => CommentModule)],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
