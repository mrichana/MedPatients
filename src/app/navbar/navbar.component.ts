import { Component, OnInit, Input } from '@angular/core';

import {AuthenticationService} from '../shared/authentication.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() title: string;

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

}
