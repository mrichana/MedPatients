import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

function validateTelephoneFactory() {
  let TELEPHONE_REGEXP = /^\s*((\+30)?2\d{9})?\s*$/;
  return (c: FormControl) => {
    return (c.value == null || TELEPHONE_REGEXP.test(c.value)) ? null : {
      validateTelephone: {
        valid: false
      }
    };
  };
}

@Directive({
  selector: '[validateTelephone][ngModel],[validateTelephone][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => TelephoneValidator), multi: true }
  ]
})
export class TelephoneValidator {

  validator: Function;

  constructor() {
    this.validator = validateTelephoneFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}