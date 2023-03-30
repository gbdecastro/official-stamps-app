import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import {
    MatDialogModule,
    MAT_DIALOG_DATA,
    MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
    MatSnackBarModule,
    MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { DirectivesModule } from '@portal/core/directives/directives.module';
import { PipesModule } from '@portal/core/pipes/pipes.module';
import { RegistryOfficeService } from '@portal/pages/registry-offices/services/registry-office.service';
import { LoaderModule } from 'src/app/partials/loader/loader.module';
import { BuyOfficialStampComponent } from './buy-official-stamp/buy-official-stamp.component';
import { RegistryOfficeDetailComponent } from './registry-office-detail/registry-office-detail.component';
import { RegistryOfficeDialogComponent } from './registry-office-dialog/registry-office-dialog.component';
import { RegistryOfficeRoutingModule } from './registry-office-routing.module';
import { RegistryOfficeComponent } from './registry-office.component';
import { RegistryOfficesResolver } from './registry-offices.resolver';

@NgModule({
    declarations: [
        RegistryOfficeComponent,
        RegistryOfficeDialogComponent,
        RegistryOfficeDetailComponent,
        BuyOfficialStampComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatIconModule,
        LoaderModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSortModule,
        MatDialogModule,
        MatRippleModule,
        MatChipsModule,
        RegistryOfficeRoutingModule,
        PipesModule,
        MatSnackBarModule,
        DirectivesModule,
    ],
    providers: [
        RegistryOfficeService,
        RegistryOfficesResolver,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {
            provide: MAT_DIALOG_DEFAULT_OPTIONS,
            useValue: {
                hasBackdrop: true,
                panelClass: 'portal-dialog',
                height: 'auto',
                width: '900px',
                disableClose: true,
                useValue: { scrollStrategy: new NoopScrollStrategy() },
            },
        },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 2500 },
        },
    ],
    exports: [RegistryOfficeComponent],
})
export class RegistryOfficeModule {}
