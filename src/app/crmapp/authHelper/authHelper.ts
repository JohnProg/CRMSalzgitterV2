import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Response, Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { ConfigurationService, OnedrivegraphService } from '../services/index';
import { ActionsService } from '../services/actions.services';
import * as moment from 'moment';


@Injectable()
export class AuthHelper {


	//function to parse the url query string
	private parseQueryString = function(url) {
		
		var params = {}, queryString = url.substring(1),
		regex = /([^&=]+)=([^&]*)/g, m;
		while (m = regex.exec(queryString)) {
			params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
		}
		return params;
	}
	private params = this.parseQueryString(location.hash);
	private options: RequestOptions;

	constructor( public route: ActivatedRoute, public _http: Http,
	private _confs: ConfigurationService,
	public _actions: ActionsService,
	public _router: Router,
     public _one: OnedrivegraphService) {
	
		let tk = localStorage.getItem('oneDriveToken');
		if(tk != null) {
			let access_token = JSON.parse(tk);
			this._confs.oneDriveToken = access_token;
		}
		
		if (this.params["access_token"] != null) {
		    
			let access_token = this.params;
			access_token['expedition_date'] = moment();
			access_token['expire_date'] = moment().add(access_token['expires_in'], 'seconds');
			this._confs.oneDriveToken = access_token;
			localStorage.setItem('oneDriveToken', JSON.stringify(access_token));
			let redirect = localStorage.getItem('relocateWhenToken');
			
			this._one.initOneDrive();
			if( redirect != null) {
				localStorage.removeItem('relocateWhenToken');
			   this._router.navigate( [ redirect ] );
			   
			} else {
				this._router.navigate([ '/' ]);
			}
		}
	}
	
	login() {
		
		 localStorage.setItem('relocateWhenToken', this._router.url);
		// window.location.href = 'https://login.live.com/oauth20_authorize.srf?client_id=' +
		// encodeURIComponent(environment._clientId) + '&response_type=token&redirect_uri=' + 
		// encodeURIComponent(environment._redirectUrl) + '&scope=' + environment._scopes;
	   window.location.href = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?response_mode=fragment&nonce=CRMSalzgitterV2Dev&client_id=' +
	   environment._clientId  + '&response_type=id_token token&redirect_uri=' +
	   encodeURIComponent(environment._redirectUrl) + '&scope=' + environment._scopes;


	}

}
