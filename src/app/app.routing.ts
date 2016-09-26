import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDetailsEditComponent } from './patient-details-edit/patient-details-edit.component';
import { ListViewComponent } from './list-view/list-view.component';

const appRoutes: Routes = [
    { path: 'edit', component: PatientDetailsEditComponent },
    { path: '**', component: ListViewComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
