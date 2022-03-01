import { Test, TestingModule } from '@nestjs/testing';
import { Users2Service } from './users2.service';

describe('Users2Service', () => {
  let service: Users2Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Users2Service],
    }).compile();

    service = module.get<Users2Service>(Users2Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
