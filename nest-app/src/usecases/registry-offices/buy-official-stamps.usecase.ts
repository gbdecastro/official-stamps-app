import { LoggerService } from '@domain/logger/logger.interface';
import { RegistryOfficeService } from '@infra/services/registry-office/registry-office.interface';

export class BuyOfficialStampsUseCase {
    constructor(private readonly logger: LoggerService, private readonly registryOffice: RegistryOfficeService) {}

    async execute(request: { id: number; officialStampId: number }, quantity: number): Promise<any> {
        this.logger.log('BuyOfficialStampsUseCase', '');
        return this.registryOffice.buyOfficialStamp(request.id, request.officialStampId, quantity);
    }
}
