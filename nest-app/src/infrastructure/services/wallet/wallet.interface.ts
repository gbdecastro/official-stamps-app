import { WalletEntity } from '@infra/entities/wallet.entity';

export interface WalletService {
    create(): Promise<WalletEntity>;
    withdraw(id: number, value: number): Promise<WalletEntity>;
    deposit(id: number, value: number): Promise<WalletEntity>;
    validateBalance(wallet: WalletEntity, value: number): void;
}
