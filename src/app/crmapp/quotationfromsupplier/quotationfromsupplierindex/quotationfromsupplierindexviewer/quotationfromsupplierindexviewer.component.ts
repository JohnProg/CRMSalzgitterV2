import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ViewChild, ContentChild, NgZone } from '@angular/core';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';


import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }  from '@angular/platform-browser';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, DATE_FORMAT } from '../../../services/catalog.service';
import { ActionsService } from '../../../services/actions.services';
import { ConfigurationService } from '../../../services/configuration.service';

import { Product } from '../../../model/allmodels';
import { BaseComponent } from '../../../catalogs/base.component';
import { getQuotationFromSupplier_Result, GetBaseQuote_Result } from '../../../model/allmodels';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  QuotationindexviewerComponent } from '../../../components/index';

@Component({
  selector: 'crm-quotationfromsupplierindexviewer',
  templateUrl: '../../../components/quotationindexviewer/quotationindexviewer.component.html',
  styleUrls: ['./quotationfromsupplierindexviewer.component.scss']
})
export class QuotationfromsupplierindexviewerComponent  extends QuotationindexviewerComponent  {


  
  catalogName: string = "QFS";
  baseApi: string = 'QuotationFromSupplier/searchByOpp';
  parentDoc: number = 1;
  itemRoute: string = 'quotationfromsupplier';
  




  addColumns() {

    //super.addColumns();
    this.columns.push({ name: 'id', label: 'Quotation', tooltip: '' });
    
    if( this.idParent == undefined || this.idParent === 0 ) {
      this.columns.push({ name: 'customerName', label: 'Customer' });
      this.columns.push({ name: 'idOpportunity', label: 'Opportunity' });
    }
    
    //this.columns.push({ name: 'currencyName', label: 'Currency' });
    this.columns.push({ name: 'millName', label: 'Mill' });
    //this.columns.push({ name: 'portName', label: 'Port' });
    this.columns.push({ name: 'sstatusName', label: 'Status' });
    this.columns.push({ name: 'dateReceived', label: 'Date', numeric: false, format: DATE_FORMAT  });
    this.columns.push({ name: 'asImporter', label: 'As Importer' });
  }




}
