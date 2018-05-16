import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ViewChild, ContentChild, NgZone } from '@angular/core';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }  from '@angular/platform-browser';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, DATE_FORMAT } from '../../../services/catalog.service';
import { ActionsService } from '../../../services/actions.services';
import { ConfigurationService } from '../../../services/configuration.service';

import {  GetPurchaseOrder_Result, PurchaseOrder } from '../../../model/index';
import { EnumDocType } from '../../../constants/index';

import { BaseComponent } from '../../../catalogs/base.component';



import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  QuotationindexviewerComponent } from '../../../components/index';


@Component({
  selector: 'crm-purchaseorderindexviewer',
  templateUrl: '../../../components/quotationindexviewer/quotationindexviewer.component.html',
  styleUrls: ['./purchaseorderindexviewer.component.scss']
})
export class PurchaseorderindexviewerComponent extends QuotationindexviewerComponent  {

  catalogName: string ="PO";
  baseApi: string ="PurchaseOrder/searchByOpp";
  parentDoc: number = 3;
  itemRoute: string ="purchaseorder";
  parentSearchField: string = "idQuotationToCustomer";

  addColumns() {

    //super.addColumns();
    this.columns.push({ name: 'id', label: 'Po #', tooltip: '' });
    if( this.idParent == undefined || this.idParent === 0 ) {
      this.columns.push({ name: 'customerName', label: 'Customer' });
      this.columns.push({ name: 'idQuotationToCustomer', label: 'QTC' });
    }
    
    this.columns.push({ name: 'currencyName', label: 'Currency' });
    this.columns.push({ name: 'millName', label: 'Mill' });
    this.columns.push({ name: 'sstatusName', label: 'Status' });
    this.columns.push({ name: 'dateReceived', label: 'Date', numeric: false, format: DATE_FORMAT  });
  }

}
