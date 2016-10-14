
import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Address } from './../../shared/patient/address';

const noop = () => {
};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AddressEditComponent),
  multi: true
};

@Component({
  selector: 'address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})

export class AddressEditComponent implements ControlValueAccessor {

  //The internal data model
  private innerValue: Address;

  //Placeholders for the callbacks which are later providesd
  //by the Control Value Accessor
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  //get accessor
  get value(): Address {
    return this.innerValue;
  };

  //set accessor including call the onchange callback
  set value(v: Address) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  //Set touched on blur
  onBlur() {
    this.onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

}