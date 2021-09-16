import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['asd'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      //drop additional properties not in DTO
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
