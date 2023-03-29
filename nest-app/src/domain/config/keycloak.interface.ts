import { KeycloakConnectOptions } from 'nest-keycloak-connect';

export interface IKeycloakConfig {
    getKeycloakConnection(): KeycloakConnectOptions;
    getKeycloakUrl(): string;
    getKeycloakRealm(): string;
    getKeycloakClientId(): string;
    getKeycloakSecretId(): string;
}
