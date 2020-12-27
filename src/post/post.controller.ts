import { Controller, Get, Post, Body, Put, Param, Delete, Req, UseGuards, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import storage from 'src/storageOptions';
import { Role } from 'src/roles/role.decorator';


@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('general')
  @UseInterceptors(FilesInterceptor('media', 3 , { storage: storage }))
  async postToGeneral(@Body('content') content , @Req() req ,  @UploadedFiles() files ) {
    await this.postService.postGeneral(req.user.userId ,content,files);
  }

  @Role('Admin')
  @Post("admin")
  @UseInterceptors(FilesInterceptor('media', 3 , { storage: storage }))
  async postToAdmin(@Body('content') content  , @Req() req  ,  @UploadedFiles() files ) {
    await this.postService.postAdmin(req.user.userId ,content,files);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string ) {
    return this.postService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string , @Req() req ) {
    return this.postService.remove(req.user.userId ,id);
  }

  @Post(':id/upvote')
  async upvote(@Param('id') id: string , @Req() req ) {
    return await this.postService.upvote(req.user.userId,id)
  }

  @Post(':id/downvote')
  async downvote(@Param('id') id: string , @Req() req ) {
    return await this.postService.downvote(req.user.userId,id)
  }

  @Post(':id/comment')
  async comment(@Param('id') id: string , @Body('comment') comment , @Req() req ) {    
    return await this.postService.comment(req.user.userId, comment, id)
  }

  @Delete('comment/:id')
  async deleteComment(@Param('id') id: string , @Req() req ) {
    return await this.postService.deleteComment(req.user.userId, id)
  }

  @Post('/:id/report')
  report( @Param('id') id: string ) {
    return this.postService.report(id)
  }


}
