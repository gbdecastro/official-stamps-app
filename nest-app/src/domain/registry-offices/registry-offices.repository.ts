import { RegistryOfficeEntity } from '@infra/entities/registry-offices.entity';

export interface RegistryOfficesRepository {
    findAll(): Promise<RegistryOfficeEntity[]>;
    findById(id: number): Promise<RegistryOfficeEntity>;
}
