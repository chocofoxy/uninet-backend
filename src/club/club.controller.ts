import { Body, Controller, Delete, Get, Param, Post, Req } from '@nestjs/common';
import { Club } from './club.entity';
import { ClubService } from './club.service';

@Controller('club')
export class ClubController {

    constructor(private clubService: ClubService){}

    @Get('/')
    async index() {
        return await this.clubService.findAll() ;
    }

    @Post('/create')
    async update( @Body('nom') nom , @Req() req ) {
        let club = new Club()
        club.name = name ;
        await this.clubService.save(club) ;
    }

    @Delete('/:id/delete')
    async delete( @Param('id') id ) {
        let club = await this.clubService.findOne(id);
        if (club)
        await this.clubService.delete(club.id) ;
    }

}
