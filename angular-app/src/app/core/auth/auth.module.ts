import { APP_INITIALIZER, NgModule } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { InterceptorModule } from '../interceptor/interceptor.module';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { keycloakInitializer } from './keycloak-initializer';

@NgModule({
    imports: [KeycloakAngularModule, InterceptorModule],
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
