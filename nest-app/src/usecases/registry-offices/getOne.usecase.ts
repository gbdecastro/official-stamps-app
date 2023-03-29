import { LoggerService } from '@domain/logger/logger.interface';
import { RegistryOfficesModel } from '@domain/registry-offices/registry-offices.model';
import { RegistryOfficeService } from '../../infrastructure/services/registry-office/registry-office.interface';

export class GetOneRegistryOfficeUseCase {
    constructor(private readonly logger: LoggerService, private readonly service: RegistryOfficeService) {}

    async execute(id: number): Promise<RegistryOfficesModel> {
        this.logger.log('GetOneRegistryOfficeUseCase execute', `The Registry Office with id ${id} will be returned`);
        return await this.service.getOne(id);
    }
}
