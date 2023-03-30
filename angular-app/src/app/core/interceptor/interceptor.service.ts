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
                const notAuthorized = [403, 401];

                if (notAuthorized.includes(error.status)) {
                    this._snackBar.open('Not Authorized!', 'Close');
                } else if (error.status === 0) {
                    this._snackBar.open('You are Offline', 'Close');
                } else {
                    this._snackBar.open('Something wrong happened', 'Close');
                }

                return throwError(error.message);
            })
        );
    }
}
