import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

function validateMobileFactory() {
  let MOBILE_REGEXP = /^\s*((\+30)?69\d{8})?\s*$/;
  return (c: FormControl) => {
    return (c.value == null || MOBILE_REGEXP.test(c.value)) ? null : {
      validateMobile: {
        valid: false
      }
    };
  };
}

@Directive({
  selector: '[validateMobile][ngModel],[validateMobile][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => MobileValidator), multi: true }
  ]
})
export class MobileValidator {

  validator: Function;

  constructor() {
    this.validator = validateMobileFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}