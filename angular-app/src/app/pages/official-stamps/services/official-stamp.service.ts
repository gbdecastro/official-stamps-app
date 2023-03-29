import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { ResponseNestApp } from '../../../core/interfaces/nest-app.response';
import { OfficialStampRequest } from '../../../core/interfaces/request';
import { OfficialStampResponse } from '../../../core/interfaces/response';

export interface OfficialStampResponseResourceList {}

@Injectable({
    providedIn: 'root',
})
export class OfficialStampService {
    private API_URL = `${environment.BASE_URL_API}/official-stamps`;

    constructor(private http: HttpClient) {}

    getAll(): Observable<ResponseNestApp<OfficialStampResponse[]>> {
        return this.http.get<ResponseNestApp<OfficialStampResponse[]>>(
            this.API_URL
        );
    }

    getById(id: number): Observable<ResponseNestApp<OfficialStampResponse>> {
        return this.http.get<ResponseNestApp<OfficialStampResponse>>(
            `${this.API_URL}/${id}`
        );
    }

    create(
        OfficialStamp: OfficialStampRequest
    ): Observable<ResponseNestApp<OfficialStampResponse>> {
        return this.http.post<ResponseNestApp<OfficialStampResponse>>(
            this.API_URL,
            OfficialStamp
        );
    }

    update(
        id: number,
        OfficialStamp: OfficialStampRequest
    ): Observable<ResponseNestApp<OfficialStampResponse>> {
        return this.http.put<ResponseNestApp<OfficialStampResponse>>(
            `${this.API_URL}/${id}`,
            OfficialStamp
        );
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.API_URL}/${id}`);
    }
}
