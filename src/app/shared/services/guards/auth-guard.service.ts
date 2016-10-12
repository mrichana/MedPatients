import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import { AuthenticationService } from '../authentication.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthenticationService, private router: Router) {

    }
    canActivate(): Observable<boolean> {
        return new Observable<boolean>(observer => {
            this.auth.auth.first().subscribe(authState => {
                if (authState && (authState.auth.emailVerified)) {
                    observer.next(true);
                    observer.complete();
                }
                else if (authState && !authState.auth.emailVerified) {
                    observer.next(false);
                    observer.complete();
                    this.router.navigate(['/register/validate']);
                }
                else {
                    observer.next(false);
                    observer.complete();
                    this.router.navigate(['/login']);
                }
            })
        });
    }
}