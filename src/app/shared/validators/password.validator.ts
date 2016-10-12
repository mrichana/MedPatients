import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl } from '@angular/forms';

function validatePasswordFactory() {
    let PASSWORD_REGEXP = /^\S{6,}$/i;
    return (c: FormControl) => {
        return (c.value == null || PASSWORD_REGEXP.test(c.value)) ? null : {
            validatePassword: {
                valid: false
            }
        };
    };
}

@Directive({
    selector: '[validatePassword][ngModel],[validatePassword][formControl]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => PasswordValidator), multi: true }
    ]
})
export class PasswordValidator {

    validator: Function;

    constructor() {
        this.validator = validatePasswordFactory();
    }

    validate(c: FormControl) {
        return this.validator(c);
    }
}