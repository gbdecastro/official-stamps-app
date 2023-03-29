import { Test, TestingModule } from '@nestjs/testing';
import { OfficialStampServiceImpl } from './official-stamp.service';

describe('RegistryOfficesService', () => {
    let service: OfficialStampServiceImpl;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OfficialStampServiceImpl]
        }).compile();

        service = module.get<OfficialStampServiceImpl>(OfficialStampServiceImpl);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
