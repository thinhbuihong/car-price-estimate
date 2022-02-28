import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class AudioService {
  constructor(@InjectQueue('audio') private audioQueue: Queue) {}

  async addJobWithName(): Promise<string> {
    const job = await this.audioQueue.add('transcode', {
      foo: 'bar',
    });
    return 'foo';
  }

  async addJob(): Promise<void> {
    const job = await this.audioQueue.add({
      foo: 'bar',
    });
  }
}
