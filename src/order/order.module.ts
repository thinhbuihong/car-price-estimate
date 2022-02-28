import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { OrderCreatedListener } from './listeners/orderCreated.listener';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { diskStorage } from 'multer';
import { editFileName } from '../utils/editFilename.util';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      // fileFilter
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderCreatedListener],
})
export class OrderModule {}
