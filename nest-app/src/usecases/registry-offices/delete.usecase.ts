import { LoggerService } from '@domain/logger/logger.interface';
import { RegistryOfficeService } from '@infra/services/registry-office/registry-office.interface';

export class DeleteRegistryOfficeUseCase {
    constructor(private readonly logger: LoggerService, private readonly service: RegistryOfficeService) {}

    async execute(id: number): Promise<void> {
        await this.service.delete(id);
        this.logger.log('DeleteRegistryOfficeUseCase execute', 'Registry Office have been deleted');
    }
}
