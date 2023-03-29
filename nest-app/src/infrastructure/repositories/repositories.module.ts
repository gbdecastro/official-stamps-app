import { OfficialStampEntity } from '@infra/entities/official-stamp.entity';
import { RegistryOfficeEntity } from '@infra/entities/registry-offices.entity';
import { WalletEntity } from '@infra/entities/wallet.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from './../config/typeorm/typeorm.module';
import { OfficialStampRepositoryImpl } from './official-stamps.repository';
import { RegistryOfficesRepositoryImpl } from './registry-offices.repository';
import { WalletRepositoryImpl } from './wallet.repository';

@Module({
    imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([OfficialStampEntity, RegistryOfficeEntity, WalletEntity])],
    providers: [OfficialStampRepositoryImpl, RegistryOfficesRepositoryImpl, WalletRepositoryImpl],
    exports: [
        OfficialStampRepositoryImpl,
        RegistryOfficesRepositoryImpl,
        WalletRepositoryImpl,
        TypeOrmConfigModule,
        TypeOrmModule.forFeature([OfficialStampEntity, RegistryOfficeEntity, WalletEntity])
    ]
})
export class RepositoriesModule {}
