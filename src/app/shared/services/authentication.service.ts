import { AngularFire, AuthProviders, AuthMethods, AngularFireAuth, FirebaseAuthState } from 'angularfire2';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  private _displayName: string;
  private _email: string;
  private _photoURL: string;
  private _uid: string;

  private _emailVerified: boolean;

  constructor(private _af: AngularFire) {
    this._af.auth.subscribe(auth => {
      if (auth && auth.auth.emailVerified) {
        this._displayName = auth.auth.displayName;
        this._email = auth.auth.email;
        this._photoURL = auth.auth.photoURL;
        this._uid = auth.auth.uid;
        this._emailVerified = auth.auth.emailVerified;
      } else {
        this._displayName = null;
        this._email = null;
        this._photoURL = null;
        this._uid = null;
        this._emailVerified = false;
      }
    });
  };

  public get auth(): AngularFireAuth { return this._af.auth; }

  public get authenticated(): boolean { return this.uid != null; }
  public get displayName(): string { return this._displayName; }
  public get email(): string { return this._email; }
  public get photoURL(): string { return this._photoURL; }
  public get uid(): string { return this._uid; }
  public get emailVerified(): boolean { return this._emailVerified; }

  loginWithPassword(username: string, password: string): firebase.Promise<FirebaseAuthState> {
    return this._af.auth.login({
      email: username,
      password: password
    },
      {
        provider: AuthProviders.Password,
        method: AuthMethods.Password
      }
    )
  }

  loginWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this._af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  logout() {
    this._af.auth.logout();
  }

  registerWithPassword(username: string, password: string): firebase.Promise<FirebaseAuthState> {
    return this._af.auth.createUser({
      email: username,
      password: password
    }).then(auth => {
      auth.auth.sendEmailVerification();
    }
      );
  }

  resetPassword(username: string) {
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(username);
  }
}
