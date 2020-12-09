import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { Comment } from './comment.schema'

@Injectable()
export class CommentService {

    constructor(@InjectModel(Comment.name) private CommentModel: Model<Comment>){}

    async create ( user , text ) {
        const comment = new this.CommentModel({ comment: text , user: user })
        comment.comment = text 
        comment.user = user
        return await comment.save()
    }
}
