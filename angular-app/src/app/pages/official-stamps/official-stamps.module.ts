import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { OfficialStampService } from '@portal/pages/official-stamps/services/official-stamp.service';
import { LoaderModule } from '@portal/partials/loader/loader.module';
import {
    CurrencyMaskConfig,
    CurrencyMaskModule,
    CURRENCY_MASK_CONFIG,
} from 'ng2-currency-mask';
import { OfficialStampsDialogComponent } from './official-stamps-dialog/official-stamps-dialog.component';
import { OfficialStampsRoutingModule } from './official-stamps-routing.module';
import { OfficialStampsComponent } from './official-stamps.component';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: 'left',
    allowNegative: false,
    decimal: ',',
    precision: 2,
    prefix: 'R$ ',
    suffix: '',
    thousands: '.',
};

@NgModule({
    declarations: [OfficialStampsComponent, OfficialStampsDialogComponent],
    imports: [
        CommonModule,
        CurrencyMaskModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatIconModule,
        LoaderModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSortModule,
        MatDialogModule,
        MatSnackBarModule,
        OfficialStampsRoutingModule,
    ],
    providers: [
        OfficialStampService,
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
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 2500 },
        },
    ],
    exports: [OfficialStampsComponent],
})
export class OfficialStampsModule {}
