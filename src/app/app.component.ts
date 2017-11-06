import { Component, NgZone, AfterViewInit, OnInit, OnDestroy, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response, RequestOptions, Http, Headers, URLSearchParams, QueryEncoder  } from '@angular/http';
import { ConfigurationService, ActionsService, TokenService } from './crmapp/services/index';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TdMediaService, TdLoadingService, TdDigitsPipe, IPageChangeEvent  } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';
import {TranslateService} from '@ngx-translate/core';
import { User } from './crmapp/model/allmodels';
import { AuthHelper } from './crmapp/authHelper/authHelper';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'crm-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent   {


  userName: string = 'Test';
  userEmail: string = 'MailTest';

 isSmallScreen: boolean = false;
 protected _querySubscriptionxs: Subscription;
 protected _querySubscriptionsm: Subscription;
 protected _querySubscriptionmd: Subscription;
 protected _querySubscriptionlg: Subscription;
 protected _updateUser: Subscription;

 public updateUserInfo: EventEmitter<any>=new EventEmitter();


  constructor(
              private _router: Router, 
              private _http: Http,
              private _confs: ConfigurationService,
              private _actions: ActionsService,
              private _loadingService: TdLoadingService, 
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private translate: TranslateService,
              private _route: ActivatedRoute, 
              private _token: TokenService,
              private _auth: AuthHelper,
              private _iconRegistry: MatIconRegistry,
              private _domSanitizer: DomSanitizer
) {

          // this language will be used as a fallback when a translation isn't found in the current language
          translate.setDefaultLang('en');
          // the lang to use, if the lang isn't available, it will use the current loader to get them
          translate.use('en');
          
          let t = this._auth;


    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'github',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'covalent-mark',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/covalent-mark.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'teradata-ux',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/teradata-ux.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'appcenter',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/appcenter.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'listener',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/listener.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'querygrid',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/icons/querygrid.svg'));
    this._iconRegistry.addSvgIconInNamespace('assets', 'logocrm',
      this._domSanitizer.bypassSecurityTrustResourceUrl('assets/logo/logocrm.svg'));      

  }


  

}
