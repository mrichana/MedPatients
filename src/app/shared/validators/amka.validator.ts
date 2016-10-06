import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

function validateAmkaFactory() {
  let AMKA_REGEXP = /^\s*[0-3]\d[0-1]\d\d\d[0-1]\d\d\d\d\s*$/;
  return (c: FormControl) => {
    return (c.value == null || AMKA_REGEXP.test(c.value)) ? null : {
      validateAmka: {
        valid: false
      }
    };
  };
}

@Directive({
  selector: '[validateAmka][ngModel],[validateAmka][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => AmkaValidator), multi: true }
  ]
})
export class AmkaValidator {

  validator: Function;

  constructor() {
    this.validator = validateAmkaFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}