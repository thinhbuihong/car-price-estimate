import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    // CurrentUserInterceptor,
    {
      useClass: CurrentUserInterceptor,
      provide: APP_INTERCEPTOR,
    },
  ],
})
export class UsersModule {}
