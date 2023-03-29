import { OfficialStampsModel } from '@domain/official-stamps/official-stamps.model';

export interface ContractService {
    buyOfficialStamp(toAccount: string, officialStamp: OfficialStampsModel, quantity: number): Promise<any>;
    getOfficialStampsBought(toAccount: string): Promise<any>;
}
