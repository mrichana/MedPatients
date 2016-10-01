import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PatientsListService } from '../shared/services/patients-list.service'
import { SelectedPatientService } from '../shared/services/selected-patient.service';

import { Patient } from '../shared/patient/patient';

@Component({
  selector: 'patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  private patients: Patient[];
  @Output() PatientSelected: EventEmitter<Patient> = new EventEmitter<Patient>();

  constructor(private list: PatientsListService, private selected: SelectedPatientService) { }

  ngOnInit() {
    this.list.patients.subscribe(patients => {
      this.patients = patients;
    })
  }

  OnClick(id: string) {
    this.selected.select(id);
    this.PatientSelected.emit(this.selected.patient);
  }

}
