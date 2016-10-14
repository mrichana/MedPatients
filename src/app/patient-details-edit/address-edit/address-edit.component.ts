import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'address-edit',
  template: `
    <button (click)="increment()">+</button>
    {{counterValue}}
    <button (click)="decrement()">-</button>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressEditComponent),
      multi: true
    }
  ]

})
export class AddressEditComponent implements ControlValueAccessor {

  @Input()
  _counterValue = 0;

  get counterValue() {
    return this._counterValue;
  }

  set counterValue(val) {
    this._counterValue = val;
    this.propagateChange(this._counterValue);
  }

  increment() {
    this.counterValue++;
  }

  decrement() {
    this.counterValue--;
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.counterValue = value;
    }
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }


}