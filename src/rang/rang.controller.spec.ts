import { Test, TestingModule } from '@nestjs/testing';
import { RangController } from './rang.controller';

describe('RangController', () => {
  let controller: RangController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RangController],
    }).compile();

    controller = module.get<RangController>(RangController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
