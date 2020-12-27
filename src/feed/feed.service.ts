import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { Feed } from './entities/feed.schema';

@Injectable()
export class FeedService {

  constructor(
    @InjectModel(Feed.name) private FeedModel: Model<Feed>,
  ){}

  async create() {
    const feed = new this.FeedModel()
    return (await feed.save())._id
  }

  findOne(id) {
    return this.FeedModel.findById(id)
  }
  
}
