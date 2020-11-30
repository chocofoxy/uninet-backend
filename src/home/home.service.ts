import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedService } from 'src/feed/feed.service';
import { Post } from 'src/post/post.schema';
import { Home } from './home.schema';

@Injectable()
export class HomeService {

    constructor(
        @InjectModel(Home.name)
        private homeModel: Model<Home>,
        private feedService: FeedService
      ) {
        this.initTimelines()
      }

    async initTimelines() {
        await this.homeModel.collection.drop();
        const generalTimeline = new this.homeModel();
        const adminTimeline = new this.homeModel();
        generalTimeline.uid = 1;
        adminTimeline.uid = 2;
        generalTimeline.feed = (await this.feedService.create())._id
        adminTimeline.feed =  (await this.feedService.create())._id
        await generalTimeline.save();
        await adminTimeline.save();
    }

    async geTimeline(id: number) {
        return await this.homeModel.findOne({ uid: id }).populate({ 
            path: 'feed',
            model: 'Feed',
            populate: {
                path: 'posts',
                model: 'Post'
            }
        })
    }

    async PostToTimeline(id , post) {
        const timeline = await this.geTimeline(id)
        await this.feedService.addPost(timeline.feed._id,post)
    }
}
