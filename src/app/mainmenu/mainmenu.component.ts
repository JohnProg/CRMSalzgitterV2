import { Component, NgZone, AfterViewInit, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response, RequestOptions, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { ConfigurationService, ActionsService, TokenService } from '../crmapp/services/index';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TdMediaService, TdLoadingService, TdDigitsPipe, IPageChangeEvent } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';
import { User } from '../crmapp/model/allmodels';


@Component({
  selector: 'crm-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements AfterViewInit, OnInit, OnDestroy {


  _routeList: BehaviorSubject<Object[]>;

  routes: Observable<Object[]>;
  userName: string;
  userEmail: string;

  userSubscription: Subscription;
  constructor(private _router: Router,
    private _http: Http,
    private _confs: ConfigurationService,
    private _actions: ActionsService,
    private _loadingService: TdLoadingService,
    private _mediaService: TdMediaService,
    private _ngZone: NgZone,
    private translate: TranslateService,
    private _route: ActivatedRoute,
    private _token: TokenService
  ) {
    this._routeList = <BehaviorSubject<Object[]>>new BehaviorSubject([]);
    this.routes = this._routeList.asObservable();

  }

  ngOnInit() {

  }



  ngAfterViewInit() {

    let h: Headers = new Headers();
    h.append('Access-Control-Allow-Origin', this._confs.root);
    
    this._http.get(this._confs.appBase + 'data/crm-menu.json', { headers: h })
      .map((response) => response.json()).subscribe((result) => {
        this._routeList.next(result);
      }, (error) => {
        debugger
      });
  }


  ngOnDestroy() {
    if (this.userSubscription !== undefined) { this.userSubscription.unsubscribe(); }
  }

  logout(): void {
    this._token.signout();
    this._router.navigate(['/login']);
  }


}
