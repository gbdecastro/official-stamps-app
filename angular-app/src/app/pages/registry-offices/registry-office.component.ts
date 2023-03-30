import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RegistryOfficeRequest } from '@portal/core/interfaces/request';
import { distinctUntilChanged, finalize, map } from 'rxjs';
import { RegistryOfficeResponse } from '../../core/interfaces/response';
import { RegistryOfficeDialogComponent } from './registry-office-dialog/registry-office-dialog.component';
import { RegistryOfficeService } from './services/registry-office.service';

type Columns = keyof RegistryOfficeResponse | string;

@Component({
    selector: 'app-registry-office',
    templateUrl: './registry-office.component.html',
    styleUrls: ['./registry-office.component.scss'],
})
export class RegistryOfficeComponent implements OnInit {
    dataSource: MatTableDataSource<RegistryOfficeResponse> =
        new MatTableDataSource();
    columns: Columns[] = [
        'id',
        'name',
        'county',
        'city',
        'region',
        'wallet',
        'actions',
    ];
    displayColumns: string[] = [
        '#',
        'Name',
        'County',
        'City',
        'Region',
        'Balance',
        'Actions',
    ];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    loading = false;
    formFilter: FormGroup;

    get filter(): AbstractControl {
        return this.formFilter.controls['filter'];
    }

    constructor(
        private readonly registryService: RegistryOfficeService,
        private readonly fb: FormBuilder,
        private readonly matDialog: MatDialog,
        private readonly router: Router,
        private readonly matSnackBar: MatSnackBar
    ) {
        this.formFilter = this.fb.group({
            filter: this.fb.control(''),
        });

        this.filter.valueChanges
            .pipe(distinctUntilChanged())
            .subscribe((value) => {
                this.onFilter(value);
            });
    }

    ngOnInit(): void {
        this.getAllRegistryOffices();
    }

    onRefresh(): void {
        this.getAllRegistryOffices();
    }

    onFilter(value: string) {
        this.dataSource.filter = value.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onAdd(): void {
        const dialog = this.matDialog.open(RegistryOfficeDialogComponent, {
            data: {
                mode: 'Add',
                registryOffice: null,
            },
        });

        dialog.afterClosed().subscribe((data: RegistryOfficeRequest) => {
            if (data) {
                this.add(data);
            }
        });
    }

    onEdit(registryOffice: RegistryOfficeResponse): void {
        const request: RegistryOfficeRequest = {
            city: registryOffice.city,
            county: registryOffice.county,
            name: registryOffice.name,
            region: registryOffice.region,
        };

        const dialog = this.matDialog.open(RegistryOfficeDialogComponent, {
            data: {
                mode: 'Edit',
                registryOffice: request,
            },
        });

        dialog.afterClosed().subscribe((data: RegistryOfficeRequest) => {
            if (data) {
                this.edit(registryOffice.id, data);
            }
        });
    }

    onDetails(id: number): void {
        this.router.navigate(['registry-offices', id, 'details']);
    }

    private getAllRegistryOffices() {
        this.loading = true;
        this.registryService
            .getAll()
            .pipe(
                map((data) => {
                    return data ? data.data : [];
                }),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((registryOffices) => {
                this.dataSource = new MatTableDataSource(registryOffices);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    private add(registryOffice: RegistryOfficeRequest) {
        this.loading = true;
        this.registryService
            .create(registryOffice)
            .pipe(
                map((data) => {
                    return data.data;
                }),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                this.dataSource.data = [...this.dataSource.data, data];
                this.matSnackBar.open(
                    'Registry Office Created Successufly',
                    'Close'
                );
            });
    }

    private edit(id: number, regisryOffice: RegistryOfficeRequest) {
        this.loading = true;
        this.registryService
            .update(id, regisryOffice)
            .pipe(
                map((data) => {
                    return data.data;
                }),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                const index = this.dataSource.data.findIndex(
                    (r) => r.id === data.id
                );
                this.dataSource.data[index] = data;
                this.matSnackBar.open(
                    'Registry Office Updated Successufly',
                    'Close'
                );
            });
    }
}
