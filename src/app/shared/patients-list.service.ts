import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DatabaseService } from './database.service';
import { Patient } from './patient/patient';

@Injectable()
export class PatientsListService {
  _filteredPatientsList: Patient[];

  constructor(private db: DatabaseService) {
  }

  public set filter( value: string) {
      this._filteredPatientsList = this.db.patients.filter(patient => {
        return patient.amka.includes(value) || patient.firstName.includes(value) || patient.lastName.includes(value);
      })
  }

  public get patients(): Patient[] {
    console.log(this._filteredPatientsList);
    return this._filteredPatientsList;
  }

}
