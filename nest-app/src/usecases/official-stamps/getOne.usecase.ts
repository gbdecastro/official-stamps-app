import { LoggerService } from '@domain/logger/logger.interface';
import { OfficialStampsModel } from '@domain/official-stamps/official-stamps.model';
import { OfficialStampServiceImpl } from '@infra/services/official-stamps/official-stamp.service';
OfficialStampServiceImpl;
export class GetOneOfficialStampUseCase {
    constructor(private readonly logger: LoggerService, private readonly service: OfficialStampServiceImpl) {}

    async execute(id: number): Promise<OfficialStampsModel> {
        this.logger.log('GetOneOfficialStampUseCase execute', `The Official Stamps with id ${id} will be returned`);
        return await this.service.getOne(id);
    }
}
