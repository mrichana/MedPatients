import { Injectable, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { AuthenticationService } from './authentication.service';
import { Patient } from './patient/patient';
import { PatientNotes } from './patient/patient-notes';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class DatabaseService {
  private _patients: Patient[];
  private _subscription: Subscription;

  constructor(private _af: AngularFire, private _auth: AuthenticationService) {
    this._auth.auth.subscribe(auth => {
      if (auth) {
        this._subscription = this._af.database.list(auth.uid + '/patients').subscribe(patients => {
          this._patients = <Patient[]>patients;
        });
      }
      else {
        if (this._subscription) {
          this._subscription.unsubscribe();
          this._subscription = null;
        }
        this._patients = null;
      }
    })
  }

  private cleanUp<T>(item: T): T {
    for (let key in item) {
      if (key[0] == '$') { delete item[key]; }
    }
    return item;
  }


  public get patients(): Patient[] {
    return this._patients;
  }

  public getPatient(amka: String): Observable<Patient> {
    if (this._auth.authenticated) {
      return this._af.database.object(this._auth.uid + '/patients/' + amka);
    }
    else {
      return null;
    }
  }

  public setPatient(id: string, patient: Patient) {
    if (this._auth.authenticated) {
      this.cleanUp(patient);
      let firebaseObject: FirebaseObjectObservable<Patient> = this._af.database.object(this._auth.uid + '/patients/' + id);
      firebaseObject.set(patient);
    }
    else {
      throw 'Error';
    }
  }

  public getPatientNotes(amka: String): Observable<PatientNotes> {
    if (this._auth.authenticated) {
      return this._af.database.object(this._auth.uid + '/patient-notes/' + amka);
    }
    else {
      return null;
    }
  }

  public setPatientNotes(id: string, notes: PatientNotes) {
    if (this._auth.authenticated) {
      this.cleanUp(notes);
      let firebaseObject: FirebaseObjectObservable<Patient> = this._af.database.object(this._auth.uid + '/patient-notes/' + id);
      firebaseObject.set(notes);
    }
    else {
      throw 'Error';
    }
  }


}
