import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'portal';

    constructor(private readonly keycloak: KeycloakService) {
        this.keycloak.keycloakEvents$.subscribe((e) => {
            console.log(e);
        });
    }
}
