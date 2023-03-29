import { OfficialStampEntity } from '@infra/entities/official-stamp.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';
import { RegistryOfficeEntity } from './../../entities/registry-offices.entity';
import { WalletEntity } from './../../entities/wallet.entity';

export const getTypeOrmModuleOptions = (config: EnvironmentConfigService): TypeOrmModuleOptions =>
    ({
        type: 'postgres',
        host: config.getDatabaseHost(),
        port: config.getDatabasePort(),
        username: config.getDatabaseUser(),
        password: config.getDatabasePassword(),
        database: config.getDatabaseName(),
        entities: [OfficialStampEntity, RegistryOfficeEntity, WalletEntity],
        synchronize: true,
        migrationsRun: true,
        migrationsTableName: 'migrations',
        migrations: [__dirname + '../../../../database/migrations/*.{ts,js}'],
        cli: {
            migrationsDir: 'database/migrations'
        }
        // ssl: {
        //   rejectUnauthorized: false,
        // },
    } as TypeOrmModuleOptions);

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [EnvironmentConfigModule],
            inject: [EnvironmentConfigService],
            useFactory: getTypeOrmModuleOptions
        })
    ]
})
export class TypeOrmConfigModule {}
