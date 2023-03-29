import { LoggerService } from '@domain/logger/logger.interface';
import { ContractService } from '@infra/services/contract/contract.service.interface';
import { RegistryOfficeService } from '@infra/services/registry-office/registry-office.interface';

export class GetOfficialStampsBoughtUseCase {
    constructor(private readonly logger: LoggerService, private readonly service: ContractService, private readonly ROService: RegistryOfficeService) {}

    async execute(id: number): Promise<any> {
        this.logger.log('GetOfficialStampsBoughtUseCase', 'Finding Registry Office');
        const registryOffice = await this.ROService.getOne(id);

        this.logger.log('GetOfficialStampsBoughtUseCase', 'Getting the Official Stamp bought');
        return await this.service.getOfficialStampsBought(registryOffice.wallet.address);
    }
}
