import { CacheModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/users.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptors';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { TasksService } from './job/tasks.service';
import { AudioModule } from '../audio/audio.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CacheModule.register(),
    AudioModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    TasksService,
    // CurrentUserInterceptor,
    // {
    //   useClass: CurrentUserInterceptor,
    //   provide: APP_INTERCEPTOR,
    // },
  ],
})
export class UsersModule {
  configure(consumre: MiddlewareConsumer) {
    consumre.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
