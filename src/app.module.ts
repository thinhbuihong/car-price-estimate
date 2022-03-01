import { BullModule } from '@nestjs/bull';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import session from 'express-session';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AudioModule } from './audio/audio.module';
import { Auth2Module } from './auth2/auth2.module';
import { LocalStrategy } from './auth2/local.strategy';
import { LogModule } from './logger/logger.module';
import { OrderModule } from './order/order.module';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
// const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    EventEmitterModule.forRoot(),
    PassportModule,
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: './files',
    //     filename: editFileName,
    //   }),
    //   // fileFilter
    // }),
    //su dung env variable trong configmodule
    //typeorm cli need these options too
    //===============================
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //     return {
    //       type: 'sqlite',
    //       database: config.get<string>('DB_NAME'),
    //       synchronize: true,
    //       entities: [User, Report],
    //     };
    //   },
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true,
    // }),
    UsersModule,
    ReportsModule,
    AudioModule,
    LogModule,
    OrderModule,
    Auth2Module,
    // Users2Module,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        // cookieSession({
        //   keys: [this.configService.get('COOKIE_KEY')],
        // }),
        session({
          secret:
            this.configService.get('COOKIE_KEY') || process.env.COOKIE_KEY,
          resave: false,
          saveUninitialized: false,
          cookie: {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,
            // domain:'front end url '
          },
        }),
      )
      .forRoutes('*');
  }
}
