import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
      return { userId: user._id , email : user.email , role : user.role } ;}
      return null;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      userId: user.userId,
      role : user.role
    };
    const userobj = await this.userService.findByEmail(user.email);
    return {
      access_token: this.jwtService.sign(payload) , user: userobj
    };
  }

  async verify(token: string, isWs: boolean = false): Promise<any> {
    const payload = this.jwtService.verify(token);
    return await this.userService.findByEmail(payload.email)
  }
}
