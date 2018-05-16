import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn,
   } from '@covalent/core/data-table';

import { TdSearchBoxComponent } from '@covalent/core/search';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Currency } from '../../model/allmodels';

import { Observable } from 'rxjs';
import { BaseComponent } from '../../catalogs/base.component';

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
