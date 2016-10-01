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
      return new Patient(null, null, null, null);
    }
    let nameArray: RegExpExecArray = /^(?:(?:([0-9]{11})|(\D+?)\s+(\D+?)|(\D+)))$/.exec(str.trim());
    if (nameArray) {
      return new Patient(nameArray[1] || null, nameArray[2] || null, nameArray[3] || nameArray[4] || null, null);
    } else {
      return new Patient(null, null, null, null);
    }
  }

  createPatient(value: string) {
    this.selected.create(this.patientFromString(value));
  };
}


