import { LoggerService } from '@domain/logger/logger.interface';
import { OfficialStampServiceImpl } from '@infra/services/official-stamps/official-stamp.service';

export class DeleteOfficialStampUseCase {
    constructor(private readonly logger: LoggerService, private readonly service: OfficialStampServiceImpl) {}

    async execute(id: number): Promise<void> {
        await this.service.delete(id);
        this.logger.log('DeleteOfficialStampUseCase execute', 'Official stamps have been deleted');
    }
}
