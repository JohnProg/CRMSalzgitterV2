import { Injectable } from '@angular/core';
import { Response, RequestOptions, Http, Headers, URLSearchParams, QueryEncoder  } from '@angular/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';
import { ConfigurationService } from './configuration.service';
import { ActionsService } from './actions.services';
//import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class TokenService {

    private user: any = {};

    public redirectUrl: string;

    headers: Headers;
    options: RequestOptions;
    tokenData: any;
    constructor(private _http: Http,
                private _confs: ConfigurationService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        //headers.append('Access-Control-Allow-Origin', '*');
        this.options = new RequestOptions({ headers: this.headers });
    }




    logout(): void {}

    login(user: string, pass: string) {
        let params: any = {
                grant_type: 'password',
                username: user,
                password: pass,
        };
        let body: string = this.encodeParams(params);
        return this._http.post(this._confs.TOKEN_ENDPOINT, body, this.options )
        .map((res: Response) => res.json() );
        // .subscribe( (res: any) => {
        //    debugger
        //    this.tokenData = res;
        //  }, (error: any) => {
        //    debugger
        //  });
    }

    getUserInfo() {

        return this._http.get(this._confs.serverWithApiUrl + 'Account/UserInfo',  { headers: this._confs.getHeaders() } )
        .map((res: Response) => res.json() )
        .subscribe( (res: any) => {
           debugger
           
         }, (error: any) => {
           debugger
         });
    }


    getLocalToken() {
        return localStorage.getItem('tokendata');  
    }


   signout(): void {
        this.redirectUrl = null;
        localStorage.removeItem('tokendata');  
        // Revokes token.
        //this.revokeToken();

        // Revokes refresh token.
        //this.revokeRefreshToken();
    }

    /** 
     * Decodes token through JwtHelper. 
     */  
    // private decodeToken(): void {
    //     if (this._confs.isValidToken()) {
    //         let token: string = localStorage.getItem('id_token');
    //         let jwtHelper: JwtHelper = new JwtHelper();
    //         this.user = jwtHelper.decodeToken(token);
    //     }
    // }

    private encodeParams(params: any): string {
        let body: string = "";  
        for (let key in params) {  
            if (body.length) {  
                body += "&";  
            }  
            body += key + "=";  
            body += encodeURIComponent(params[key]);  
        }
        return body;
    }
}