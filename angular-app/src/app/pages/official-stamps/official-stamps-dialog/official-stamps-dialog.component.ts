import { Component, Inject } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OfficialStampRequest } from '@portal/core/interfaces/request';

@Component({
    selector: 'app-official-stamps-dialog',
    templateUrl: './official-stamps-dialog.component.html',
    styleUrls: ['./official-stamps-dialog.component.scss'],
})
export class OfficialStampsDialogComponent {
    form: FormGroup;

    get mode(): string {
        return this.data.mode;
    }

    get name(): AbstractControl {
        return this.form.controls['name'];
    }

    get value(): AbstractControl {
        return this.form.controls['value'];
    }

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly data: {
            mode: string;
            officialStamp: OfficialStampRequest | null;
        },
        private readonly dialogRef: MatDialogRef<OfficialStampsDialogComponent>,
        private readonly fb: FormBuilder
    ) {
        this.form = this.fb.group({
            name: this.fb.control('', [
                Validators.required,
                Validators.maxLength(255),
            ]),
            value: this.fb.control('', [Validators.required]),
        });

        if (this.data.officialStamp) {
            this.name.setValue(this.data.officialStamp.name);
            this.value.setValue(this.data.officialStamp.value);
        }
    }

    save(): void {
        if (this.form.valid) this.dialogRef.close(this.form.value);
    }
}
