import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    let user = await this.userService.findOne(req.user.id);
    if (user)
    return this.authService.login(req.user);
  }

  @Post('/new')
  signin(
    @Body('username') username: string,
    @Body('password') password: string,
  ): void {
    let user = new User(username, password);
    this.userService.save(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  async logout(@Request() req) {
    /*let user = await this.userService.findOne(req.user.id);
    user.active = false;
    await this.userService.save(user);*/
  }
}
