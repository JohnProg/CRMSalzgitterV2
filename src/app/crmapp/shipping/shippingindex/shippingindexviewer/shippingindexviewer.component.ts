import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ViewChild, ContentChild, NgZone } from '@angular/core';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }  from '@angular/platform-browser';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT, DATE_FORMAT } from '../../../services/catalog.service';
import { ActionsService } from '../../../services/actions.services';
import { ConfigurationService } from '../../../services/configuration.service';

import {  GetShippings_Result, Shipping } from '../../../model/index';
import { EnumDocType } from '../../../constants/index';

import { BaseComponent } from '../../../catalogs/base.component';

import {TranslateService} from '@ngx-translate/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  QuotationindexviewerComponent } from '../../../components/index';



@Component({
  selector: 'crm-shippingindexviewer',
  templateUrl: '../../../components/quotationindexviewer/quotationindexviewer.component.html',
  styleUrls: ['./shippingindexviewer.component.scss']
})
export class ShippingindexviewerComponent extends QuotationindexviewerComponent  {

  catalogName: string ="Shippings";
  baseApi: string ="Shipping/searchBy";
  parentDoc: number = 4;
  parentRoute: string ="shipping";



  addColumns() {

    //super.addColumns();
    this.columns.push({ name: 'id', label: 'Shipping', tooltip: '' });
    if(( this.idParent === undefined || this.idParent === 0)  ) {
      this.columns.push({ name: 'customerName', label: 'Customer' });
    }
    this.columns.push({ name: 'statusName', label: 'Status' });
    this.columns.push({ name: 'blNumber', label: 'BLNumber' });
    this.columns.push({ name: 'blDate', label: 'BL Date', numeric: false, format: DATE_FORMAT });
    this.columns.push({ name: 'cdpName', label: 'Delivery Point' });
    this.columns.push({ name: 'userName', label: 'Created by' });
  }

}
