import { IDatabaseConfig } from '@domain/config/database.interface';
import { IKeycloakConfig } from '@domain/config/keycloak.interface';
import { IWeb3Config } from '@domain/config/web3.interface';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KeycloakConnectOptions, PolicyEnforcementMode, TokenValidation } from 'nest-keycloak-connect';
import { Web3ModuleOptions } from 'nest-web3';

@Injectable()
export class EnvironmentConfigService implements IDatabaseConfig, IWeb3Config, IKeycloakConfig {
    constructor(private configService: ConfigService) {}

    getDatabaseHost(): string {
        return this.configService.get<string>('DATABASE_HOST');
    }

    getDatabasePort(): number {
        return this.configService.get<number>('DATABASE_PORT');
    }

    getDatabaseUser(): string {
        return this.configService.get<string>('DATABASE_USER');
    }

    getDatabasePassword(): string {
        return this.configService.get<string>('DATABASE_PASSWORD');
    }

    getDatabaseName(): string {
        return this.configService.get<string>('DATABASE_NAME');
    }

    getWeb3(): Web3ModuleOptions {
        return {
            url: this.configService.get<string>('WEB3_URL'),
            name: this.configService.get<string>('WEB3_NAME')
        };
    }

    getKeycloakConnection(): KeycloakConnectOptions {
        return {
            authServerUrl: this.getKeycloakUrl(),
            realm: this.getKeycloakRealm(),
            clientId: this.getKeycloakClientId(),
            secret: this.getKeycloakSecretId(),
            tokenValidation: TokenValidation.ONLINE,
            policyEnforcement: PolicyEnforcementMode.PERMISSIVE
        };
    }

    getKeycloakUrl(): string {
        return this.configService.get<string>('KEYCLOAK_URL');
    }

    getKeycloakRealm(): string {
        return this.configService.get<string>('KEYCLOAK_REALM');
    }
    getKeycloakClientId(): string {
        return this.configService.get<string>('KEYCLOAK_CLIENT_ID');
    }

    getKeycloakSecretId(): string {
        return this.configService.get<string>('KEYCLOAK_CLIENT_SECRET');
    }
}
