import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'input-icon',
  templateUrl: './input-icon.component.html',
  styleUrls: ['./input-icon.component.css']
})
export class InputIconComponent implements OnInit {
  @Input() invalid: boolean;
  @Input() pristine: boolean;

  constructor() { }

  ngOnInit() {
  }

  icon(): string {
     if (this.invalid) {
      return 'invalid fa fa-exclamation'; 
    }
    if (!this.pristine) {
      return 'dirty fa fa-pencil'; //Yellow
    }

   return '';
  }

}
