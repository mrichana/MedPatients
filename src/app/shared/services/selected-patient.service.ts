import { Injectable } from '@angular/core';
import * as moment from 'moment';

import { DatabaseService } from './database.service';
import { UUIDService } from './uuid.service';
import { Patient } from '../patient/patient';
import { Notes } from '../patient/notes';

@Injectable()
export class SelectedPatientService {
  private _id: string;
  private _patient: Patient;
  private _patientNotes: string;

  constructor(private db: DatabaseService, private uuid: UUIDService) { }

  private patientFromString(str: string): Patient {
    if (!str) {
      return new Patient(null, null, null, null, null, null);
    }
    let nameArray: RegExpExecArray = /^(?:(?:([0-9]{11})|(\D+?)\s+(\D+?)|(\D+)))$/.exec(str.trim());
    if (nameArray) {
      return new Patient(nameArray[1] || null, nameArray[2] || null, nameArray[3] || nameArray[4] || null, null, null, null);
    } else {
      return new Patient(null, null, null, null, null, null);
    }
  }


  private dobFromAmka(amka: string): string {
    let dates: RegExpExecArray = /^(\d{2})(\d{2})(\d{2})\d{5}$/.exec(amka);
    if (dates) {
      let year: number = +dates[3];
      if ((new Date().getFullYear()) - (year + 1900) > 100) {
        year = year + 2000;
      } else {
        year = year + 1900;
      }
      return year.toString() + '-' + dates[2] + '-' + dates[1];
    }
    return null;
  }


  public get patient(): Patient {
    return this._patient;
  }
  public set patient(value: Patient) {
    this._patient = value;
  }

  public get firstName(): string {
    return this._patient.firstName;
  }
  public set firstName(value: string) {
    this._patient.firstName = value;
  }

  public get lastName(): string {
    return this._patient.lastName;
  }
  public set lastName(value: string) {
    this._patient.lastName = value;
  }

  public get amka(): string {
    return this._patient.amka;
  }
  public set amka(value: string) {
    this._patient.amka = value;
    if (!this.dob) {
      this.dob = this.dobFromAmka(this.amka);
    }
  }

  public get dob(): string {
    return this._patient.dob;
  }
  public set dob(value: string) {
    this._patient.dob = value;
  }

  public get telephone(): string {
    return this._patient.telephone;
  }
  public set telephone(value: string) {
    this._patient.telephone = value;
  }

  public get mobile(): string {
    return this._patient.mobile;
  }
  public set mobile(value: string) {
    this._patient.mobile = value;
  }

  public get notes(): string {
    return this._patientNotes;
  }
  public set notes(value: string) {
    this._patientNotes = value;
  }

  public get age(): number {
    let now: moment.Moment = moment();
    let ret = now.diff(moment(this._patient.dob), 'years');
    return ret;
  }

  public get id(): string {
    return this._id;
  }

  public select(id: string) {
    this._id = id;
    this.db.getPatient(id).subscribe(patient => {
      this._patient = patient;
    });
    this.db.getPatientNotes(id).subscribe(notes => {
      this._patientNotes = notes.notes;
    });
  }

  private newId() {
    this._id = this.uuid.getUUID();
  }

  public get isNew(): boolean {
    return this.id == null;
  }

  public save() {
    if (this.isNew) {
      this.newId();
    }
    this.db.setPatient(this.id, this._patient);
    this.db.setPatientNotes(this.id, new Notes(this._patientNotes));
  }

  public create(patient: Patient | string = null) {
    this._id = null;
    if (typeof(patient) === 'string') {
      patient = this.patientFromString(patient);
    }
    
    this._patient = patient || new Patient(null, null, null, null, null, null);
    if (!this.dob) {
      this.dob = this.dobFromAmka(this.amka);
    }
    this._patientNotes = null;
  }

  public delete() {
    this.db.setPatient(this.id);
    this.db.setPatientNotes(this.id);

    this._id = null;
    this._patient = null;
    this._patientNotes = null;
  }

  public reniew() {
    if (this.isNew) {
      this._patient = null;
      this._patientNotes = null;
    } else {
      this.select(this.id);
    }
  }
}
