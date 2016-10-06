import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DatabaseService } from './database.service';
import { Patient } from '../patient/patient';

@Injectable()
export class PatientsListService {
  private _filterTerm: Observable<string>;
  private _filteredPatients: BehaviorSubject<Patient[]>;
  private _filterTermString: string = "";
  private _patients: Patient[];

  private filterPatients(): Patient[] {
    return this._patients.filter(patient => {
      if (/^\+?\d*$/.test(this._filterTermString)) {
        return (patient.amka && patient.amka.toString().includes(this._filterTermString)) ||
          (patient.telephone && patient.telephone.toString().includes(this._filterTermString)) ||
          (patient.mobile && patient.mobile.toString().includes(this._filterTermString));
      } else {
        return (patient.firstName && patient.firstName.toString().toLocaleLowerCase().includes(this._filterTermString)) ||
          (patient.lastName && patient.lastName.toString().toLocaleLowerCase().includes(this._filterTermString))
      }
    });
  }

  constructor(private db: DatabaseService) {
    this._filteredPatients = new BehaviorSubject(<Patient[]>[]);

    this.db.patients.subscribe(patients => {
      this._patients = patients;
      this._filteredPatients.next(this.filterPatients());
    })
  }


  public set filter(value: Observable<string>) {
    this._filterTerm = value;
    this._filterTerm.subscribe(term => {
      this._filterTermString = term.trim().toLocaleLowerCase();
      this._filteredPatients.next(this.filterPatients());
    })
  }

  public get filter(): Observable<string> {
    return this._filterTerm;
  }

  public get patients(): Observable<Patient[]> {
    return this._filteredPatients.asObservable();
  }

}
