import { Body, Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express/multer/interceptors';
import { ProfileService } from './profile.service';
import storage from 'src/storageOptions';

@Controller('profile')
export class ProfileController {

    constructor(private profileService: ProfileService){}


    @Post('/update')
    @UseInterceptors(FilesInterceptor('photo', 1 , { storage: storage }))
    async update( @Body('dn') dn , @UploadedFiles() photo ) {
        //await this.profileService.update()
    }





}
