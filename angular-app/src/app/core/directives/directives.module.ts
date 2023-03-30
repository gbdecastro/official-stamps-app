import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../auth/auth.service';
import { DisableButtonByRoleDirective } from './disable-button-by-role.directive';

@NgModule({
    declarations: [DisableButtonByRoleDirective],
    imports: [CommonModule, MatTooltipModule],
    providers: [AuthService],
    exports: [DisableButtonByRoleDirective],
})
export class DirectivesModule {}
