import {AngularFire, AuthProviders, AuthMethods, AngularFireAuth} from 'angularfire2';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {
  private _displayName: string;
  private _email: string;
  private _photoURL: string;
  private _uid: string;

  constructor(private _af: AngularFire) { 
    this._af.auth.subscribe(auth => {
      if (auth) {
        this._displayName = auth.auth.displayName;
        this._email = auth.auth.email;
        this._photoURL = auth.auth.photoURL;
        this._uid = auth.auth.uid;
      } else {
        this._displayName = null;
        this._email = null;
        this._photoURL = null;
        this._uid = null;
      }
    });
  };

  public get auth(): AngularFireAuth {return this._af.auth;}

  public get authenticated(): boolean {return this.uid!=null;}
  public get displayName(): string {return this._displayName;}
  public get email(): string {return this._email;}
  public get photoURL(): string {return this._photoURL;}
  public get uid(): string {return this._uid;}

  login() {
    this._af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  logout() {
    this._af.auth.logout();
  }
}
