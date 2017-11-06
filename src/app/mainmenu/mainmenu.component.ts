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
import { environment } from '../../environments/environment';

@Component({
  selector: 'crm-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements AfterViewInit, OnInit, OnDestroy {


  rtObject: any = [
    {
      title: "HOME.MENU.CATALOGS.DISPLAYNAME",
      route: "/catalogs",
      icon: "euro_symbol",
      childrens: [
        {
          name: "currency",
          tooltip: "HOME.MENU.CATALOGS.CURRENCY.TOOLTIP",
          active: "true",
          routerlink: "currency",
          icon: "attach_money",
          displayName: "HOME.MENU.CATALOGS.CURRENCY.DISPLAYNAME"
        },
        {
          "name": "colonytype",
          "tooltip": "HOME.MENU.CATALOGS.COLONYTYPE.TOOLTIP",
          "active": "true",
          "routerlink": "colonytype",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.COLONYTYPE.DISPLAYNAME"
        },
        {
          "name": "country",
          "tooltip": "HOME.MENU.CATALOGS.COUNTRY.TOOLTIP",
          "active": "true",
          "routerlink": "country",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.COUNTRY.DISPLAYNAME"
        },
        {
          "name": "department",
          "tooltip": "HOME.MENU.CATALOGS.DEPARTMENT.TOOLTIP",
          "active": "true",
          "routerlink": "department",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.DEPARTMENT.DISPLAYNAME"
        },
        {
          "name": "documenttype",
          "tooltip": "HOME.MENU.CATALOGS.DOCUMENTTYPE.TOOLTIP",
          "active": "true",
          "routerlink": "documenttype",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.DOCUMENTTYPE.DISPLAYNAME"
        },
        {
          "name": "family",
          "tooltip": "HOME.MENU.CATALOGS.FAMILY.TOOLTIP",
          "active": "true",
          "routerlink": "family",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.FAMILY.DISPLAYNAME"
        },
        {
          "name": "linerterm",
          "tooltip": "HOME.MENU.CATALOGS.LINERTERM.TOOLTIP",
          "active": "true",
          "routerlink": "linerterm",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.LINERTERM.DISPLAYNAME"
        },
        {
          "name": "market",
          "tooltip": "HOME.MENU.CATALOGS.MARKET.TOOLTIP",
          "active": "true",
          "routerlink": "market",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.MARKET.DISPLAYNAME"
        },
        {
          "name": "mill",
          "tooltip": "HOME.MENU.CATALOGS.MILL.TOOLTIP",
          "active": "true",
          "routerlink": "mill",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.MILL.DISPLAYNAME"
        },
        {
          "name": "organization",
          "tooltip": "HOME.MENU.CATALOGS.ORGANIZATION.TOOLTIP",
          "active": "true",
          "routerlink": "organization",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.ORGANIZATION.DISPLAYNAME"
        },
        {
          "name": "paymentterm",
          "tooltip": "HOME.MENU.CATALOGS.PAYMENTTERM.TOOLTIP",
          "active": "true",
          "routerlink": "paymentterm",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.PAYMENTTERM.DISPLAYNAME"
        },
        {
          "name": "port",
          "tooltip": "HOME.MENU.CATALOGS.PORT.TOOLTIP",
          "active": "true",
          "routerlink": "port",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.PORT.DISPLAYNAME"
        },
        {
          "name": "position",
          "tooltip": "HOME.MENU.CATALOGS.POSITION.TOOLTIP",
          "active": "true",
          "routerlink": "position",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.POSITION.DISPLAYNAME"
        },
        {
          "name": "sector",
          "tooltip": "HOME.MENU.CATALOGS.SECTOR.TOOLTIP",
          "active": "true",
          "routerlink": "sector",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.SECTOR.DISPLAYNAME"
        },
        {
          "name": "tender",
          "tooltip": "HOME.MENU.CATALOGS.TENDER.TOOLTIP",
          "active": "true",
          "routerlink": "tender",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.TENDER.DISPLAYNAME"
        },
        {
          "name": "transactionflow",
          "tooltip": "HOME.MENU.CATALOGS.TRANSACTIONFLOW.TOOLTIP",
          "active": "true",
          "routerlink": "transactionflow",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.TRANSACTIONFLOW.DISPLAYNAME"
        },
        {
          "name": "templateemail",
          "tooltip": "HOME.MENU.CATALOGS.TEMPLATEEMAIL.TOOLTIP",
          "active": "true",
          "routerlink": "templateemail",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.TEMPLATEEMAIL.DISPLAYNAME"
        },
        {
          "name": "typeopportunity",
          "tooltip": "HOME.MENU.CATALOGS.TYPEOPPORTUNITY.TOOLTIP",
          "active": "true",
          "routerlink": "typeopportunity",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.TYPEOPPORTUNITY.DISPLAYNAME"
        },
        {
          "name": "status",
          "tooltip": "HOME.MENU.CATALOGS.STATUS.TOOLTIP",
          "active": "true",
          "routerlink": "status",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.STATUS.DISPLAYNAME"
        },
        {
          "name": "properties",
          "tooltip": "HOME.MENU.CATALOGS.PROPERTY.TOOLTIP",
          "active": "true",
          "routerlink": "properties",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.CATALOGS.PROPERTY.DISPLAYNAME"
        }
      ]

    },
    {
      "title": "HOME.MENU.OPTIONS.DISPLAYNAME",
      "route": "/options",
      "icon": "euro_symbol",
      "childrens": [
        {
          "name": "customer",
          "tooltip": "HOME.MENU.OPTIONS.CUSTOMER.TOOLTIP",
          "active": "true",
          "routerlink": "customer",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.OPTIONS.CUSTOMER.DISPLAYNAME"
        },
        {
          "name": "products",
          "tooltip": "HOME.MENU.OPTIONS.PRODUCT.TOOLTIP",
          "active": "true",
          "routerlink": "products",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.OPTIONS.PRODUCT.DISPLAYNAME"
        },
        {
          "name": "company",
          "tooltip": "HOME.MENU.OPTIONS.COMPANY.TOOLTIP",
          "active": "true",
          "routerlink": "company",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.OPTIONS.COMPANY.DISPLAYNAME"
        },
        {
          "name": "actionopp",
          "tooltip": "HOME.MENU.OPTIONS.ACTIONOPP.TOOLTIP",
          "active": "true",
          "routerlink": "actionopp",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.OPTIONS.ACTIONOPP.DISPLAYNAME"
        },
        {
          "name": "doctype",
          "tooltip": "HOME.MENU.OPTIONS.DOCTYPE.TOOLTIP",
          "active": "true",
          "routerlink": "doctype",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.OPTIONS.DOCTYPE.DISPLAYNAME"
        }
      ]
    },

    {
      "title": "HOME.MENU.OPPORTUNITY.DISPLAYNAME",
      "icon": "euro_symbol",
      "route": "",
      "childrens": [
        {
          "name": "index",
          "tooltip": "HOME.MENU.OPPORTUNITY.OPPORTUNITY.TOOLTIP",
          "active": "true",
          "routerlink": "opportunity",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.OPPORTUNITY.OPPORTUNITY.DISPLAYNAME"
        },
        {
          "name": "index",
          "tooltip": "HOME.MENU.QUOTATIONFROMSUPPLIER.TOOLTIP",
          "active": "true",
          "routerlink": "quotationfromsupplier",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.QUOTATIONFROMSUPPLIER.DISPLAYNAME"
        },
        {
          "name": "index",
          "tooltip": "HOME.MENU.QUOTATIONTOCUSTOMER.TOOLTIP",
          "active": "true",
          "routerlink": "quotationtocustomer",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.QUOTATIONTOCUSTOMER.DISPLAYNAME"
        },
        {
          "name": "index",
          "tooltip": "HOME.MENU.PURCHASEORDER.TOOLTIP",
          "active": "true",
          "routerlink": "purchaseorder",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.PURCHASEORDER.DISPLAYNAME"
        },
        {
          "name": "index",
          "tooltip": "HOME.MENU.SHIPPING.TOOLTIP",
          "active": "true",
          "routerlink": "shipping",
          "icon": "euro_symbol",
          "displayName": "HOME.MENU.SHIPPING.DISPLAYNAME"
        }
      ]
    }
  ];

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
    this._routeList.next(this.rtObject);
    // let h: Headers = new Headers();
    // h.append('Access-Control-Allow-Origin', this._confs.root);
    
    // this._http.get(environment.baseHref+ 'data/crm-menu.json', { headers: h })
    //   .map((response) => response.json()).subscribe((result) => {
    //     this._routeList.next(result);
    //   }, (error) => {
    //     debugger
    //   });
  }


  ngOnDestroy() {
    if (this.userSubscription !== undefined) { this.userSubscription.unsubscribe(); }
  }

  logout(): void {
    this._token.signout();
    this._router.navigate(['/login']);
  }



}
