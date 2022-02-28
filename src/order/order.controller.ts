import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  createOrder() {
    this.orderService.create();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file1'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log('upload file', file.buffer);
    return 'uploaded file';
  }
}
