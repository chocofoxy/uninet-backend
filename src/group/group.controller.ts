import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthGuard } from '@nestjs/passport';
import { PostService } from 'src/post/post.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import storage from 'src/storageOptions';
import { UploadedFiles } from '@nestjs/common';
import { Role } from 'src/roles/role.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Role('Teacher')
  @Post()
  create(@Body() createGroupDto: CreateGroupDto, @Req() req ) {
    return this.groupService.create(req.user.userId , createGroupDto);
  }

  @Get()
  async findAll(@Req() req) {
    return { populated: await this.groupService.findAll(req.user.userId) , raw: await this.groupService.findAllRaw(req.user.userId) };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @Role('Teacher')
  @Delete(':id')
  remove(@Param('id') id: string , @Req() req ) {
    return this.groupService.remove(req.user.id , id);
  }

  @Post("/:id/post")
  @UseInterceptors(FilesInterceptor('media', 3 , { storage: storage }))
  async postToGroup(@Param('id') id: string , @Req() req , @Body('content') content , @UploadedFiles() files) {
    return this.groupService.postGroup(req.user.userId,id,content,files)
  }

}
