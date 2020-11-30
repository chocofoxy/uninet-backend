import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Feed, FeedSchema } from './feed.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Feed.name, schema: FeedSchema }])],
  exports: [FeedService],
  providers: [FeedService],
  controllers: [FeedController]
})
export class FeedModule {}
