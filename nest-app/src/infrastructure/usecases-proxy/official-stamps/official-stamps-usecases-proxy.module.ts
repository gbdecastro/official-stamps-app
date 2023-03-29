import { EnvironmentConfigModule } from '@infra/config/environment-config/environment-config.module';
import { ExceptionsModule } from '@infra/exceptions/exceptions.module';
import { LoggerModule } from '@infra/logger/logger.module';
import { LoggerServiceImpl } from '@infra/logger/logger.service';
import { RepositoriesModule } from '@infra/repositories/repositories.module';
import { OfficialStampServiceImpl } from '@infra/services/official-stamps/official-stamp.service';
import { ServicesModule } from '@infra/services/service.module';
import { DynamicModule, Module } from '@nestjs/common';
import { CreateOfficialStampUseCase } from '@usecases/official-stamps/create.usecase';
import { DeleteOfficialStampUseCase } from '@usecases/official-stamps/delete.usecase';
import { GetAllOfficialStampUseCase } from '@usecases/official-stamps/getAll.usecase';
import { GetOneOfficialStampUseCase } from '@usecases/official-stamps/getOne.usecase';
import { UpdateOfficialStampUseCase } from '@usecases/official-stamps/update.usecase';
import { UseCaseProxy } from '../usecases-proxy';

@Module({
    imports: [LoggerModule, EnvironmentConfigModule, RepositoriesModule, ServicesModule, ExceptionsModule]
})
export class OfficialStampsUsecasesProxyModule {
    static GET_ALL = 'getAllOfficialStamp_UCProxy';
    static GET_ONE = 'getOneOfficialStamp_UCProxy';
    static CREATE = 'createOfficialStamp_UCProxy';
    static DELETE = 'deleteOfficialStamp_UCProxy';
    static UPDATE = 'updateOfficialStamp_UCProxy';

    static register(): DynamicModule {
        return {
            module: OfficialStampsUsecasesProxyModule,
            providers: [
                {
                    inject: [LoggerServiceImpl, OfficialStampServiceImpl],
                    provide: OfficialStampsUsecasesProxyModule.GET_ALL,
                    useFactory: (logger: LoggerServiceImpl, service: OfficialStampServiceImpl) =>
                        new UseCaseProxy(new GetAllOfficialStampUseCase(logger, service))
                },
                {
                    inject: [LoggerServiceImpl, OfficialStampServiceImpl],
                    provide: OfficialStampsUsecasesProxyModule.GET_ONE,
                    useFactory: (logger: LoggerServiceImpl, service: OfficialStampServiceImpl) =>
                        new UseCaseProxy(new GetOneOfficialStampUseCase(logger, service))
                },
                {
                    inject: [LoggerServiceImpl, OfficialStampServiceImpl],
                    provide: OfficialStampsUsecasesProxyModule.CREATE,
                    useFactory: (logger: LoggerServiceImpl, service: OfficialStampServiceImpl) =>
                        new UseCaseProxy(new CreateOfficialStampUseCase(logger, service))
                },
                {
                    inject: [LoggerServiceImpl, OfficialStampServiceImpl],
                    provide: OfficialStampsUsecasesProxyModule.UPDATE,
                    useFactory: (logger: LoggerServiceImpl, service: OfficialStampServiceImpl) =>
                        new UseCaseProxy(new UpdateOfficialStampUseCase(logger, service))
                },
                {
                    inject: [LoggerServiceImpl, OfficialStampServiceImpl],
                    provide: OfficialStampsUsecasesProxyModule.DELETE,
                    useFactory: (logger: LoggerServiceImpl, service: OfficialStampServiceImpl) =>
                        new UseCaseProxy(new DeleteOfficialStampUseCase(logger, service))
                }
            ],
            exports: [
                OfficialStampsUsecasesProxyModule.GET_ALL,
                OfficialStampsUsecasesProxyModule.GET_ONE,
                OfficialStampsUsecasesProxyModule.CREATE,
                OfficialStampsUsecasesProxyModule.DELETE,
                OfficialStampsUsecasesProxyModule.UPDATE
            ]
        };
    }
}
