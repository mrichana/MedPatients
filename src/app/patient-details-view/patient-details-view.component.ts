import { Component, OnInit } from '@angular/core';
import {SelectedPatientService} from '../shared/services/selected-patient.service';

@Component({
  selector: 'patient-details-view',
  templateUrl: './patient-details-view.component.html',
  styleUrls: ['./patient-details-view.component.css']
})
export class PatientDetailsViewComponent implements OnInit {

  constructor(private selected: SelectedPatientService) { }

  ngOnInit() {
  }

}
