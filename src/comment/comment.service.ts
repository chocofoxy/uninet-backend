import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { from } from 'rxjs';
import { Comment } from './comment.schema'

@Injectable()
export class CommentService {

    constructor(@InjectModel(Comment.name) private CommentModel: Model<Comment>){}

    create ( user , text ) {
        const comment = new this.CommentModel({ text: text })
    }
}
