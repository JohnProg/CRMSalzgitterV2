import { Component, NgZone, AfterViewInit, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response, RequestOptions, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { ConfigurationService, ActionsService, TokenService } from '../crmapp/services/index';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TdMediaService  } from '@covalent/core/media';
import {  TdLoadingService } from '@covalent/core/loading';
import {   TdDigitsPipe, IPageChangeEvent } from '@covalent/core';



import { Subscription } from 'rxjs/Subscription';
import { User } from '../crmapp/model/allmodels';
import { AuthHelper } from '../crmapp/authHelper/authHelper';
import { ICRMPageChangeEvent } from '../crmapp/extensions';


@Component({
  selector: 'crm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements AfterViewInit, OnInit, OnDestroy {

  userName: string;
  userEmail: string;

  isSmallScreen: boolean = false;

  protected _querySubscriptionxs: Subscription;
  protected _querySubscriptionsm: Subscription;
  protected _querySubscriptionmd: Subscription;
  protected _querySubscriptionlg: Subscription;


  constructor(private _router: Router,
    private _http: Http,
    private _confs: ConfigurationService,
    private _actions: ActionsService,
    private _mediaService: TdMediaService,
    private _ngZone: NgZone,
    private _route: ActivatedRoute,
    private _token: TokenService,
    private _auth: AuthHelper) {
    let t = this._auth;
  }

  logout(): void {
    this._token.signout();
    this._router.navigate(['/login']);
  }


  ngOnInit() {
    this.setUserInfo();
    this.watchScreen();
  }

  setUserInfo() {
    if (this._confs.userInfo) {
      this.userName = this._confs.userInfo.name;
      this.userEmail = this._confs.userInfo.eMail;
    }
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    if (this._querySubscriptionxs !== undefined) { this._querySubscriptionxs.unsubscribe(); }
    if (this._querySubscriptionsm !== undefined) { this._querySubscriptionsm.unsubscribe(); }
    if (this._querySubscriptionmd !== undefined) { this._querySubscriptionmd.unsubscribe(); }
    if (this._querySubscriptionlg !== undefined) { this._querySubscriptionlg.unsubscribe(); }
  }


  checkScreen(): void {

    this._ngZone.run(() => {
      this.isSmallScreen = this._mediaService.query('sm'); // or '(min-width: 960px) and (max-width: 1279px)'
    });
  }

  watchScreen(): void {

    this._querySubscriptionxs = this._mediaService.registerQuery('xs').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isSmallScreen = matches;
        if (matches === true) {
          this._confs._pageSize.next(5);
          this._confs.currentPage = 0;
          this._actions._screenSizeChangeEvent.next((<ICRMPageChangeEvent>{ screenSize: 'xs', page: 1, pageSize: 5, maxPage: 0 }));

          // this.change(undefined);
        }
      });
    });

    this._querySubscriptionsm = this._mediaService.registerQuery('sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isSmallScreen = matches;

        if (matches === true) {
          this._confs._pageSize.next(8);
          this._confs.currentPage = 0;
          this._actions._screenSizeChangeEvent.next((<ICRMPageChangeEvent>{ screenSize: 'sm', page: 1, pageSize: 8, maxPage: 0 }));

          // this.change(undefined);
        }

      });
    });

    this._querySubscriptionmd = this._mediaService.registerQuery('md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isSmallScreen = matches;

        if (matches === true) {
          this._confs._pageSize.next(10);
          this._confs.currentPage = 0;
          this._actions._screenSizeChangeEvent.next((<ICRMPageChangeEvent>{ screenSize: 'md', page: 1, pageSize: 13, maxPage: 0 }));

          //this.change(undefined);
        }

      });
    });


    this._querySubscriptionlg = this._mediaService.registerQuery('lg').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isSmallScreen = matches;
        if (matches === true) {
          this._confs._pageSize.next(10);
          this._confs.currentPage = 0;
          this._actions._screenSizeChangeEvent.next((<ICRMPageChangeEvent>{ screenSize: 'lg', page: 1, pageSize: 10, maxPage: 0 }));

        }
      });
    });
  }
}
