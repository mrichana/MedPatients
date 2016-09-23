/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreatePatientService } from './create-patient.service';

describe('Service: CreatePatient', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatePatientService]
    });
  });

  it('should ...', inject([CreatePatientService], (service: CreatePatientService) => {
    expect(service).toBeTruthy();
  }));
});
