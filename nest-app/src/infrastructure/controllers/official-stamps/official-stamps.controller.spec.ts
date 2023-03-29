import { Test, TestingModule } from '@nestjs/testing';
import { OfficialStampsController } from './official-stamps.controller';

describe('OfficialStampsController', () => {
  let controller: OfficialStampsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OfficialStampsController],
    }).compile();

    controller = module.get<OfficialStampsController>(OfficialStampsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
