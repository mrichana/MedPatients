import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { DatabaseService } from './database.service';
import { UUIDService } from './uuid.service';
import { Patient } from '../patient/patient';
import { Notes } from '../patient/notes';

@Injectable()
export class SelectedPatientService {
  private _id: string;
  private _selectedPatient: Patient;
  private _selectedPatientNotes: string;

  constructor(private db: DatabaseService, private uuid: UUIDService) { }

  public get patient(): Patient {
    return this._selectedPatient;
  }

  public set patient(value: Patient) {
    this._selectedPatient = value;
  }

  public get notes(): string {
    return this._selectedPatientNotes;
  }
  public set notes(value: string) {
    this._selectedPatientNotes = value;
  }

  public get age(): number {
    let now :moment.Moment = moment();
    let ret = now.diff(moment(this._selectedPatient.dob), 'years');
    return ret;
  }

  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;

    this.db.getPatient(value).subscribe(patient => {
      this._selectedPatient = patient;
    });
    this.db.getPatientNotes(value).subscribe(notes => {
      this._selectedPatientNotes = notes.notes;
    });
  }
  
  public save() {
    this.db.setPatient(this.id, this._selectedPatient);
    this.db.setPatientNotes(this.id, new Notes(this._selectedPatientNotes));
  }

  public create (patient: Patient = null) {
    let id: string = this.uuid.getUUID();
    this.db.setPatient(id, patient|| new Patient('0000000000', 'first name', 'last name', new Date()));
    this.db.setPatientNotes(id, new Notes(''));
    this.id = id;
  }
}
