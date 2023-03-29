import { WalletModel } from '@domain/wallet/wallet.model';
import { ApiProperty } from '@nestjs/swagger';

export class WalletResponse {
    @ApiProperty()
    id: number;
    @ApiProperty()
    address: string;
    @ApiProperty()
    balance: number;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;

    constructor(model: WalletModel) {
        this.id = model.id;
        this.address = model.address;
        this.balance = model.balance;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }
}
