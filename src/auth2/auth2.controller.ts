import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Auth2Service } from './auth2.service';

@Controller({
  path: 'auth',
  version: '2',
})
export class Auth2Controller {
  constructor(private authService: Auth2Service) {}

  @UseGuards(AuthGuard('local')) //name strategy
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('local'))
  @Get('user')
  user() {
    return 'ok';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
