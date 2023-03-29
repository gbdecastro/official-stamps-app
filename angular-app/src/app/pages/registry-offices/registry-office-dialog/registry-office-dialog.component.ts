import { Component, Inject } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistryOfficeRequest } from '@portal/core/interfaces/request';

@Component({
    selector: 'app-registry-office-dialog',
    templateUrl: './registry-office-dialog.component.html',
    styleUrls: ['./registry-office-dialog.component.scss'],
})
export class RegistryOfficeDialogComponent {
    form: FormGroup;

    get mode(): string {
        return this.data.mode;
    }

    get name(): AbstractControl {
        return this.form.controls['name'];
    }

    get region(): AbstractControl {
        return this.form.controls['region'];
    }

    get county(): AbstractControl {
        return this.form.controls['county'];
    }

    get city(): AbstractControl {
        return this.form.controls['city'];
    }

    constructor(
        @Inject(MAT_DIALOG_DATA)
        private readonly data: {
            mode: string;
            registryOffice: RegistryOfficeRequest | null;
        },
        private readonly dialogRef: MatDialogRef<RegistryOfficeDialogComponent>,
        private readonly fb: FormBuilder
    ) {
        this.form = this.fb.group({
            name: this.fb.control('', [
                Validators.required,
                Validators.maxLength(255),
            ]),
            region: this.fb.control('', [
                Validators.required,
                Validators.maxLength(255),
            ]),
            county: this.fb.control('', [
                Validators.required,
                Validators.maxLength(255),
            ]),
            city: this.fb.control('', [
                Validators.required,
                Validators.maxLength(255),
            ]),
        });

        if (this.data.registryOffice) {
            this.name.setValue(this.data.registryOffice.name);
            this.city.setValue(this.data.registryOffice.city);
            this.region.setValue(this.data.registryOffice.region);
            this.county.setValue(this.data.registryOffice.county);
        }
    }

    save(): void {
        if (this.form.valid) this.dialogRef.close(this.form.value);
    }
}
