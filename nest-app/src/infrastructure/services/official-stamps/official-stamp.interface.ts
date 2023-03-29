import { OfficialStampsModel } from '@domain/official-stamps/official-stamps.model';

export interface OfficialStampService {
    getAll(): Promise<OfficialStampsModel[]>;
    getOne(id: number): Promise<OfficialStampsModel>;
    save(model: OfficialStampsModel): Promise<OfficialStampsModel>;
    update(id: number, model: OfficialStampsModel): Promise<OfficialStampsModel>;
    delete(id: number): Promise<void>;
}
