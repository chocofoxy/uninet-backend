import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostService } from 'src/post/post.service';
import { HomeService } from './home.service';

@Controller('home')
export class HomeController {

    constructor(private homeService: HomeService,private postService: PostService){}

    @Get('/:id')
    async index(@Param("id") id ) {
        return await this.homeService.geTimeline(id)
    }

    //Admin Guard
    @Post('/admin/post')
    async adminPost(@Param("id") id , @Body('content') content ) {
        return await this.homeService.PostToTimeline(1 , await this.postService.create(null,content))
    }

    @Post('/general/post')
    async GenralPost(@Param("id") id , @Body('content') content ) {
        return await this.homeService.PostToTimeline(2 , await this.postService.create(null,content))
    }

}
