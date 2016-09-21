/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PatientsListService } from './patients-list.service';

describe('Service: PatientsList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PatientsListService]
    });
  });

  it('should ...', inject([PatientsListService], (service: PatientsListService) => {
    expect(service).toBeTruthy();
  }));
});
