import { Body, Controller, Post, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { ProfileService } from './profile.service';
import storage from 'src/storageOptions';
import { UserService } from 'src/user/user.service';

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService , /*private userService: UserService*/){}


    @Post('/update')
    @UseInterceptors(FilesInterceptor('photo', 1 , { storage: storage }))
    async update( @Body('dn') dn , @UploadedFiles() photo , @Body('lastname') lastname , @Body('firstname') firstname , @Body('bio') bio , @Req() req ) {
        /*let user = await this.userService.findOne(req.user.id)
        await this.profileService.update( user.profile.id ,photo , dn , lastname , firstname , bio )*/
    }





}
