import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';


import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }  from '@angular/platform-browser';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, DATE_FORMAT } from '../../services/catalog.service';
import { ActionsService } from '../../services/actions.services';
import { ConfigurationService } from '../../services/configuration.service';

import { Product, GetBaseQuote_Result } from '../../model/allmodels';
import { BaseComponent } from '../../catalogs/base.component';
import { GetOpportunities } from '../../model/allmodels';



import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-opportunityindex',
  templateUrl: './opportunityindex.component.html',
  styleUrls: ['./opportunityindex.component.scss'],
  providers: []
})
export class OpportunityindexComponent extends BaseComponent  {

  idDocType: number = 1;
  ngBeforeInit() {
    super.ngBeforeInit();
    this.sortBy = 'id';
    this.catalogName = 'OPP';
    this.autoLoad = false;
    this._curService.setAPI('Opportunity/', this.catalogName, this.loadName);   
  }


  afterViewInit() {
     this._actions.showFilterButton(true);  
  }


  loadFromServer() {
    
    var sh = this._shared;
    if(sh.loadField != '') {
      
      this._curService.customSearch( 'Opportunity/searchOpp', sh.search);
      sh.loadField = '';
    } else {
       //this._curService.loadAll(this.getPageParams(''));
   
    }
   
  }

  loadFromFilter(event) {
    
    this._curService.customSearch( 'Opportunity/searchOpp', event);
  }

  editEntity(id: number) {
    this._router.navigate(['opportunity/edit/' + id]);
  }


  addColumns() {
    //super.addColumns();
    this.columns.push({ name: 'id', label: 'Opportunity', tooltip: '' });
    this.columns.push({ name: 'customerName', label: 'Customer Name' });
    this.columns.push({ name: 'oppNotes', label: 'Project Name' });
    this.columns.push({ name: 'asImporter', label: 'Imp. of R.' });
    this.columns.push({ name: 'statusName', label: 'Status' });
    this.columns.push({ name: 'totalformat', label: 'Total' });
    this.columns.push({ name: 'lastUpdated', label: 'Last Update', numeric: false, format: DATE_FORMAT });
  }

  addEntity() {
    
    this._router.navigate(['opportunity/edit/0']);
  }

  afterLoadAll(itms: any) {
    
    this.isLoading = false;
    if( this.autoHideFilterPanel == true) {
        this._actions.showFilterPanel();
    }

  }




}
