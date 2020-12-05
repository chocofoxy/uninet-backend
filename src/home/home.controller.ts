import { Body, Controller, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors/files.interceptor';
import { PostService } from 'src/post/post.service';
import { HomeService } from './home.service';
import storage from 'src/storageOptions';

@Controller('home')
export class HomeController {

    constructor(private homeService: HomeService,private postService: PostService){}

    @Get('/:id')
    async index(@Param("id") id ) {
        return await this.homeService.geTimeline(id)
    }

    //Admin Guard
    @Post('/admin/post')
    @UseInterceptors(FilesInterceptor('media', 1 , { storage: storage }))
    async adminPost(@Param("id") id , @Body('content') content , @UploadedFiles() media ) {
        return await this.homeService.PostToTimeline(1 , await this.postService.create(null,content))
    }

    @Post('/general/post')
    @UseInterceptors(FilesInterceptor('media', 1 , { storage: storage }))
    async GenralPost(@Param("id") id , @Body('content') content , @UploadedFiles() media) {
        return await this.homeService.PostToTimeline(2 , await this.postService.create(null,content))
    }

}
