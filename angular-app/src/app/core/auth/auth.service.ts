import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private keycloakService: KeycloakService) {}

    public getLoggedUser(): KeycloakTokenParsed | undefined {
        try {
            return this.keycloakService.getKeycloakInstance().idTokenParsed;
        } catch (error) {
            console.error('Keycloak Exception', error);
            return undefined;
        }
    }

    public isLoggedIn(): Promise<boolean> {
        return this.keycloakService.isLoggedIn();
    }

    public loadUserProfiles(): Promise<KeycloakProfile> {
        return this.keycloakService.loadUserProfile();
    }

    public login(): Promise<void> {
        return this.keycloakService.login();
    }

    public logout(): Promise<void> {
        return this.keycloakService.logout();
    }

    public redirectToProfile() {
        this.keycloakService.getKeycloakInstance().accountManagement();
    }

    public getRoles(): string[] {
        return this.keycloakService.getUserRoles();
    }
}
