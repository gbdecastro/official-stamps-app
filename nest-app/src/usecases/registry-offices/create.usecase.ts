import { LoggerService } from '@domain/logger/logger.interface';
import { RegistryOfficesModel } from '@domain/registry-offices/registry-offices.model';
import { RegistryOfficesRequest } from '@infra/controllers/registry-offices/registry-offices.request';
import { RegistryOfficeService } from '@infra/services/registry-office/registry-office.interface';

export class CreateRegistryOfficeUseCase {
    constructor(private readonly logger: LoggerService, private readonly service: RegistryOfficeService) {}

    async execute(request: RegistryOfficesRequest): Promise<RegistryOfficesModel> {
        let model = new RegistryOfficesModel();
        model.name = request.name;
        model.county = request.county;
        model.region = request.region;
        model.city = request.city;

        const result = await this.service.save(model);
        this.logger.log('CreateRegistryOfficeUseCase execute', 'New registry office have been inserted');
        return result;
    }
}
