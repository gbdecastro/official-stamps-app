import { Test, TestingModule } from '@nestjs/testing';
import { RegistryOfficeServiceImpl } from './registry-office.service';

describe('RegistryOfficesService', () => {
    let service: RegistryOfficeServiceImpl;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RegistryOfficeServiceImpl]
        }).compile();

        service = module.get<RegistryOfficeServiceImpl>(RegistryOfficeServiceImpl);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
