import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from '../partials/base/base.component';
import { AuthGuard } from './../core/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        children: [
            {
                path: 'not-authorized',
                loadChildren: () =>
                    import('./not-authorized/not-authorized.module').then(
                        (m) => m.NotAuthorizedModule
                    ),
            },
            {
                path: 'registry-offices',
                canActivate: [AuthGuard],
                loadChildren: () =>
                    import('./registry-offices/registry-office.module').then(
                        (m) => m.RegistryOfficeModule
                    ),
            },
            {
                path: 'official-stamps',
                canActivate: [AuthGuard],
                data: {
                    roles: ['admin'],
                },
                loadChildren: () =>
                    import('./official-stamps/official-stamps.module').then(
                        (m) => m.OfficialStampsModule
                    ),
            },
            { path: '**', redirectTo: 'registry-offices' },
        ],
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
