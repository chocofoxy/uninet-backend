import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from 'src/comment/comment.service';
import { UserService } from 'src/user/user.service';
import { PostService } from './post.service';

@UseGuards(AuthGuard('jwt'))
@Controller('post')
export class PostController {

    constructor(private userService:UserService , private postService: PostService , private commentService: CommentService){}

    @Delete('/:id/delete')
    async deletePost( @Req() req , @Param('id') id  ) {
        return await this.postService.delete(id,req.user)
    }

    @Post('/:id/comment')
    async commentOnPost( @Req() req , @Param('id') id , @Body('text') text ) {
        const user = this.userService.getUser(req.user.id)
        console.log(text);
        return await this.postService.comment(id , await this.commentService.create( user , text )) 
    }

    @Post('/:id/upvote')
    async upvotePost( @Req() req , @Param('id') id , @Body('text') text ) {
        const user = this.userService.getUser(req.user.id)
        return await this.postService.upvote(id,req.user.id)
    }

    @Post('/:id/downvote')
    async downvotePost( @Req() req , @Param('id') id) {
        const user = this.userService.getUser(req.user.id)
        return await this.postService.downvote(id,req.user.id)
    }

}
