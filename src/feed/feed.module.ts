import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Feed, FeedSchema } from './entities/feed.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Feed.name, schema: FeedSchema }])],
  exports: [FeedService],
  controllers: [FeedController],
  providers: [FeedService]
})
export class FeedModule {}
