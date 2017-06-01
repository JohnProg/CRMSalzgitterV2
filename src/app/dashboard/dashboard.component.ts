import { Component, AfterViewInit, NgZone, OnInit, OnDestroy  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigurationService } from '../crmapp/services/configuration.service';
import { TdMediaService, TdLoadingService, TdDigitsPipe  } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';

import { Title }     from '@angular/platform-browser';
import { multi } from './data';

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
        private _route: ActivatedRoute ) {

  }

  ngAfterViewInit(): void {
    this._titleService.setTitle( 'CRM Salzgitter' );
 
  }

}
