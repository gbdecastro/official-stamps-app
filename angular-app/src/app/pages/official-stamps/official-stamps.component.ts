import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OfficialStampRequest } from '@portal/core/interfaces/request';
import { OfficialStampResponse } from '@portal/core/interfaces/response';
import { OfficialStampService } from '@portal/pages/official-stamps/services/official-stamp.service';
import { catchError, distinctUntilChanged, finalize, map, of } from 'rxjs';
import { OfficialStampsDialogComponent } from './official-stamps-dialog/official-stamps-dialog.component';

type Columns = keyof OfficialStampRequest | string;

@Component({
    selector: 'app-official-stamps',
    templateUrl: './official-stamps.component.html',
    styleUrls: ['./official-stamps.component.scss'],
})
export class OfficialStampsComponent implements OnInit {
    dataSource: MatTableDataSource<OfficialStampResponse> =
        new MatTableDataSource();
    columns: Columns[] = ['id', 'name', 'value', 'actions'];
    displayColumns: string[] = ['#', 'Name', 'Value', 'Actions'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    loading = false;
    formFilter: FormGroup;

    get filter(): AbstractControl {
        return this.formFilter.controls['filter'];
    }

    constructor(
        private readonly officialService: OfficialStampService,
        private readonly fb: FormBuilder,
        private readonly matDialog: MatDialog,
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
        this.getAllOfficialStamps();
    }

    onRefresh(): void {
        this.getAllOfficialStamps();
    }

    onFilter(value: string) {
        this.dataSource.filter = value.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onAdd(): void {
        const dialog = this.matDialog.open(OfficialStampsDialogComponent, {
            data: {
                mode: 'Add',
                officialStamp: null,
            },
        });

        dialog.afterClosed().subscribe((data: OfficialStampRequest) => {
            if (data) {
                this.add(data);
            }
        });
    }

    onEdit(officialStamp: OfficialStampResponse): void {
        const request: OfficialStampRequest = {
            name: officialStamp.name,
            value: officialStamp.value,
        };

        const dialog = this.matDialog.open(OfficialStampsDialogComponent, {
            data: {
                mode: 'Edit',
                officialStamp: request,
            },
        });

        dialog.afterClosed().subscribe((data: OfficialStampRequest) => {
            if (data) {
                this.edit(officialStamp.id, data);
            }
        });
    }

    private getAllOfficialStamps() {
        this.loading = true;
        this.officialService
            .getAll()
            .pipe(
                map((data) => {
                    if (data) return data.data;
                    return [];
                }),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((officialStamps) => {
                this.dataSource = new MatTableDataSource(officialStamps);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    private add(officialStamp: OfficialStampRequest) {
        this.loading = true;
        this.officialService
            .create(officialStamp)
            .pipe(
                map((data) => {
                    return data.data;
                }),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                if (data) {
                    this.dataSource.data = [...this.dataSource.data, data];
                    this.matSnackBar.open(
                        'Official Stamp Created Successufly',
                        'Close'
                    );
                }
            });
    }

    private edit(id: number, officialStamp: OfficialStampRequest) {
        this.loading = true;
        this.officialService
            .update(id, officialStamp)
            .pipe(
                map((data) => {
                    return data.data;
                }),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((data) => {
                if (data) {
                    const index = this.dataSource.data.findIndex(
                        (r) => r.id === data.id
                    );
                    this.dataSource.data[index] = data;
                    this.dataSource.data = [...this.dataSource.data];
                    this.matSnackBar.open(
                        'Official Stamp Updated Successufly',
                        'Close'
                    );
                }
            });
    }
}
