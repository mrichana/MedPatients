import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { SelectedPatientService } from '../shared/services/selected-patient.service';

@Component({
  selector: 'patient-details-edit',
  templateUrl: './patient-details-edit.component.html',
  styleUrls: ['./patient-details-edit.component.css']
})
export class PatientDetailsEditComponent implements OnInit {

  constructor(private selected: SelectedPatientService, private router: Router) {
    if (!this.selected.patient) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  submit(form: NgForm) {
    this.selected.save();
    form.form.markAsPristine();
  }

  delete() {
    this.selected.delete();
    this.router.navigate(['/']);
  }
}
