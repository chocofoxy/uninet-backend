import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostService {

    constructor(@InjectModel(Post.name) private PostModel: Model<Post>){
        //this.PostModel.collection.drop();
    }

    async create(user,text) {
        const post = new this.PostModel({ text: text , user: user })
        post.user = user
        post.text = text 
        return await post.save() 
    }

    async update(id,text) {
        const post = await this.PostModel.findById(id)
        post.text = text 
        return await post.save()
    }

    async comment(id, comment) {
        const post = await this.PostModel.findById(id)
        post.comments.push( comment._id ) 
        return await post.save()
    }

    async upvote(id , userId) {
        const post = await this.PostModel.findById(id)
        if ( !(userId  in post.upvotes) )
        post.upvotes.push(userId)
        return await post.save()
    }

    async downvote(id , userId) {
        const post = await this.PostModel.findById(id)
        if ( userId  in post.upvotes )
        post.upvotes.splice( post.upvotes.indexOf(userId) , 1)
        return await post.save()
    }

    async delete( id , user ) {
        const post = await this.PostModel.findById(id)
        //if ( user.id == post.user.id ) {
            await post.remove()
        //}
    }
}
