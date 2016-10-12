import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import 'rxjs/add/operator/first';
import { Router } from '@angular/router';

@Component({
  selector: 'validate',
  templateUrl: './emailValidate.component.html',
  styleUrls: ['./emailValidate.component.css']
})
export class EmailValidateComponent implements OnInit {

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.auth.auth.logout();
    this.router.navigate(['/login']);
  }

  resendEmail() {
    this.auth.auth.first().subscribe(auth => {
      auth.auth.sendEmailVerification();
    });
  }

}
