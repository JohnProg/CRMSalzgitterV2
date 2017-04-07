import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TdMediaService } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';
import { ConfigurationService } from '../crmapp/services/configuration.service';

@Component({
  selector: 'crm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [ConfigurationService],
})
export class MainComponent implements OnInit, OnDestroy {

  isSmallScreen: boolean = false;

  protected _querySubscriptionxs: Subscription;
  protected _querySubscriptionsm: Subscription;
  protected _querySubscriptionmd: Subscription;
  protected _querySubscriptionlg: Subscription;


  routes: Object[] = [

/*    {
      title: 'Dashboard',
      route: '/',
      icon: 'dashboard',
    }, {
      title: 'Product Dashboard',
      route: '/product',
      icon: 'view_quilt',
    }, {
      title: 'Product Logs',
      route: '/logs',
      icon: 'receipt',
    }, {
      title: 'Manage Users',
      route: '/users',
      icon: 'people',
    }, {
      title: 'Covalent Templates',
      route: '/templates',
      icon: 'view_module',
    },*/

      {
        title: 'Catalogs',
        route: '/catalogs',
        icon: 'euro_symbol',
        childrens: [
          {
                name: 'currency',
                tooltip: 'Create edit Currencies',
                active: true,
                routerlink: 'currency',
                icon: 'euro_symbol',
                displayName: 'Currency',
              },
              {
                name: 'colonytype',
                tooltip: 'Create edit Colonies Type',
                active: true,
                routerlink: 'colonytype',
                icon: 'euro_symbol',
                displayName: 'Colony Type',
              },
              {
                name: 'country',
                tooltip: 'Create edit Countries',
                active: true,
                routerlink: 'country',
                icon: 'euro_symbol',
                displayName: 'Countries',
              },
              {
                name: 'department',
                tooltip: 'Create edit Departments',
                active: true,
                routerlink: 'department',
                icon: 'euro_symbol',
                displayName: 'Departments',
              },
              {
                name: 'documenttype',
                tooltip: 'Create edit Document Type',
                active: true,
                routerlink: 'documenttype',
                icon: 'euro_symbol',
                displayName: 'Document Type',
              },
              {
                name: 'family',
                tooltip: 'Create edit Families',
                active: true,
                routerlink: 'family',
                icon: 'euro_symbol',
                displayName: 'Families',
              }, 
              {
                name: 'linerterm',
                tooltip: 'Create edit Liner Term',
                active: true,
                routerlink: 'linerterm',
                icon: 'euro_symbol',
                displayName: 'Liner Term',
              }, 
              {
                name: 'market',
                tooltip: 'Create edit Market',
                active: true,
                routerlink: 'market',
                icon: 'euro_symbol',
                displayName: 'Market',
              },   
              {
                name: 'mill',
                tooltip: 'Create edit Mills',
                active: true,
                routerlink: 'mill',
                icon: 'euro_symbol',
                displayName: 'Mills',
              }, 
              {
                name: 'organization',
                tooltip: 'Create edit Organization',
                active: true,
                routerlink: 'organization',
                icon: 'euro_symbol',
                displayName: 'Organization',
              }, 
              {
                name: 'paymentterm',
                tooltip: 'Create edit Payment Term',
                active: true,
                routerlink: 'paymentterm',
                icon: 'euro_symbol',
                displayName: 'Payment Term',
              }, 
              {
                name: 'port',
                tooltip: 'Create edit Port',
                active: true,
                routerlink: 'port',
                icon: 'euro_symbol',
                displayName: 'Port',
              }, 
              {
                name: 'position',
                tooltip: 'Create edit Position',
                active: true,
                routerlink: 'position',
                icon: 'euro_symbol',
                displayName: 'Position',
              }, 
              {
                name: 'sector',
                tooltip: 'Create edit Sector',
                active: true,
                routerlink: 'sector',
                icon: 'euro_symbol',
                displayName: 'Sector',
              }, 
              {
                name: 'tender',
                tooltip: 'Create edit Tender',
                active: true,
                routerlink: 'tender',
                icon: 'euro_symbol',
                displayName: 'Tender',
              },      

      ],

    },
    {
      title: 'Options',
      route: '/options',
      icon: 'euro_symbol',
      childrens: [
          {
            name: 'products',
            tooltip: 'Create edit Product',
            active: true,
            routerlink: 'products',
            icon: 'euro_symbol',
            displayName: 'Product',
          },
          {
            name: 'company',
            tooltip: 'Create edit Company',
            active: true,
            routerlink: 'company',
            icon: 'euro_symbol',
            displayName: 'Company',
          },        
      ]
    },

    {
      title: 'Opportunity',
      icon: 'euro_symbol',
      route: '',
      childrens: [
          {
            name: 'index',
            tooltip: 'Create edit Opportunity',
            active: true,
            routerlink: 'opportunity',
            icon: 'euro_symbol',
            displayName: 'Opportunity',
          },
      ]
    },
  ];

  constructor(private _router: Router,
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private _confs: ConfigurationService) {
    this.watchScreen();
              }

  logout(): void {
    this._router.navigate(['/login']);

  }



  ngOnInit() {
    

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
          //this.change(undefined);
        }

      });
    });


    this._querySubscriptionlg = this._mediaService.registerQuery('gt-md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isSmallScreen = matches;
        if (matches === true) {
          
          this._confs.pageSize = 13;
          this._confs.currentPage = 0;
        }

      });
    });


  }
}
