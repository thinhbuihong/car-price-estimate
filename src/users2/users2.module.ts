import { Module } from '@nestjs/common';
import { Users2Service } from './users2.service';

@Module({
  providers: [Users2Service],
  exports: [Users2Service],
})
export class Users2Module {}
