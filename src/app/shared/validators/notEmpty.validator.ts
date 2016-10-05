import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

function validateNotEmptyFactory() {
  let NOTEMPTY_REGEXP: RegExp = /\S+/;
  return (c: FormControl) => {
    return (c.value !=null && NOTEMPTY_REGEXP.test(c.value)) ? null : {
      validateNotEmpty: {
        valid: false
      }
    };
  };
}

@Directive({
  selector: '[validateNotEmpty][ngModel],[validateNotEmpty][formControl]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => NotEmptyValidator), multi: true }
  ]
})
export class NotEmptyValidator {

  validator: Function;

  constructor() {
    this.validator = validateNotEmptyFactory();
  }

  validate(c: FormControl) {
    return this.validator(c);
  }
}