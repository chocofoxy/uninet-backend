import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {

    constructor(private userService: UserService){}

    @Get('/')
    async index() {
        return await this.userService.findAll() ;
    }

    @Put('/update')
    async update( @Body('password') password , @Req() req ) {
        let user = await this.userService.findOne(req.user.id);
        user.password = password ;
        await this.userService.save(user) ;
    }

    @Delete('/:id/delete')
    async delete( @Param('id') id ) {
        let user = await this.userService.findOne(id);
        if (user)
        await this.userService.delete(user.id) ;
    }

    @Post('/:id/activate')
    async activate( @Param('id') id , @Body('role') role , @Body('department') department ) {
        await this.userService.activate(id,role,department) ;
    }

    @Get('/pending')
    async pending() {
        return await this.userService.getPending();  
    }
}
