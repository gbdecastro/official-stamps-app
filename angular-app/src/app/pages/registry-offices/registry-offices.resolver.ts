import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    Resolve,
    RouterStateSnapshot,
} from '@angular/router';
import { RegistryOfficeResponse } from '@portal/core/interfaces/response';
import { RegistryOfficeService } from '@portal/pages/registry-offices/services/registry-office.service';
import { map, Observable } from 'rxjs';

@Injectable()
export class RegistryOfficesResolver
    implements Resolve<RegistryOfficeResponse>
{
    constructor(private readonly service: RegistryOfficeService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<RegistryOfficeResponse> {
        const { id } = route.params;

        return this.service.getById(id).pipe(map((data) => data.data));
    }
}
