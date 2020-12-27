import { Controller, Get, Post, Body, Put, Param, Delete, Req, UseInterceptors, UseGuards, UploadedFiles } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateProfile } from './dto/update-user.dto';
import storage from 'src/storageOptions';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id/informations')
  findOne(@Param('id') id: string) {
    return this.userService.getInformations(id);
  }

  @Get('informations')
  findMe(@Req() req ) {
    return this.userService.getInformations(req.user.userId);
  }

  @Post(':id/activate')
  activate(@Param('id') id: string, @Body("class") classId, @Body("role") role ) {
    return this.userService.validate(id,classId,role)
  }

  @Put()
  @UseInterceptors(FilesInterceptor('photo', 1 , { storage: storage }))
  update(@Req() req, @Body() updateUserDto: UpdateProfile, @UploadedFiles() files) {
    console.log(files)
    return this.userService.update(req.user.userId, updateUserDto, files );

  }

  @Get('pending')
  pending() {
    return this.userService.pending();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
