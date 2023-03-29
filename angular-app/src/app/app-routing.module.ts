import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./pages/pages.module').then((m) => m.PagesModule),
    },
    {
        path: 'not-authorized',
        loadChildren: () =>
            import('./pages/not-authorized/not-authorized.module').then(
                (m) => m.NotAuthorizedModule
            ),
    },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: false })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
