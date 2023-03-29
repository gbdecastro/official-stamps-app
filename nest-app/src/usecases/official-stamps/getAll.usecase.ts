import { LoggerService } from '@domain/logger/logger.interface';
import { OfficialStampsModel } from '@domain/official-stamps/official-stamps.model';
import { OfficialStampServiceImpl } from '@infra/services/official-stamps/official-stamp.service';

export class GetAllOfficialStampUseCase {
    constructor(private readonly logger: LoggerService, private readonly service: OfficialStampServiceImpl) {}

    async execute(): Promise<OfficialStampsModel[]> {
        this.logger.log('GetAllOfficialStampUseCase is executing', 'Many Official Stamps will be returned');
        return await this.service.getAll();
    }
}
