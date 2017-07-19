import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import { EmailSenderComponent } from '../../components/email-sender/email-sender.component';

import { BaseComponent } from '../../catalogs/base.component';
import { Subscription } from 'rxjs/Subscription';
import {  TCRMEntity } from '../../model/allmodels';
import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-opportunitydialogemail',
  templateUrl: '../../components/email-sender/email-sender.component.html',
  styleUrls: ['../../components/email-sender/email-sender.component.scss']
})
export class OpportunitydialogemailComponent extends EmailSenderComponent {

  idOpp: number = 0;
constructor(
          public _confs: ConfigurationService,
          public _loadingService: TdLoadingService,
          public _dialogService: TdDialogService,
          public _snackBarService: MdSnackBar,
          public _actions: ActionsService,
          public _mediaService: TdMediaService,
          public _ngZone: NgZone, 
          public _http: Http, 
          public _tableService: TdDataTableService,
          public translate: TranslateService,
          public _router: Router, 
          public _route: ActivatedRoute,
          public apollo: Apollo) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, _router, _route, apollo);
 
        
    this.catalogName = 'Opportunity Dialog';
    this.mainField = 'idOpportunity';
    this.baseApi = 'OpportunityDialog';
   }


}
