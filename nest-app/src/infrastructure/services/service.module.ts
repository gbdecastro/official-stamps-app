import { ExceptionsModule } from '@infra/exceptions/exceptions.module';
import { LoggerModule } from '@infra/logger/logger.module';
import { RepositoriesModule } from '@infra/repositories/repositories.module';
import { Module } from '@nestjs/common';
import { ContractServiceImpl } from './contract/contract.service';
import { OfficialStampServiceImpl } from './official-stamps/official-stamp.service';
import { RegistryOfficeServiceImpl } from './registry-office/registry-office.service';
import { WalletServiceImpl } from './wallet/wallet.service';

@Module({
    imports: [RepositoriesModule, ExceptionsModule, LoggerModule],
    providers: [WalletServiceImpl, ContractServiceImpl, RegistryOfficeServiceImpl, OfficialStampServiceImpl],
    exports: [WalletServiceImpl, ContractServiceImpl, RegistryOfficeServiceImpl, OfficialStampServiceImpl]
})
export class ServicesModule {}
