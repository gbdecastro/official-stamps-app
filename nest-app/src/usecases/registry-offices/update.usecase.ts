import { LoggerService } from '@domain/logger/logger.interface';
import { RegistryOfficesModel } from '@domain/registry-offices/registry-offices.model';
import { RegistryOfficesRequest } from '@infra/controllers/registry-offices/registry-offices.request';
import { RegistryOfficeService } from '@infra/services/registry-office/registry-office.interface';

export class UpdateRegistryOfficeUseCase {
    constructor(private readonly logger: LoggerService, private readonly service: RegistryOfficeService) {}

    async execute(id: number, request: RegistryOfficesRequest): Promise<RegistryOfficesModel> {
        let entity = new RegistryOfficesModel();
        entity.name = request.name;
        entity.county = request.county;
        entity.region = request.region;
        entity.city = request.city;

        const result = await this.service.update(id, entity);
        this.logger.log('UpdateRegistryOfficeUseCase execute', 'Registry offices have been updated');
        return result;
    }
}
