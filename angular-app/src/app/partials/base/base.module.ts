import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from '@portal/core/auth/auth.module';
import { BaseComponent } from './base.component';

@NgModule({
    declarations: [BaseComponent],
    imports: [
        NgbModule,
        CommonModule,
        MatSidenavModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        HttpClientModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatDialogModule,
        RouterModule,
        AuthModule,
    ],
    exports: [BaseComponent],
})
export class BaseModule {}
