import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { NotAuthorizedRoutingModule } from './not-authorized-routing.module';
import { NotAuthorizedComponent } from './not-authorized.component';

@NgModule({
    declarations: [NotAuthorizedComponent],
    imports: [CommonModule, MatIconModule, NotAuthorizedRoutingModule],
})
export class NotAuthorizedModule {}
