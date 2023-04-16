import { Test, TestingModule } from '@nestjs/testing';
import { MiniocloudService } from './miniocloud.service';

describe('MiniocloudService', () => {
  let service: MiniocloudService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MiniocloudService],
    }).compile();

    service = module.get<MiniocloudService>(MiniocloudService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
