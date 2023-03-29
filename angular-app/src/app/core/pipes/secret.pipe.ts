import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'secret',
})
export class SecretPipe implements PipeTransform {
    transform(value: unknown, secret: boolean): unknown {
        return secret ? '....' : value;
    }
}
