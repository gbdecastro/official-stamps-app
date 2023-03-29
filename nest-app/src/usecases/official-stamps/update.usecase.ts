import { LoggerService } from '@domain/logger/logger.interface';
import { OfficialStampsModel } from '@domain/official-stamps/official-stamps.model';
import { OfficialStampsRequest } from '@infra/controllers/official-stamps/official-stamps.request';
import { OfficialStampServiceImpl } from '@infra/services/official-stamps/official-stamp.service';

export class UpdateOfficialStampUseCase {
    constructor(private readonly logger: LoggerService, private readonly service: OfficialStampServiceImpl) {}

    async execute(id: number, request: OfficialStampsRequest): Promise<OfficialStampsModel> {
        let officialStamp = new OfficialStampsModel();
        officialStamp.name = request.name;
        officialStamp.value = request.value;

        const result = await this.service.update(id, officialStamp);
        this.logger.log('UpdateOfficialStampUseCase execute', 'Official stamps have been updated');
        return result;
    }
}
