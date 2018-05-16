import { Component, AfterViewInit, NgZone, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationService, TokenService, SharedataService } from '../crmapp/services/index';
import { TdMediaService, TdLoadingService, TdDigitsPipe  } from '@covalent/core';
import { Subscription ,  Observable ,  BehaviorSubject } from 'rxjs';

import { Title }     from '@angular/platform-browser';
import { AuthHelper } from '../crmapp/authHelper/authHelper';
import { ActionsService } from '../crmapp/services/actions.services';
import { ApolloClient } from 'apollo-client';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import {map} from 'rxjs/operators';


import {  TCRMEntity, QueryResponse, DashboardData, GetSimpleChartFromResponsible_Result, Opportunity, GetBaseQuote_Result } from '../crmapp/model/index';
import { debug } from 'util';
import { environment } from '../../environments/environment';

export const dashQL = gql`
query 
getDashboard($idresponsible: Int!)
{
  getSimpleDashboard(idresponsible: $idresponsible) { 
     name value  idDocType
  }
  getStatusDashboard(idresponsible: $idresponsible) { 
    name maxScale idDocType series { name value idStatus }
  }
}
`;

@Component({
  selector: 'crm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  viewProviders: [ ],
})
export class DashboardComponent implements AfterViewInit  {

  layoutColor: string;
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

  simpleValues: any;
  statusValues: any;
  


  constructor(private _titleService: Title,
          private _router: Router,
        private _route: ActivatedRoute,
        private _token: TokenService,
              private _confs: ConfigurationService,
            private _auth: AuthHelper,
            public _actions: ActionsService,
            public apollo: Apollo,
          public _shared: SharedataService ) {
        this.layoutColor = environment.layoutColor;
        this._single = <BehaviorSubject<any>>new BehaviorSubject([]);
        this.single = this._single.asObservable();


        this._byStatus = <BehaviorSubject<any>>new BehaviorSubject([]);
        this.byStatus = this._byStatus.asObservable();
  }


  private querySubscription: Subscription;
  ngAfterViewInit(): void {
    this._actions.updateTitle( { action: undefined, title: 'CRM Dashboard' , tparam: undefined} );
    this._actions.showAdd(false);
    this._actions.showCancel(false);
    this._actions.showSearch(false);

    
    var querySubscription = this.apollo.query<QueryResponse>(
      {
      query: dashQL,  
      variables:  { idresponsible: 4 }
      }
     ).subscribe(({data}) => {
      
      this.simpleValues = data['getSimpleDashboard'];
      this._single.next( this.simpleValues );

      this.statusValues = data['getStatusDashboard'];
      this.statusScale = this.statusValues['maxScale'];

      this._byStatus.next(this.statusValues);


    });   
   
 
  }

  docTypeSelect(event) {
    
    let t = this.simpleValues.filter(att => att.name == event.name )[0];
    let url = this.getRouteFromId(t.idDocType);
    this._router.navigate([ '/' + url]);
  }

  statusSelect(event) {
    let s = this.statusValues.filter(att => att.name == event.series )[0];
    let t = s.series.filter(att => att.name == event.name )[0];
    let url = this.getRouteFromId(s.idDocType);
    let opp = new GetBaseQuote_Result();
    opp.listStatus = t.idStatus;
    this._shared.search = opp;
    this._shared.loadField = "listStatus";
    this._router.navigate([ '/' + url]);
  }


  getRouteFromId(id: number) {
    switch(id) {
      case 1: 
        return 'opportunity';
      case 2: 
        return 'quotationfromsupplier';
      case 3: 
        return 'quotationtocustomer';
      case 4: 
        return 'purchaseorder';
      case 5: 
        return 'shipping';
    }
  }
}


