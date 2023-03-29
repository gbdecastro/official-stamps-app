import { environment } from '@environment';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakOptions } from 'keycloak-angular/public_api';

export function keycloakInitializer(
    keycloak: KeycloakService
): () => Promise<boolean> {
    const options: KeycloakOptions = environment.keycloak as KeycloakOptions;

    return () => keycloak.init(options);
}
