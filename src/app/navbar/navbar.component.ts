import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
    this.title = this.title || 'Default Title'; 
  }

  login() {
    console.log('login click');
  }

}
