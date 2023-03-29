import { Test, TestingModule } from '@nestjs/testing';
import { LoggerServiceImpl } from './logger.service';

describe('LoggerService', () => {
    let service: LoggerServiceImpl;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LoggerServiceImpl]
        }).compile();

        service = module.get<LoggerServiceImpl>(LoggerServiceImpl);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
