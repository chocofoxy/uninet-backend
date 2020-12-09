import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(email);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.email,
      id: user.id,
      admin: user.admin,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(token: string, isWs: boolean = false): Promise<User | null> {
    const payload = this.jwtService.verify(token);
    return await this.userService.findOne(payload.id);
  }
}
