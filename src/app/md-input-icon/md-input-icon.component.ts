import { Component, OnInit, Input } from '@angular/core';
import { NgModel } from '@angular/forms'

@Component({
  selector: 'md-input-icon',
  templateUrl: './md-input-icon.component.html',
  styleUrls: ['./md-input-icon.component.css']
})
export class MdInputIconComponent implements OnInit {
  @Input() model: NgModel;
  constructor() { }

  ngOnInit() {
    
  }

}
