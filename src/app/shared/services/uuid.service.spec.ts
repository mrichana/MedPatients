/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UUIDService } from './uuid.service';

describe('Service: Guid', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UUIDService]
    });
  });

  it('should ...', inject([UUIDService], (service: UUIDService) => {
    expect(service).toBeTruthy();
  }));
});
