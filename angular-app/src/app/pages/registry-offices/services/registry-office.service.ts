import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { ResponseNestApp } from '../../../core/interfaces/nest-app.response';
import { RegistryOfficeRequest } from '../../../core/interfaces/request';
import {
    IOfficialStampToken,
    OfficialStampResponse,
    RegistryOfficeResponse,
} from '../../../core/interfaces/response';

@Injectable({
    providedIn: 'root',
})
export class RegistryOfficeService {
    private API_URL = `${environment.BASE_URL_API}/registry-offices`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<ResponseNestApp<RegistryOfficeResponse[]>> {
        return this.http.get<ResponseNestApp<RegistryOfficeResponse[]>>(
            this.API_URL
        );
    }

    getById(id: number): Observable<ResponseNestApp<RegistryOfficeResponse>> {
        return this.http.get<ResponseNestApp<RegistryOfficeResponse>>(
            `${this.API_URL}/${id}`
        );
    }

    create(
        registryOffice: RegistryOfficeRequest
    ): Observable<ResponseNestApp<RegistryOfficeResponse>> {
        return this.http.post<ResponseNestApp<RegistryOfficeResponse>>(
            this.API_URL,
            registryOffice
        );
    }

    update(
        id: number,
        registryOffice: RegistryOfficeRequest
    ): Observable<ResponseNestApp<RegistryOfficeResponse>> {
        return this.http.put<ResponseNestApp<RegistryOfficeResponse>>(
            `${this.API_URL}/${id}`,
            registryOffice
        );
    }

    getOfficialStamps(
        id: number
    ): Observable<ResponseNestApp<IOfficialStampToken[]>> {
        return this.http.get<any>(`${this.API_URL}/${id}/tokens`);
    }

    buyToken(
        id: number,
        officialStamp: OfficialStampResponse,
        quantity: number
    ): Observable<any> {
        return this.http.post<any>(
            `${this.API_URL}/${id}/official-stamps/${officialStamp.id}`,
            { quantity: quantity }
        );
    }
}
