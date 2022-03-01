import {
  Controller,
  Get,
  Post,
  Res,
  Sse,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { interval, map } from 'rxjs';
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

  @Get('file')
  getFile(@Res({ passthrough: true }) res: Response) {
    const file = createReadStream(join(process.cwd(), 'package.json'));

    res.header('Content-Disposition', 'attachment; filename="newfile.pdf"');

    // file.pipe(res);
    //But in doing so you end up losing access to your post-controller interceptor logic.

    return new StreamableFile(file);
  }

  @Sse('sse')
  sse() {
    return interval(1000).pipe(
      map((_) => ({
        data: {
          hello: 'world',
        },
      })),
    );
  }
}
