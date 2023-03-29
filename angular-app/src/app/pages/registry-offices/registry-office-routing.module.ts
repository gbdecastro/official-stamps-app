import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistryOfficeDetailComponent } from './registry-office-detail/registry-office-detail.component';
import { RegistryOfficeComponent } from './registry-office.component';
import { RegistryOfficesResolver } from './registry-offices.resolver';

const routes: Routes = [
    {
        path: '',
        component: RegistryOfficeComponent,
    },
    {
        path: ':id/details',
        component: RegistryOfficeDetailComponent,
        resolve: { registryOffice: RegistryOfficesResolver },
    },
    { path: '**', redirectTo: '' },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RegistryOfficeRoutingModule {}
