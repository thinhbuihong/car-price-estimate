import { OnQueueActive, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {
  @Process()
  async transcode(job: Job<unknown>) {
    let progress = 0;
    for (let i = 0; i < 10; i++) {
      console.log('process', job.data, progress);
      progress += 10;
      await job.progress(progress);
    }
    return {};
  }

  @Process('transcode')
  async transcodeWithName(job: Job<unknown>) {
    let progress = 0;
    for (let i = 0; i < 10; i++) {
      console.log('process transcode', job.data, progress);
      progress += 10;
      await job.progress(progress);
    }
    return {};
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }
}
