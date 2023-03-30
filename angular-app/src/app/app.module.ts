import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { PartialsModule } from './partials/partials.module';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { AuthModule } from './core/auth/auth.module';
import { InterceptorModule } from './core/interceptor/interceptor.module';
import { DisableButtonByRoleDirective } from './core/directives/disable-button-by-role.directive';
import { DirectivesModule } from './core/directives/directives.module';

registerLocaleData(ptBr);

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        PagesModule,
        NgbModule,
        PartialsModule,
        AuthModule,
        InterceptorModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'R$' },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
