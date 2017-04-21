import { Component, AfterViewInit, NgZone, OnInit, OnDestroy  } from '@angular/core';
import { Router } from '@angular/router';
import { TdMediaService, TdLoadingService, TdDigitsPipe  } from '@covalent/core';
import { Subscription } from 'rxjs/Subscription';
import { ConfigurationService } from '../crmapp/services/configuration.service';

import { Title }     from '@angular/platform-browser';
import { multi } from './data';

@Component({
  selector: 'crm-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  viewProviders: [  ],
  providers: [ConfigurationService]
})
export class DashboardComponent implements AfterViewInit  {




  constructor(private _titleService: Title  ) {

  }

  ngAfterViewInit(): void {
    this._titleService.setTitle( 'CRM Salzgitter' );
 
  }

}
