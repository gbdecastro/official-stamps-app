import { OfficialStampsModel } from './official-stamps.model';
export interface OfficialStampsRepository {
    insert(officialStamp: OfficialStampsModel): Promise<OfficialStampsModel>;
    findAll(): Promise<OfficialStampsModel[]>;
    findById(id: number): Promise<OfficialStampsModel>;
    update(id: number, officialStamp: OfficialStampsModel): Promise<OfficialStampsModel>;
    deleteById(id: number): Promise<void>;
}
