import { Test, TestingModule } from '@nestjs/testing';
import { ContractServiceImpl } from './contract.service';

describe('ContractService', () => {
    let service: ContractServiceImpl;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ContractServiceImpl]
        }).compile();

        service = module.get<ContractServiceImpl>(ContractServiceImpl);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
