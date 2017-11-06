import { Component, AfterViewInit, NgZone, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationService, TokenService } from '../crmapp/services/index';
import { TdMediaService, TdLoadingService, TdDigitsPipe  } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

import { Title }     from '@angular/platform-browser';
import { AuthHelper } from '../crmapp/authHelper/authHelper';
import { ActionsService } from '../crmapp/services/actions.services';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  TCRMEntity, QueryResponse, DashboardData, GetSimpleChartFromResponsible_Result } from '../crmapp/model/index';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const dashQL = gql`
query 
getDashboard($idresponsible: Int!)
{
  getSimpleDashboard(idresponsible: $idresponsible) { 
     name value 
  }
  getStatusDashboard(idresponsible: $idresponsible) { 
    name maxScale series { name value }
  }
}
`;


@Component({
  selector: 'crm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  viewProviders: [  ],
  providers: []
})
export class DashboardComponent implements AfterViewInit  {
 
  // Simple Chart
  _single: BehaviorSubject<any>;
  single: Observable<any>;
  
  _byStatus: BehaviorSubject<any>;
  byStatus: Observable<any>;
  statusScale: number = 10;
  colorScheme: any = {
    domain: ['#1565C0', '#03A9F4', '#FFA726', '#FFCC80', '#FB8C00'],
  };

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Sales';
    // line, area
    autoScale: boolean = true;


  constructor(private _titleService: Title,
          private _router: Router,
        private _route: ActivatedRoute,
        private _token: TokenService,
              private _confs: ConfigurationService,
            private _auth: AuthHelper,
            public _actions: ActionsService,
            public apollo: Apollo ) {
        this._single = <BehaviorSubject<any>>new BehaviorSubject([]);
        this.single = this._single.asObservable();


        this._byStatus = <BehaviorSubject<any>>new BehaviorSubject([]);
        this.byStatus = this._byStatus.asObservable();
  }



  ngAfterViewInit(): void {
    this._actions.updateTitle( 'CRM Dashboard' );
    this._actions.showAdd(false);
    this._actions.showCancel(false);
    this._actions.showSearch(false);

    
    this.apollo.watchQuery<QueryResponse>({
      query: dashQL,
      variables:  { idresponsible: 4 }
    }).subscribe(({data}) => {
      
      //let dash = (<DashboardData>data['getDashboard']);
      this._single.next( data['getSimpleDashboard']);

      let st = data['getStatusDashboard'];
      this.statusScale = st['maxScale'];

      this._byStatus.next(st);


    }, (error: Error) => {
      //this._loadingService.resolve('');
    }
    );   
   
 
  }


}
