import { Component, Inject } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfficialStampResponse } from '@portal/core/interfaces/response';

@Component({
    selector: 'app-buy-official-stamp',
    templateUrl: './buy-official-stamp.component.html',
    styleUrls: ['./buy-official-stamp.component.scss'],
})
export class BuyOfficialStampComponent {
    form: FormGroup;

    get quantity(): AbstractControl {
        return this.form.controls['quantity'];
    }

    constructor(
        @Inject(MAT_DIALOG_DATA)
        readonly data: {
            officialStamp: OfficialStampResponse;
        },
        private readonly dialogRef: MatDialogRef<BuyOfficialStampComponent>,
        private readonly fb: FormBuilder
    ) {
        this.form = this.fb.group({
            quantity: this.fb.control(1, [Validators.required]),
        });
    }

    save(): void {
        if (this.form.valid)
            this.dialogRef.close(parseInt(this.quantity.value));
    }
}
