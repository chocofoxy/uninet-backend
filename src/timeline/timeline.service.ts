import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedService } from 'src/feed/feed.service';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { UpdateTimelineDto } from './dto/update-timeline.dto';
import { Timeline } from './entities/timeline.schema';

@Injectable()
export class TimelineService {

  constructor(
    @InjectModel(Timeline.name) private TimelineModel: Model<Timeline> ,
    private feedService: FeedService
  )
  {
    this.init()
  }

  async init() {
    const timelines = await this.TimelineModel.countDocuments() == 0
    if (timelines) {
      await (new this.TimelineModel({ name: 'general' ,  uid: 2 , feed: await this.feedService.create() })).save();
      await (new this.TimelineModel({ name: 'administration' , uid: 1 , feed: await this.feedService.create() })).save();
      await (new this.TimelineModel({ name: 'reported' , uid: 3 , feed: await this.feedService.create() })).save();
    }
  }

  async getTimeline(id: number) {
    return await this.TimelineModel.findOne({ uid: id })
  }

  async findAll() {
    return await this.TimelineModel.find()
  }



}
