import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { Router } from '@angular/router';

import { PatientsListService } from '../shared/services/patients-list.service';
import { CreatePatientService } from '../shared/services/create-patient.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'filter-patient-list',
  templateUrl: './filter-patient-list.component.html',
  styleUrls: ['./filter-patient-list.component.css']
})
export class FilterPatientListComponent implements OnInit {
  private searchTerm: FormControl = new FormControl();
  private newPatientEnable: boolean = false;

  constructor(private patientsList: PatientsListService, private createPatient: CreatePatientService, private router: Router) { }

  ngOnInit() {
    this.patientsList.patients.subscribe(patients => {
      this.newPatientEnable = (patients.length == 0);
    })
    this.patientsList.filter = this.searchTerm.valueChanges
      .debounceTime(400)
      .map(term => { return (<string>term).trim() })
      .distinctUntilChanged();
  }

  private newPatient() {
    this.createPatient.createPatient(this.searchTerm.value);
    this.searchTerm.setValue('');
    this.router.navigate(['/edit']);
  }
}
