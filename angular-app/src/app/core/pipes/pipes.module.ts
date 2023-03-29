import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SecretPipe } from './secret.pipe';
@NgModule({
    declarations: [SecretPipe],
    imports: [CommonModule],
    exports: [SecretPipe],
})
export class PipesModule {}
