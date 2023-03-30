import { APP_INITIALIZER, NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { keycloakInitializer } from './keycloak-initializer';

@NgModule({
    imports: [KeycloakAngularModule],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: keycloakInitializer,
            multi: true,
            deps: [KeycloakService],
        },
        AuthService,
        AuthGuard,
    ],
})
export class AuthModule {}
