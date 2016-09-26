import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';
import { SelectedPatientService } from './selected-patient.service';
import { UUIDService } from './uuid.service';
import { Patient } from '../patient/patient';

@Injectable()
export class CreatePatientService {

  constructor(private db: DatabaseService, private selected: SelectedPatientService, private uuid: UUIDService) { }

  private patientFromString(str: string): Patient {
    if (!str) {
      return new Patient('', '', '', new Date());
    }
    let nameArray: RegExpExecArray = /^(?:(?:([0-9]{11})|(\D+?)\s+(\D+?)|(\D+)))$/.exec(str.trim());
    if (nameArray) {
      return new Patient(nameArray[1] || '', nameArray[2] || '', nameArray[3] || nameArray[4] || '', new Date());
    } else {
      return new Patient('', '', '', new Date());
    }
  }

  createPatient(value: string) {
    this.selected.create(this.patientFromString(value));
  };
}


