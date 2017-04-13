import { Component, AfterViewInit, NgZone, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { TdMediaService, TdLoadingService, TdDigitsPipe  } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';
import { ConfigurationService } from '../crmapp/services/configuration.service';

import { Title }     from '@angular/platform-browser';
import { ItemsService, UsersService, ProductsService, AlertsService } from '../../services';
import { multi } from './data';

@Component({
  selector: 'crm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  viewProviders: [ ItemsService, UsersService, ProductsService, AlertsService ],
  providers: [ConfigurationService]
})
export class DashboardComponent implements AfterViewInit, OnInit, OnDestroy  {


  isSmallScreen: boolean = false;

  protected _querySubscriptionxs: Subscription;
  protected _querySubscriptionsm: Subscription;
  protected _querySubscriptionmd: Subscription;
  protected _querySubscriptionlg: Subscription;


  items: Object[];
  users: Object[];
  products: Object[];
  alerts: Object[];

  // Chart
  single: any[];
  multi: any[];

  view: any[] = [700, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Sales';

  colorScheme: any = {
    domain: ['#1565C0', '#2196F3', '#81D4FA', '#FF9800', '#EF6C00'],
  };

  // line, area
  autoScale: boolean = true;

  constructor(private _titleService: Title,
              private _itemsService: ItemsService,
              private _usersService: UsersService,
              private _alertsService: AlertsService,
              private _productsService: ProductsService,
              private _loadingService: TdLoadingService, 
              private _router: Router,
              private _mediaService: TdMediaService,
              private _ngZone: NgZone,
              private _confs: ConfigurationService              ) {
                // Chart
                this.multi = multi.map((group: any) => {
                  group.series = group.series.map((dataItem: any) => {
                    dataItem.name = new Date(dataItem.name);
                    return dataItem;
                  });
                  return group;
                });
  }

  ngAfterViewInit(): void {
    this._titleService.setTitle( 'CRM Salzgitter' );
 
  }



  // ngx transform using covalent digits pipe
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }

  ngOnInit() {
        this.watchScreen();

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
