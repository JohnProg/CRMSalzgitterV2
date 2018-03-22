import { Component, NgZone, AfterViewInit, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Response, RequestOptions, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { ConfigurationService, ActionsService, TokenService } from '../../services/index';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TdMediaService  } from '@covalent/core/media';


import { Subscription } from 'rxjs/Subscription';
import { User } from '../../model/allmodels';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'crm-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.scss']
})
export class MainmenuComponent implements AfterViewInit, OnInit, OnDestroy {


  rtObject: any = [
    {
      title: "Catalogs",
      route: "/catalogs",
      icon: "euro_symbol",
      childrens: [
        {
          name: "currency",
          tooltip: "Edit and create Currencies",
          active: "true",
          routerlink: "currency",
          icon: "attach_money",
          displayName: "Currencies"
        },
        {
          "name": "colonytype",
          "tooltip": "Edit and create Colony Types",
          "active": "true",
          "routerlink": "colonytype",
          "icon": "euro_symbol",
          "displayName": "Colony Type"
        },
        {
          "name": "country",
          "tooltip": "Edit and create Countries",
          "active": "true",
          "routerlink": "country",
          "icon": "euro_symbol",
          "displayName": "Countries"
        },
        {
          "name": "department",
          "tooltip": "HOME.MENU.CATALOGS.DEPARTMENT.TOOLTIP",
          "active": "true",
          "routerlink": "department",
          "icon": "euro_symbol",
          "displayName": "Departments"
        },
        {
          "name": "documenttype",
          "tooltip": "HOME.MENU.CATALOGS.DOCUMENTTYPE.TOOLTIP",
          "active": "true",
          "routerlink": "documenttype",
          "icon": "euro_symbol",
          "displayName": "Document Types"
        },
        {
          "name": "family",
          "tooltip": "HOME.MENU.CATALOGS.FAMILY.TOOLTIP",
          "active": "true",
          "routerlink": "family",
          "icon": "euro_symbol",
          "displayName": "Families"
        },
        {
          "name": "linerterm",
          "tooltip": "HOME.MENU.CATALOGS.LINERTERM.TOOLTIP",
          "active": "true",
          "routerlink": "linerterm",
          "icon": "euro_symbol",
          "displayName": "LinerTerms"
        },
        {
          "name": "market",
          "tooltip": "HOME.MENU.CATALOGS.MARKET.TOOLTIP",
          "active": "true",
          "routerlink": "market",
          "icon": "euro_symbol",
          "displayName": "Markets"
        },
        {
          "name": "mill",
          "tooltip": "HOME.MENU.CATALOGS.MILL.TOOLTIP",
          "active": "true",
          "routerlink": "mill",
          "icon": "euro_symbol",
          "displayName": "Mills"
        },
        {
          "name": "organization",
          "tooltip": "HOME.MENU.CATALOGS.ORGANIZATION.TOOLTIP",
          "active": "true",
          "routerlink": "organization",
          "icon": "euro_symbol",
          "displayName": "Organizations"
        },
        {
          "name": "paymentterm",
          "tooltip": "HOME.MENU.CATALOGS.PAYMENTTERM.TOOLTIP",
          "active": "true",
          "routerlink": "paymentterm",
          "icon": "euro_symbol",
          "displayName": "Payment terms"
        },
        {
          "name": "port",
          "tooltip": "HOME.MENU.CATALOGS.PORT.TOOLTIP",
          "active": "true",
          "routerlink": "port",
          "icon": "euro_symbol",
          "displayName": "Ports"
        },
        {
          "name": "position",
          "tooltip": "HOME.MENU.CATALOGS.POSITION.TOOLTIP",
          "active": "true",
          "routerlink": "position",
          "icon": "euro_symbol",
          "displayName": "Positions"
        },
        {
          "name": "sector",
          "tooltip": "HOME.MENU.CATALOGS.SECTOR.TOOLTIP",
          "active": "true",
          "routerlink": "sector",
          "icon": "euro_symbol",
          "displayName": "Sctors"
        },
        {
          "name": "tender",
          "tooltip": "HOME.MENU.CATALOGS.TENDER.TOOLTIP",
          "active": "true",
          "routerlink": "tender",
          "icon": "euro_symbol",
          "displayName": "Tenders"
        },
        {
          "name": "transactionflow",
          "tooltip": "HOME.MENU.CATALOGS.TRANSACTIONFLOW.TOOLTIP",
          "active": "true",
          "routerlink": "transactionflow",
          "icon": "euro_symbol",
          "displayName": "Transcation Flow"
        },
        {
          "name": "templateemail",
          "tooltip": "HOME.MENU.CATALOGS.TEMPLATEEMAIL.TOOLTIP",
          "active": "true",
          "routerlink": "templateemail",
          "icon": "euro_symbol",
          "displayName": "E-Mail Templates"
        },
        {
          "name": "typeopportunity",
          "tooltip": "HOME.MENU.CATALOGS.TYPEOPPORTUNITY.TOOLTIP",
          "active": "true",
          "routerlink": "typeopportunity",
          "icon": "euro_symbol",
          "displayName": "Opportunity types"
        },
        {
          "name": "status",
          "tooltip": "HOME.MENU.CATALOGS.STATUS.TOOLTIP",
          "active": "true",
          "routerlink": "status",
          "icon": "euro_symbol",
          "displayName": "Status"
        },
        {
          "name": "properties",
          "tooltip": "HOME.MENU.CATALOGS.PROPERTY.TOOLTIP",
          "active": "true",
          "routerlink": "properties",
          "icon": "euro_symbol",
          "displayName": "Properties"
        }
      ]

    },
    {
      "title": "Options",
      "route": "/options",
      "icon": "euro_symbol",
      "childrens": [
        {
          "name": "customer",
          "tooltip": "HOME.MENU.OPTIONS.CUSTOMER.TOOLTIP",
          "active": "true",
          "routerlink": "customer",
          "icon": "euro_symbol",
          "displayName": "Customer"
        },
        {
          "name": "products",
          "tooltip": "HOME.MENU.OPTIONS.PRODUCT.TOOLTIP",
          "active": "true",
          "routerlink": "products",
          "icon": "euro_symbol",
          "displayName": "Products"
        },
        {
          "name": "company",
          "tooltip": "HOME.MENU.OPTIONS.COMPANY.TOOLTIP",
          "active": "true",
          "routerlink": "company",
          "icon": "euro_symbol",
          "displayName": "Company"
        },
        {
          "name": "actionopp",
          "tooltip": "HOME.MENU.OPTIONS.ACTIONOPP.TOOLTIP",
          "active": "true",
          "routerlink": "actionopp",
          "icon": "euro_symbol",
          "displayName": "Opportunity Action"
        },
        {
          "name": "doctype",
          "tooltip": "HOME.MENU.OPTIONS.DOCTYPE.TOOLTIP",
          "active": "true",
          "routerlink": "doctype",
          "icon": "euro_symbol",
          "displayName": "Document Type"
        }
      ]
    },

    {
      "title": "Opportunity",
      "icon": "euro_symbol",
      "route": "",
      "childrens": [
        {
          "name": "index",
          "tooltip": "HOME.MENU.OPPORTUNITY.OPPORTUNITY.TOOLTIP",
          "active": "true",
          "routerlink": "opportunity",
          "icon": "euro_symbol",
          "displayName": "Opportunity"
        },
        {
          "name": "index",
          "tooltip": "HOME.MENU.QUOTATIONFROMSUPPLIER.TOOLTIP",
          "active": "true",
          "routerlink": "quotationfromsupplier",
          "icon": "euro_symbol",
          "displayName": "Quotation from supplier"
        },
        {
          "name": "index",
          "tooltip": "HOME.MENU.QUOTATIONTOCUSTOMER.TOOLTIP",
          "active": "true",
          "routerlink": "quotationtocustomer",
          "icon": "euro_symbol",
          "displayName": "Quotation to customer"
        },
        {
          "name": "index",
          "tooltip": "HOME.MENU.PURCHASEORDER.TOOLTIP",
          "active": "true",
          "routerlink": "purchaseorder",
          "icon": "euro_symbol",
          "displayName": "Purchase Order"
        },
        {
          "name": "index",
          "tooltip": "HOME.MENU.SHIPPING.TOOLTIP",
          "active": "true",
          "routerlink": "shipping",
          "icon": "euro_symbol",
          "displayName": "Shipping"
        }
      ]
    }
  ];

  _routeList: BehaviorSubject<Object[]> = <BehaviorSubject<Object[]>>new BehaviorSubject([]);
  routes: Observable<Object[]> = this._routeList.asObservable();
  userName: string;
  userEmail: string;

  userSubscription: Subscription;
  constructor(private _router: Router,
    private _http: Http,
    private _confs: ConfigurationService,
    private _actions: ActionsService,
    private _mediaService: TdMediaService,
    private _ngZone: NgZone,
    private _route: ActivatedRoute,
    private _token: TokenService
  ) {   
  }

  ngOnInit() {
    this._routeList.next(this.rtObject);
  }



  ngAfterViewInit() {
    
   
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
