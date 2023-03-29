import { Audit } from '@infra/entities/shared/audit.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WalletEntity } from './wallet.entity';

@Entity({ name: 'registry_offices' })
export class RegistryOfficeEntity extends Audit {
    @PrimaryGeneratedColumn({ type: 'integer' })
    id: number;

    @Column('varchar', { length: 255, nullable: false })
    name: string;

    @Column('varchar', { length: 255, nullable: false })
    county: string;

    @Column('varchar', { length: 255, nullable: false })
    city: string;

    @Column('varchar', { length: 255, nullable: false })
    region: string;

    @OneToOne(() => WalletEntity)
    @JoinColumn({ name: 'wallet_id' })
    wallet: WalletEntity;
}
