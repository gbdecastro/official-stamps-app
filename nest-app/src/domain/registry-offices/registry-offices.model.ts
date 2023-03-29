import { WalletModel } from '@domain/wallet/wallet.model';

export class RegistryOfficesModel {
    id: number;
    name: string;
    county: string;
    city: string;
    region: string;
    wallet: WalletModel;
    createdAt: Date;
    updatedAt: Date;
}
