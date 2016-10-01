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
  }

  ngOnInit() {
    // this.form.valueChanges.subscribe(value => {
    //   this.selected.firstName = value['firstName'];
    //   this.selected.lastName = value['lastName'];
    //   this.selected.amka = value['amka'];
    //   this.selected.dob = value['dob'];
    //   this.selected.notes = value['notes'];
    // })
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
