/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SelectedPatientService } from './selected-patient.service';

describe('Service: SelectedPatient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectedPatientService]
    });
  });

  it('should ...', inject([SelectedPatientService], (service: SelectedPatientService) => {
    expect(service).toBeTruthy();
  }));
});
