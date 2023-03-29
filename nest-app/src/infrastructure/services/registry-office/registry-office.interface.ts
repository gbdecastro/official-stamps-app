import { RegistryOfficesModel } from '@domain/registry-offices/registry-offices.model';

export interface RegistryOfficeService {
    getAll(): Promise<RegistryOfficesModel[]>;
    getOne(id: number): Promise<RegistryOfficesModel>;
    save(model: RegistryOfficesModel): Promise<RegistryOfficesModel>;
    update(id: number, model: RegistryOfficesModel): Promise<RegistryOfficesModel>;
    delete(id: number): Promise<void>;
    buyOfficialStamp(id: number, officialStampId: number, quantity: number): Promise<void>;
}
