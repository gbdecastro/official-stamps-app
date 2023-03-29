import { ApiProperty } from '@nestjs/swagger';
import { OfficialStampsModel } from './../../../domain/official-stamps/official-stamps.model';

export class OfficialStampsResponse {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    value: number;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    updatedAt: Date;

    constructor(os: OfficialStampsModel) {
        this.id = os.id;
        this.name = os.name;
        this.value = os.value;
        this.createdAt = os.createdAt;
        this.updatedAt = os.updatedAt;
    }
}
