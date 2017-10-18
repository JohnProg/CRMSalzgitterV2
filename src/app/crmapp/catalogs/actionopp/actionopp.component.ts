import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

import { ActionOpportunity } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../base.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import {TranslateService} from '@ngx-translate/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



@Component({
  selector: 'crm-actionopp',
  templateUrl: './actionopp.component.html',
  styleUrls: ['./actionopp.component.scss'],
  providers: [ ]
})
export class ActionoppComponent extends BaseComponent {

  ngBeforeInit() {
    super.ngBeforeInit();
    this.sortBy = 'name';
    this.catalogName = 'Action Opportunity';
    this._curService.setAPI('ActionOpportunity/', this.catalogName, this.loadName);   
  }


}
