import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficialStampsComponent } from './official-stamps.component';

const routes: Routes = [
    { path: '', component: OfficialStampsComponent },
    { path: '**', redirectTo: '' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OfficialStampsRoutingModule {}
