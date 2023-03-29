import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from '@portal/core/auth/auth.service';
import { KeycloakTokenParsed } from 'keycloak-js';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {
    menuItems: { path: string; icon: string }[] = [
        { path: 'registry-offices', icon: 'apartment' },
        { path: 'official-stamps', icon: 'branding_watermark' },
    ];

    @ViewChild(MatDrawer, { static: true }) draw!: MatDrawer;

    userLogged: KeycloakTokenParsed;

    constructor(private readonly authService: AuthService) {
        this.userLogged =
            this.authService.getLoggedUser() as KeycloakTokenParsed;
    }

    ngOnInit(): void {}

    onToggleMenu(): void {
        this.draw.toggle();
    }
}
