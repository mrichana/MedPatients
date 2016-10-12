import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle().then((authState) => {
      console.log(authState);
      this.router.navigate(['/'])
    });
  }

  loginWithPassword() {
    this.auth.loginWithPassword(this.username, this.password).then((authState) => {
      this.router.navigate(['/'])
    });
  }

  resetPassword() {
    if (this.username) {
      this.auth.resetPassword(this.username);
      this.router.navigate(['/login/reset']);
    }
  }

}
