import { Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('post')
export class PostController {

    constructor(){}

    @Delete('/:id/delete')
    deletePost( @Req() req ) {

    }

    @Post('/:id/comment')
    commentOnPost( @Req() req ) {
        
    }

}
