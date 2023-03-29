import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Audit } from './shared/audit.entity';

@Entity({ name: 'wallet' })
export class WalletEntity extends Audit {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column('varchar', { length: 255, nullable: false })
    address: string;

    @Column('double precision', { nullable: false })
    balance: number;
}
