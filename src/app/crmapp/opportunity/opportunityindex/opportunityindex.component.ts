import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }  from '@angular/platform-browser';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, DATE_FORMAT } from '../../services/catalog.service';
import { ActionsService } from '../../services/actions.services';
import { ConfigurationService } from '../../services/configuration.service';

import { Product } from '../../model/allmodels';
import { BaseComponent } from '../../catalogs/base.component';
import { GetOpportunities } from '../../model/allmodels';

import {TranslateService} from '@ngx-translate/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-opportunityindex',
  templateUrl: './opportunityindex.component.html',
  styleUrls: ['./opportunityindex.component.scss'],
  providers: []
})
export class OpportunityindexComponent extends BaseComponent  {


  ngBeforeInit() {
    super.ngBeforeInit();
    this.sortBy = 'id';
    this.catalogName = 'Opportunity';
    this._curService.setAPI('Opportunity/', this.catalogName, this.loadName);   
  }


  editEntity(id: number) {
    this._router.navigate(['opportunity/edit/' + id]);
  }


  addColumns() {
    //super.addColumns();
    this.columns.push({ name: 'id', label: 'Opportunity', tooltip: '' });
    this.columns.push({ name: 'customerName', label: 'Customer Name' });
    this.columns.push({ name: 'oppNotes', label: 'Project Name' });
    this.columns.push({ name: 'asImporter', label: 'IOR' });
    this.columns.push({ name: 'statusName', label: 'Status' });
    this.columns.push({ name: 'lastUpdated', label: 'Last Update', numeric: false, format: DATE_FORMAT });
  }

  addEntity() {
    
    this._router.navigate(['opportunity/edit/0']);
  }
}
