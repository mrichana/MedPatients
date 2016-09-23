import { Injectable, OnInit } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { AuthenticationService } from './authentication.service';
import { Patient } from '../patient/patient';
import { Notes } from '../patient/notes';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DatabaseService {
  private _subscription: Subscription;
  private _patients: Observable<Patient[]>;

  constructor(private _af: AngularFire, private _auth: AuthenticationService) {
    this._patients = Observable.create(observer => {
      this._af.auth.subscribe(auth => {
        if (auth) {
          this._subscription = this._af.database.list(auth.uid + '/patients').subscribe(patients => {
            observer.next(patients);
          })
        } else {
          this._subscription.unsubscribe();
          observer.next(<Patient[]>[]);
        }
      });
    });
  }

  private cleanUp<T>(item: T): T {
    for (let key in item) {
      if (key[0] == '$') { delete item[key]; }
    }
    return item;
  }

  public get patients(): Observable<Patient[]> {
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

  public getPatientNotes(amka: String): Observable<Notes> {
    if (this._auth.authenticated) {
      return this._af.database.object(this._auth.uid + '/patient-notes/' + amka);
    }
    else {
      return null;
    }
  }

  public setPatientNotes(id: string, notes: Notes) {
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
