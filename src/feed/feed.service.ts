import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feed } from './feed.schema';

@Injectable()
export class FeedService {

    constructor(@InjectModel(Feed.name) private FeedModel: Model<Feed>){
        //this.FeedModel.collection.drop();
    }

    async create() {
        const feed = new this.FeedModel()
        await feed.save()
        return feed
    }

    async addPost( id , post ) {
        const feed = await this.FeedModel.findById(id)
        feed.posts.push(post._id)
        await feed.save()
    }

}
