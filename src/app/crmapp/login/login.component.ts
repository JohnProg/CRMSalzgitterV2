import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TdLoadingService } from '@covalent/core/loading';
import { TokenService, ConfigurationService } from '../services/index';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  username: string;
  password: string;
  loginError: boolean = false;
  errorMessage: string;
  layoutColor: string;
  constructor(private _router: Router,
              private _loadingService: TdLoadingService,
              private _token: TokenService,
              private _confs: ConfigurationService) {
               
    this.layoutColor = environment.layoutColor;

  }

  

  login(): void {
    this._loadingService.register();

    this._token.login(this.username, this.password)
    .subscribe( (res: any) => {
       this._confs.tokenData = res;

       this._router.navigate(['/']);
       this._loadingService.resolve();
       this._token.getUserInfo();
       this.store(res);
     }, (error: any) => {
       let res = error.json();
       this.errorMessage = res.error_description;
       this.loginError = true;
       this._loadingService.resolve();
     });
  }


    /** 
   * Stores access token & refresh token. 
   * 
   * @param body The response of the request to the token endpoint 
   */  
  private store(body: any): void {  
      // Stores access token in local storage to keep user signed in.  
      localStorage.setItem('tokendata', JSON.stringify(body));  
      // Decodes the token.  
      //this.decodeToken();  
  } 
}
