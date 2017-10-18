import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { User } from '../model/allmodels';


@Injectable()
export class ConfigurationService {
    public server: string = environment.server;
    public appBase: string = environment.appBase;
    public apiUrl: string = 'api/';
    public apiCsutomUrl: string = 'customapi/';
    public serverWithApiUrl = this.server + this.apiUrl;
    public serverWithApiCustomUrl = this.server + this.apiCsutomUrl;
    public root = environment._root;
    public hideDelayToast: number = 2000;

    public pageSize: number = 5;
    public currentPage: number = 0;

    


    public oneDriveToken: any; 

    public TOKEN_ENDPOINT: string = this.server + 'Token';
    public tokenData: any;
    public userInfo: User;
    public headerData: Headers;
    
    public isValidToken(): boolean {

        if( this.tokenData ) {
            let d = moment(this.tokenData['.expires']);
            let today = moment();
            if (d > today) {
                // logged in so return true
                return true;
            } else {
                return false;
            }

        }
        return false;
    }

   

    public getHeaders() {
       let h = new Headers();
       h.append('Authorization', this.tokenData.token_type + ' ' + this.tokenData.access_token);
       return h;
    }

    public getOriginHeaders() {
       let h : Headers = new Headers();
       h.append('Access-Control-Allow-Origin', this.root);
       return h;
    }

    public getToken() {
        return this.tokenData.token_type + ' ' + this.tokenData.access_token;
    }
}
