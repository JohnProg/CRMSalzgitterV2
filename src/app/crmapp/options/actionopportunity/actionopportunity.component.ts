import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { MdSnackBar } from '@angular/material';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Currency } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../catalogs/base.component';
import {TranslateService} from '@ngx-translate/core';
import { ActionopportunitytemplateemailComponent } from './+actionopportunitytemplateemail/actionopportunitytemplateemail.component';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



@Component({
  selector: 'crm-actionopportunity',
  templateUrl: './actionopportunity.component.html',
  styleUrls: ['./actionopportunity.component.scss']
})
export class ActionopportunityComponent extends BaseComponent  {




  ngBeforeInit() {
    super.ngBeforeInit();
    this.catalogName = 'Action Opportunities';
    this._curService.setAPI('ActionOpportunity/', this.catalogName, this.loadName);    
  }


}
