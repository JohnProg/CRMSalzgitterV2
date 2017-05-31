import { Component, NgZone, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response, RequestOptions, Http, Headers, URLSearchParams, QueryEncoder  } from '@angular/http';
import { ConfigurationService, ActionsService, TokenService } from '../crmapp/services/index';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TdMediaService, TdLoadingService, TdDigitsPipe, IPageChangeEvent  } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';
import {TranslateService} from '@ngx-translate/core';
import { OneDriveAuth } from '../crmapp/onedriveapi/index';
import { User } from '../crmapp/model/allmodels';


@Component({
  selector: 'crm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],

})
export class MainComponent implements AfterViewInit, OnInit, OnDestroy {



  isSmallScreen: boolean = false;

  protected _querySubscriptionxs: Subscription;
  protected _querySubscriptionsm: Subscription;
  protected _querySubscriptionmd: Subscription;
  protected _querySubscriptionlg: Subscription;
  
  _routeList: BehaviorSubject<Object[]>;

  routes: Observable<Object[]>;
  userName: string = 'test';
  userEmail: string = 'test';
  constructor(private _router: Router, 
              private _http: Http,
              private _confs: ConfigurationService,
              private _actions: ActionsService,
              private _loadingService: TdLoadingService, 
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private translate: TranslateService,
              private _oauth: OneDriveAuth,
              private _route: ActivatedRoute, 
              private _token: TokenService) {
        // this language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      translate.use('en');
      this._routeList = <BehaviorSubject<Object[]>>new BehaviorSubject([]);
      this.routes = this._routeList.asObservable();
      this._actions.userInfoEvent.subscribe((user: User) => {
        this.userName = user.LastName;
        this.userEmail = user.FirstName;
      });

    }

  logout(): void {
    this._token.signout();
    this._router.navigate(['/login']);
  }


  ngOnInit() {
      this.watchScreen();
  }


  ngAfterViewInit() {

    let h : Headers = new Headers();
    h.append('Access-Control-Allow-Origin', this._confs.root);
    this._http.get(this._confs.appBase + 'data/crm-menu.json', { headers: h })
    .map((response) => response.json()).subscribe((result) => {
      this._routeList.next(result);
    }, (error) => {
        debugger
    });
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
          this._confs.pageSize = 5;
          this._confs.currentPage = 0;
          this._actions._screenSizeChangeEvent.next( ( <IPageChangeEvent>{ page: 1, pageSize: 5, maxPage: 0 }) );

          // this.change(undefined);
        }
      });
    });

    this._querySubscriptionsm = this._mediaService.registerQuery('sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isSmallScreen = matches;

        if (matches === true) {
          this._confs.pageSize = 8;
          this._confs.currentPage = 0;
          this._actions._screenSizeChangeEvent.next( ( <IPageChangeEvent>{ page: 1, pageSize: 8, maxPage: 0 }) );

          // this.change(undefined);
        }

      });
    });

    this._querySubscriptionmd = this._mediaService.registerQuery('md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isSmallScreen = matches;

        if (matches === true) {
          this._confs.pageSize = 10;
          this._confs.currentPage = 0;          
          this._actions._screenSizeChangeEvent.next( ( <IPageChangeEvent>{ page: 1, pageSize: 13, maxPage: 0 }) );

          //this.change(undefined);
        }

      });
    });


    this._querySubscriptionlg = this._mediaService.registerQuery('lg').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isSmallScreen = matches;
        if (matches === true) {
          this._confs.pageSize = 13;
          this._confs.currentPage = 0;          
          this._actions._screenSizeChangeEvent.next( ( <IPageChangeEvent>{ page: 1, pageSize: 10, maxPage: 0 }) );

        }
      });
    });
  }

  signIn() {
    this._oauth.login();
  }

  checkLogin() {
    alert(this._oauth.token);
  }
}
