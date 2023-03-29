import { ApiProperty } from '@nestjs/swagger';

export class OfficialStampsRequest {
    @ApiProperty({ required: true })
    readonly name: string;
    @ApiProperty({ required: true })
    readonly value: number;
}
