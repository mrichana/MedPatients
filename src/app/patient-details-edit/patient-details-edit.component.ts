import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectedPatientService } from '../shared/services/selected-patient.service';

@Component({
  selector: 'patient-details-edit',
  templateUrl: './patient-details-edit.component.html',
  styleUrls: ['./patient-details-edit.component.css']
})
export class PatientDetailsEditComponent implements OnInit {
  @ViewChild('form') form: NgForm;

  constructor(private selected: SelectedPatientService, private router: Router) {
  }

  ngOnInit() {
  }

  submit(form: NgForm) {
    this.selected.save();
    form.form.markAsPristine();
  }

  delete() {
    if (window.confirm('Διαγραφή του ασθενούς?')) {
      this.selected.delete();
      this.router.navigate(['/']);
    };
  }

  addAddress() {
    console.log('addAddress');
  }
}
