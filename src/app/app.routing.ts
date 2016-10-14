import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDetailsEditComponent } from './patient-details-edit/patient-details-edit.component';
import { ListViewComponent } from './list-view/list-view.component';
import { LoginComponent } from './login/login.component'
import { LoginResetComponent } from './login/loginReset/loginReset.component'
import { RegisterComponent } from './register/register.component'
import { EmailValidateComponent } from './register/emailValidate/emailValidate.component'

import { AuthGuard } from './shared/services/guards/auth-guard.service';
import { EditGuard } from './shared/services/guards/edit-guard.service';

const appRoutes: Routes = [
    { path: 'edit', component: PatientDetailsEditComponent, canActivate: [EditGuard], canDeactivate: [EditGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'login/reset', component: LoginResetComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'register/validate', component: EmailValidateComponent },
    { path: '**', component: ListViewComponent, canActivate: [AuthGuard] }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
