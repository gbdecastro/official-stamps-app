import { RegistryOfficesModel } from '@domain/registry-offices/registry-offices.model';
import { ApiProperty } from '@nestjs/swagger';
import { WalletResponse } from './wallet.response';

export class RegistryOfficesResponse {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    county: string;
    @ApiProperty()
    region: string;
    @ApiProperty()
    wallet: WalletResponse;
    @ApiProperty()
    city: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;

    constructor(model: RegistryOfficesModel) {
        this.id = model.id;
        this.name = model.name;
        this.county = model.county;
        this.region = model.region;
        this.city = model.city;
        this.wallet = model.wallet;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }
}
