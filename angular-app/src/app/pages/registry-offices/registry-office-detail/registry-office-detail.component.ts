import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RegistryOfficeResponse } from '@portal/core/interfaces/response';
import { OfficialStampService } from '@portal/pages/official-stamps/services/official-stamp.service';
import { RegistryOfficeService } from '@portal/pages/registry-offices/services/registry-office.service';
import { groupBy } from 'lodash';
import { map } from 'rxjs';
import { BuyOfficialStampComponent } from '../buy-official-stamp/buy-official-stamp.component';
import { OfficialStampResponse } from './../../../core/interfaces/response';

@Component({
    selector: 'app-registry-office-detail',
    templateUrl: './registry-office-detail.component.html',
    styleUrls: ['./registry-office-detail.component.scss'],
})
export class RegistryOfficeDetailComponent implements OnInit {
    registryOffice!: RegistryOfficeResponse;
    registryOfficeSecret = false;

    officialStamps: OfficialStampResponse[] = [];
    officialStampSecret: { [key: number]: boolean } = {};

    totalOfficialStamps: number = 0;
    totalPerOfficialStamps: { [key: string]: number } = {};

    constructor(
        private activateRoute: ActivatedRoute,
        private registryOfficeService: RegistryOfficeService,
        private officialStampService: OfficialStampService,
        private matDialog: MatDialog,
        private readonly matSnackBar: MatSnackBar
    ) {
        this.activateRoute.data.subscribe(({ registryOffice }) => {
            this.registryOffice = registryOffice;
        });
    }

    async ngOnInit(): Promise<void> {
        this.getFromBlockchain();
        this.getAllFromDB();
    }

    private getFromBlockchain() {
        this.registryOfficeService
            .getOfficialStamps(this.registryOffice.id)
            .subscribe((data) => {
                this.totalOfficialStamps = data.data.length;
                const group = groupBy(data.data, 'name');
                Object.keys(group).forEach((item) => {
                    this.totalPerOfficialStamps[item] = group[item].length;
                });
            });
    }

    private getAllFromDB() {
        this.officialStampService
            .getAll()
            .pipe(
                map((data) => {
                    return data ? data.data : [];
                })
            )
            .subscribe((data) => {
                this.officialStamps = data;
                this.officialStamps.forEach((os) => {
                    this.officialStampSecret[os.id] = false;
                    this.totalPerOfficialStamps[os.name] = this
                        .totalPerOfficialStamps[os.name]
                        ? this.totalPerOfficialStamps[os.name]
                        : 0;
                });
            });
    }

    onBuy(officialStamp: OfficialStampResponse): void {
        const dialog = this.matDialog.open(BuyOfficialStampComponent, {
            data: {
                officialStamp,
            },
        });

        dialog.afterClosed().subscribe(async (quantity: number) => {
            if (quantity) {
                this.registryOfficeService
                    .buyToken(this.registryOffice.id, officialStamp, quantity)
                    .subscribe((item) => {
                        this.matSnackBar.open(
                            'Official Stamp(s) purchased Successufly',
                            'Close'
                        );

                        this.totalPerOfficialStamps[officialStamp.name] +=
                            quantity;
                        this.totalOfficialStamps += quantity;
                        this.registryOffice.wallet.balance =
                            this.registryOffice.wallet.balance -
                            officialStamp.value * quantity;
                    });
            }
        });
    }

    getTotalPerOfficialStamp(name: string): number {
        return name in this.totalPerOfficialStamps
            ? this.totalPerOfficialStamps[name]
            : 0;
    }
}
