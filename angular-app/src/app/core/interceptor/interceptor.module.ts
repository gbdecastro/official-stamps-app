import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Interceptor } from './interceptor.service';

@NgModule({
    declarations: [],
    imports: [CommonModule, MatSnackBarModule],
    providers: [
        Interceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: Interceptor,
            multi: true,
        },
    ],
})
export class InterceptorModule {}
