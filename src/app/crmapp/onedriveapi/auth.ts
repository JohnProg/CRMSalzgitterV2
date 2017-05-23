import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';


export class AuthStatus {
  logged_in: boolean = false;
  expires_in: number = 0;

  constructor(logged_in?: boolean, expires?: number) {
    if (logged_in)
      this.logged_in = logged_in;

    if (expires)
      this.expires_in = expires;
  }
}

@Injectable()
export class OneDriveAuth {

  private static LOGIN_URL: string        = 'https://login.live.com/oauth20_authorize.srf';
  private _secret:          string        = environment._secret;
  private _clientId:        string        = environment._clientId;
  private _scopes:          Array<string> = environment._scopes;
  private _redirectUrl:     string        = environment._redirectUrl;

  private _accessToken:     string        = null;
  private _tokenType:       string        = null;
  private _expiresIn:       number        = null;
  private _userId:          string        = null;

  private _loggedIn:        boolean       = false;

  private _status: Subject<AuthStatus> = new Subject();

  constructor(private http: Http) {

  }

  checkLogin(client_id?: string, secret?: string, redirectUrl?: string) {
    if (location.hash.length > 1) {
      // ok, we have a token
      if (!this.parseRedirectUrl(location.hash)) {
        // Error!
        this._loggedIn = false;
        this._status.next(new AuthStatus(false, 0));
      } else {
        // logged in!
        this._loggedIn = true;

        setTimeout(() => {this._status.next(new AuthStatus(true, this._expiresIn))}, 1000);

        // TODO: this.saveInLocalStorage();
      }

    } else {
      // redirect to login page
      this._loggedIn = false;
      this.login(client_id, secret, redirectUrl);
    }
  }

  login(client_id?: string, secret?: string, redirectUrl?: string) {
    
    if (client_id)
      this.clientId = client_id;

    if (secret)
      this.secret = secret;

    if (redirectUrl)
      this.redirectUrl = redirectUrl;

    let url = OneDriveAuth.LOGIN_URL;
    url += "?client_id=" + this.clientId;
    url += "&scope=" + this.scopes.join("%20");
    url += "&response_type=" + "token";
    url += "&redirect_uri=" + this.redirectUrl;
    window.open(url, '_parent');
    //window.location.href = url;
  }

  logout() {
    let url = OneDriveAuth.LOGIN_URL;
    url += "?client_id=" + this.clientId;
    url += "&redirect_uri=" + this.redirectUrl;
  }

  get status() {
    return new Observable(fn => this._status.subscribe(fn));
  }

  set secret(s: string) {
    this._secret = s;
  }

  get clientId() {
    return this._clientId;
  }

  set clientId(cId: string) {
    this._clientId = cId;
  }

  get scopes() {
    return this._scopes;
  }

  set scopes(scopes: Array<string>) {
    this._scopes = scopes;
  }

  get redirectUrl() {
    return this._redirectUrl;
  }

  set redirectUrl(url: string) {
    this._redirectUrl = url;
  }

  get token() {
    return this._accessToken;
  }

  // private:

  private parseRedirectUrl(url: string) {
    let params = {};
    let queryString = url.substring(1);
    let regex = /([^&=]+)=([^&]*)/g;
    let m: RegExpExecArray;
    while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    if (params['access_token']) {
      this._accessToken = params['access_token'];
      this._tokenType = params['token_type'];
      this._expiresIn = parseInt(params['expires_in']);
      this._userId = params['user_id'];

      return true;
    }

    return false;
  }
}

export var ONEDRIVE_PROVIDERS = [OneDriveAuth];
