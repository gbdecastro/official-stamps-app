import { LoggerService } from '@domain/logger/logger.interface';
import { OfficialStampsModel } from '@domain/official-stamps/official-stamps.model';
import { OfficialStampsRequest } from '@infra/controllers/official-stamps/official-stamps.request';
import { OfficialStampServiceImpl } from '@infra/services/official-stamps/official-stamp.service';

export class CreateOfficialStampUseCase {
    constructor(private readonly logger: LoggerService, private readonly service: OfficialStampServiceImpl) {}

    async execute(request: OfficialStampsRequest): Promise<OfficialStampsModel> {
        let officialStamp = new OfficialStampsModel();
        officialStamp.name = request.name;
        officialStamp.value = request.value;

        const result = await this.service.save(officialStamp);
        this.logger.log('CreateOfficialStampUseCase execute', 'New official stamps have been inserted');
        return result;
    }
}
