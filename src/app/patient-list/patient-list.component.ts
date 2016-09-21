import { Component, OnInit } from '@angular/core';
import { PatientsListService } from '../shared/patients-list.service'
import { SelectedPatientService } from '../shared/selected-patient.service';

@Component({
  selector: 'patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  constructor(private list: PatientsListService, private selected: SelectedPatientService) { }

  ngOnInit() {
  }

  OnClick(id: string) {
    this.selected.id = id;
  }

}
