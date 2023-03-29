import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseModule } from './base/base.module';
import { LoaderModule } from './loader/loader.module';

@NgModule({
    declarations: [],
    imports: [CommonModule, BaseModule, LoaderModule],
    exports: [BaseModule, LoaderModule],
})
export class PartialsModule {}
