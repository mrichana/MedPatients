import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { ListViewComponent } from './list-view/list-view.component';

const appRoutes: Routes = [
    { path: 'edit', component: PatientDetailsComponent },
    { path: '**', component: ListViewComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
