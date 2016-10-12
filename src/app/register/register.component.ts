import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private username: string;
  private password: string;
  private passwordVerification: string;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  registerWithPassword() {
    if (this.password == this.passwordVerification) {
      this.auth.registerWithPassword(this.username, this.password).then(auth => {
        this.router.navigate(['/']);
      });
    }

  }

}
