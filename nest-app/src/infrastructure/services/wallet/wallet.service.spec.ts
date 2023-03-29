import { Test, TestingModule } from '@nestjs/testing';
import { WalletServiceImpl } from './wallet.service';

describe('WalletService', () => {
    let service: WalletServiceImpl;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [WalletServiceImpl]
        }).compile();

        service = module.get<WalletServiceImpl>(WalletServiceImpl);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
