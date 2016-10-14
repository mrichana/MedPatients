import { Injectable } from '@angular/core';
import { Router, CanActivate, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import { AuthenticationService } from '../authentication.service'
import { SelectedPatientService } from '../selected-patient.service'
import { PatientDetailsEditComponent } from '../../../patient-details-edit/patient-details-edit.component';

@Injectable()
export class EditGuard implements CanActivate, CanDeactivate<PatientDetailsEditComponent> {
    constructor(private auth: AuthenticationService, private router: Router, private selected: SelectedPatientService) {

    }
    canActivate(): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.auth.auth.first().subscribe(authState => {
                if (authState && authState.auth.emailVerified && this.selected.patient) {
                    observer.next(true);
                    observer.complete();
                }
                else if (authState && authState.auth.emailVerified) {
                    observer.next(false);
                    observer.complete();
                    this.router.navigate(['/']);
                }
                else if (authState) {
                    observer.next(false);
                    observer.complete();
                    this.router.navigate(['/register/validate']);
                }
                else {
                    observer.next(false);
                    observer.complete();
                    this.router.navigate(['/login']);
                }
            })
        });
    }

    canDeactivate(editComponent: PatientDetailsEditComponent) {
        if (editComponent.form.pristine) {
            return true;
        } else {
            return window.confirm('Να χαθούν οι αλλαγές?');
        }
    }
}