import { Test, TestingModule } from '@nestjs/testing';
import { RegistryOfficesController } from './registry-offices.controller';

describe('RegistryOfficesController', () => {
  let controller: RegistryOfficesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistryOfficesController],
    }).compile();

    controller = module.get<RegistryOfficesController>(RegistryOfficesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
