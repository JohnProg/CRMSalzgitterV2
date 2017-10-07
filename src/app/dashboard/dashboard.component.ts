import { Component, AfterViewInit, NgZone, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationService, TokenService } from '../crmapp/services/index';
import { TdMediaService, TdLoadingService, TdDigitsPipe  } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

import { Title }     from '@angular/platform-browser';
import { multi } from './data';
import { AuthHelper } from '../crmapp/authHelper/authHelper';
import { ActionsService } from '../crmapp/services/actions.services';
@Component({
  selector: 'crm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  viewProviders: [  ],
  providers: []
})
export class DashboardComponent implements AfterViewInit  {





  constructor(private _titleService: Title,
          private _router: Router,
        private _route: ActivatedRoute,
        private _token: TokenService,
              private _confs: ConfigurationService,
            private _auth: AuthHelper,
            public _actions: ActionsService, ) {
     
  }



  ngAfterViewInit(): void {
    this._actions.updateTitle( 'CRM Dashboard' );
    this._actions.showAdd(false);
    this._actions.showCancel(false);
    this._actions.showSearch(false);
    
 
  }

  setOneDrive() {
    localStorage.removeItem('oneDriveToken');
  }

}
