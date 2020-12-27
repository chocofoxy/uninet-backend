import { forwardRef, Module } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { TimelineController } from './timeline.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Timeline, TimelineSchema } from './entities/timeline.schema';
import { FeedModule } from 'src/feed/feed.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Timeline.name, schema: TimelineSchema }]),
    forwardRef(() => FeedModule )
  ],
  exports: [TimelineService],
  controllers: [TimelineController],
  providers: [TimelineService]
})
export class TimelineModule {}
