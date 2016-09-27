import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { SelectedPatientService } from '../shared/services/selected-patient.service';

@Component({
  selector: 'patient-details-edit',
  templateUrl: './patient-details-edit.component.html',
  styleUrls: ['./patient-details-edit.component.css']
})
export class PatientDetailsEditComponent implements OnInit {
  private form: FormGroup;

  constructor(private fb: FormBuilder, private selected: SelectedPatientService, private router: Router) {
    this.form = fb.group({
      'firstName': [this.selected.patient.firstName],
      'lastName': [this.selected.patient.lastName, Validators.required],
      'amka': [this.selected.patient.amka],
      'dob': [this.selected.patient.dob],
      'notes': [this.selected.notes]
    });
  }

  ngOnInit() {
    this.form.get('amka').valueChanges.subscribe((amka: string) => {
      let dates: RegExpExecArray = /^(\d{2})(\d{2})(\d{2})\d{5}$/.exec(amka);
      if (dates) {
        let year: number = +dates[3];
        if ((new Date().getFullYear()) - (year + 1900) > 100) {
          year = year + 2000;
        } else {
          year = year + 1900;
        }
        this.form.patchValue({ 'dob': (year.toString()) + '-' + dates[2] + '-' + dates[1] });
        this.form.get('dob').markAsDirty();
      }
    });

    this.form.valueChanges.subscribe(value => {
      this.selected.patient.firstName = value['firstName'];
      this.selected.patient.lastName = value['lastName'];
      this.selected.patient.amka = value['amka'];
      this.selected.patient.dob = value['dob'];
      this.selected.notes = value['notes'];
    })
  }

  submit() {
    this.selected.save();
    this.form.markAsPristine();
  }

  delete() {
    this.selected.delete();
    this.router.navigate(['/']);
  }
}
