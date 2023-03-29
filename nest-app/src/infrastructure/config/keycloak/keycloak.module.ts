import { Module } from '@nestjs/common';
import { KeycloakConnectModule } from 'nest-keycloak-connect/keycloak-connect.module';
import { EnvironmentConfigModule } from '../environment-config/environment-config.module';
import { EnvironmentConfigService } from '../environment-config/environment-config.service';

@Module({
    imports: [
        KeycloakConnectModule.registerAsync({
            imports: [EnvironmentConfigModule],
            inject: [EnvironmentConfigService],
            useFactory: (config: EnvironmentConfigService) => config.getKeycloakConnection()
        })
    ],
    exports: [
        KeycloakConnectModule.registerAsync({
            imports: [EnvironmentConfigModule],
            inject: [EnvironmentConfigService],
            useFactory: (config: EnvironmentConfigService) => config.getKeycloakConnection()
        })
    ]
})
export class KeycloakModule {}
