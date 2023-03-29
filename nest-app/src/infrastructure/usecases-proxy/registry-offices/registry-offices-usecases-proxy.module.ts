import { EnvironmentConfigModule } from '@infra/config/environment-config/environment-config.module';
import { Web3AppModule } from '@infra/config/web3/web3.module';
import { ExceptionsModule } from '@infra/exceptions/exceptions.module';
import { LoggerModule } from '@infra/logger/logger.module';
import { LoggerServiceImpl } from '@infra/logger/logger.service';
import { RepositoriesModule } from '@infra/repositories/repositories.module';
import { ContractServiceImpl } from '@infra/services/contract/contract.service';
import { RegistryOfficeServiceImpl } from '@infra/services/registry-office/registry-office.service';
import { ServicesModule } from '@infra/services/service.module';
import { DynamicModule, Module } from '@nestjs/common';
import { BuyOfficialStampsUseCase } from '@usecases/registry-offices/buy-official-stamps.usecase';
import { CreateRegistryOfficeUseCase } from '@usecases/registry-offices/create.usecase';
import { DeleteRegistryOfficeUseCase } from '@usecases/registry-offices/delete.usecase';
import { GetOfficialStampsBoughtUseCase } from '@usecases/registry-offices/get-official-stamp-bought.usecase';
import { GetOneRegistryOfficeUseCase } from '@usecases/registry-offices/getOne.usecase';
import { UpdateRegistryOfficeUseCase } from '@usecases/registry-offices/update.usecase';
import { GetAllRegistryOfficesUseCase } from './../../../usecases/registry-offices/getAll.usecase';
import { UseCaseProxy } from './../usecases-proxy';

@Module({
    imports: [LoggerModule, EnvironmentConfigModule, RepositoriesModule, ServicesModule, ExceptionsModule]
})
export class RegistryOfficeUsecasesProxyModule {
    static GET_ALL = 'getAllRegistryOffice_UCProxy';
    static GET_ONE = 'getOneRegistryOffice_UCProxy';
    static CREATE = 'createRegistryOffice_UCProxy';
    static DELETE = 'deleteRegistryOffice_UCProxy';
    static UPDATE = 'updateRegistryOffice_UCProxy';
    static BUY_OFFICIAL_STAMP = 'buyOfficialStamp_UCProxy';
    static GET_OFFICIAL_STAMPS_BOUGHT = 'getOfficialStampsBought_UCProxy';

    static register(): DynamicModule {
        return {
            module: RegistryOfficeUsecasesProxyModule,
            imports: [Web3AppModule],
            providers: [
                {
                    inject: [LoggerServiceImpl, RegistryOfficeServiceImpl],
                    provide: RegistryOfficeUsecasesProxyModule.GET_ALL,
                    useFactory: (logger: LoggerServiceImpl, service: RegistryOfficeServiceImpl) =>
                        new UseCaseProxy(new GetAllRegistryOfficesUseCase(logger, service))
                },
                {
                    inject: [LoggerServiceImpl, RegistryOfficeServiceImpl],
                    provide: RegistryOfficeUsecasesProxyModule.GET_ONE,
                    useFactory: (logger: LoggerServiceImpl, service: RegistryOfficeServiceImpl) =>
                        new UseCaseProxy(new GetOneRegistryOfficeUseCase(logger, service))
                },
                {
                    inject: [LoggerServiceImpl, RegistryOfficeServiceImpl],
                    provide: RegistryOfficeUsecasesProxyModule.CREATE,
                    useFactory: (logger: LoggerServiceImpl, service: RegistryOfficeServiceImpl) =>
                        new UseCaseProxy(new CreateRegistryOfficeUseCase(logger, service))
                },
                {
                    inject: [LoggerServiceImpl, RegistryOfficeServiceImpl],
                    provide: RegistryOfficeUsecasesProxyModule.UPDATE,
                    useFactory: (logger: LoggerServiceImpl, service: RegistryOfficeServiceImpl) =>
                        new UseCaseProxy(new UpdateRegistryOfficeUseCase(logger, service))
                },
                {
                    inject: [LoggerServiceImpl, RegistryOfficeServiceImpl],
                    provide: RegistryOfficeUsecasesProxyModule.DELETE,
                    useFactory: (logger: LoggerServiceImpl, service: RegistryOfficeServiceImpl) =>
                        new UseCaseProxy(new DeleteRegistryOfficeUseCase(logger, service))
                },
                {
                    inject: [LoggerServiceImpl, RegistryOfficeServiceImpl],
                    provide: RegistryOfficeUsecasesProxyModule.BUY_OFFICIAL_STAMP,
                    useFactory: (logger: LoggerServiceImpl, registryOffice: RegistryOfficeServiceImpl) =>
                        new UseCaseProxy(new BuyOfficialStampsUseCase(logger, registryOffice))
                },
                {
                    inject: [LoggerServiceImpl, ContractServiceImpl, RegistryOfficeServiceImpl],
                    provide: RegistryOfficeUsecasesProxyModule.GET_OFFICIAL_STAMPS_BOUGHT,
                    useFactory: (logger: LoggerServiceImpl, contract: ContractServiceImpl, registryOffice: RegistryOfficeServiceImpl) =>
                        new UseCaseProxy(new GetOfficialStampsBoughtUseCase(logger, contract, registryOffice))
                }
            ],
            exports: [
                RegistryOfficeUsecasesProxyModule.GET_ALL,
                RegistryOfficeUsecasesProxyModule.GET_ONE,
                RegistryOfficeUsecasesProxyModule.CREATE,
                RegistryOfficeUsecasesProxyModule.UPDATE,
                RegistryOfficeUsecasesProxyModule.DELETE,
                RegistryOfficeUsecasesProxyModule.BUY_OFFICIAL_STAMP,
                RegistryOfficeUsecasesProxyModule.GET_OFFICIAL_STAMPS_BOUGHT
            ]
        };
    }
}
