import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { MyLogger } from './logger/mylogger';
// const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    bufferLogs: true,
  });
  app.use(helmet());
  app.enableCors({
    // origin: 'front end url',
    // credentials:true,
  });
  // app.use(
  //   cookieSession({
  //     keys: ['asd'],
  //   }),
  // );
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     //drop additional properties not in DTO
  //     whitelist: true,
  //   }),
  // );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useLogger(app.get(MyLogger));
  // app.use(compression);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
