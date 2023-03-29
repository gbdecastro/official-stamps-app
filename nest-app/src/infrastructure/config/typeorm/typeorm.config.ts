import { migrations1679327475086 } from '@database/migrations/1679327475086-migrations';
import { OfficialStampEntity } from '@infra/entities/official-stamp.entity';
import { RegistryOfficeEntity } from '@infra/entities/registry-offices.entity';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { WalletEntity } from './../../entities/wallet.entity';

dotenv.config({ path: `${process.env.NODE_ENV}.env` });

const typeOrmConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [OfficialStampEntity, RegistryOfficeEntity, WalletEntity],
    logging: true,
    synchronize: false,
    migrationsRun: true,
    migrations: [migrations1679327475086]
};

export default new DataSource(typeOrmConfig);
