import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { PatientsListService } from '../shared/patients-list.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'filter-patient-list',
  templateUrl: './filter-patient-list.component.html',
  styleUrls: ['./filter-patient-list.component.css']
})
export class FilterPatientListComponent implements OnInit, AfterViewInit {
  private searchTerm: FormControl = new FormControl();

  constructor(private patientsList: PatientsListService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.searchTerm.valueChanges
      .debounceTime(400)
      .distinctUntilChanged().subscribe(term => {
        this.patientsList.filter = term;
      });
  }
}
