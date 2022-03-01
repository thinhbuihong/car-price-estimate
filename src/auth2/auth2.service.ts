import { Injectable } from '@nestjs/common';
import { Users2Service } from '../users2/users2.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class Auth2Service {
  constructor(
    private usersService: Users2Service,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
