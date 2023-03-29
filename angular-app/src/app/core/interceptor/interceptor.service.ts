import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, throwError } from 'rxjs';
@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(private _snackBar: MatSnackBar) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status == 403) {
                    this._snackBar.open('Not Authorized!', 'Close');
                }

                return throwError(error.message);
            })
        );
    }
}
