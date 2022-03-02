import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolelsGuard } from '../guards/roles.guard';
import { Auth2Service } from './auth2.service';
import { Role } from './constants';
import { Roles } from './decorators/roles.decorator';

@Controller({
  path: 'auth',
  version: '2',
})
export class Auth2Controller {
  constructor(private authService: Auth2Service) {}

  @UseGuards(AuthGuard('local')) //name strategy
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
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

  // @UseGuards(RolelsGuard)
  @UseGuards(AuthGuard('jwt'), RolelsGuard)
  @Roles(Role.Admin)
  @Get()
  create() {
    return 'admin route';
  }
}
