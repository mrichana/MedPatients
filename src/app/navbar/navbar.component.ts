import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {AuthenticationService} from '../shared/services/authentication.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() title: string;

  @Output() openSidebar: EventEmitter<any> = new EventEmitter();

  constructor( private auth: AuthenticationService ) {}

  ngOnInit() {
    this.title = this.title || 'Default Title'; 
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  openSideBar() {
    this.openSidebar.emit();
  }

}
