import {NgForm} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {SelectedPatientService} from '../shared/selected-patient.service';

@Component({
  selector: 'patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  constructor(private selected: SelectedPatientService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form);
    form.form.markAsPristine();
    this.selected.save();
  }
}
