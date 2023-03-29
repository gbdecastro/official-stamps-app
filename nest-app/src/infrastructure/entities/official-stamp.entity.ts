import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Audit } from './shared/audit.entity';

@Entity({ name: 'official_stamps' })
export class OfficialStampEntity extends Audit {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column('varchar', { length: 255, nullable: false })
    name: string;

    @Column('double precision', { nullable: false, name: 'official_stamp_value' })
    value: number;
}
