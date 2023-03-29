import { LoggerService } from '@domain/logger/logger.interface';
import { RegistryOfficesModel } from '@domain/registry-offices/registry-offices.model';
import { RegistryOfficeService } from '@infra/services/registry-office/registry-office.interface';

export class GetAllRegistryOfficesUseCase {
    constructor(private readonly logger: LoggerService, private readonly service: RegistryOfficeService) {}

    async execute(): Promise<RegistryOfficesModel[]> {
        this.logger.log('GetAllRegistryOfficesUseCase is executing', 'Many Registry Offices will be returned');
        return await this.service.getAll();
    }
}
