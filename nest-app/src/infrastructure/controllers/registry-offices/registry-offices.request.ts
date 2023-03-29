import { ApiProperty } from '@nestjs/swagger';

export class RegistryOfficesRequest {
    @ApiProperty({ required: true })
    readonly name: string;

    @ApiProperty({ required: true })
    readonly county: string;

    @ApiProperty({ required: true })
    readonly region: string;

    @ApiProperty({ required: true })
    readonly city: string;
}
