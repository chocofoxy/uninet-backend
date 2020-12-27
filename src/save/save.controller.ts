import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { SaveService } from './save.service';
import { CreateSaveDto } from './dto/create-save.dto';
import { UpdateSaveDto } from './dto/update-save.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Controller('save')
export class SaveController {
  constructor(private readonly saveService: SaveService  , private userService: UserService) {}

  @Post(':id')
  async save(@Param('id') id: string , @Req() req) {
    return this.saveService.save( (await this.userService.findOne(req.user.userId)).saves._id ,id);
  }

  @Get()
  async findOne(@Param('id') id: string, @Req() req) {
    return this.saveService.savedPosts((await this.userService.findOne(req.user.userId)).saves._id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    return this.saveService.remove((await this.userService.findOne(req.user.userId)).saves._id, id);
  }
}
