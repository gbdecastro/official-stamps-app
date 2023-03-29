import { KeycloakModule } from '@infra/config/keycloak/keycloak.module';
import { OfficialStampsUsecasesProxyModule } from '@infra/usecases-proxy/official-stamps/official-stamps-usecases-proxy.module';
import { RegistryOfficeUsecasesProxyModule } from '@infra/usecases-proxy/registry-offices/registry-offices-usecases-proxy.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard, RoleGuard } from 'nest-keycloak-connect';
import { OfficialStampsController } from './official-stamps/official-stamps.controller';
import { RegistryOfficesController } from './registry-offices/registry-offices.controller';

@Module({
    imports: [OfficialStampsUsecasesProxyModule.register(), RegistryOfficeUsecasesProxyModule.register(), KeycloakModule],
    controllers: [OfficialStampsController, RegistryOfficesController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard
        }
    ]
})
export class ControllersModule {}
