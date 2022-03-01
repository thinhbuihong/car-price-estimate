import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Users2Module } from '../users2/users2.module';
import { Auth2Controller } from './auth2.controller';
import { Auth2Service } from './auth2.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    Users2Module,
  ],
  providers: [Auth2Service, LocalStrategy, JwtStrategy],
  controllers: [Auth2Controller],
  exports: [Auth2Service],
})
export class Auth2Module {}
