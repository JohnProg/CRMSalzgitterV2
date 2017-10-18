import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ViewChild, ContentChild, NgZone } from '@angular/core';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }  from '@angular/platform-browser';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, DATE_FORMAT } from '../../../services/catalog.service';
import { ActionsService } from '../../../services/actions.services';
import { ConfigurationService } from '../../../services/configuration.service';

import { Product } from '../../../model/allmodels';
import { BaseComponent } from '../../../catalogs/base.component';
import { getQuotationFromSupplier_Result } from '../../../model/allmodels';

import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { EnumDocType } from '../../../constants/index';
import {  QuotationindexviewerComponent } from '../../../components/index';


@Component({
  selector: 'crm-quotationtocustomerindexviewer',
  templateUrl: '../../../components/quotationindexviewer/quotationindexviewer.component.html',
  styleUrls: ['./quotationtocustomerindexviewer.component.scss']
})
export class QuotationtocustomerindexviewerComponent  extends QuotationindexviewerComponent  {
  
  catalogName: string ="Quotation to Customers";
  baseApi: string ="QuotationToCustomer/searchByQFS";
  parentDoc: number = 2;
  parentRoute: string ="quotationtocustomer";  

  


  getLoadParams(): URLSearchParams {
    let pparams = new URLSearchParams();
    pparams.set('idquote', this.byType === EnumDocType.QuotationFromSupplier ?  this.idParent.toString() : '0');
    pparams.set('idopp', this.byType == EnumDocType.Opportunity ? this.idParent.toString() : '0');
    return pparams;
  }

  addColumns() {
    //super.addColumns();
    this.columns.push({ name: 'id', label: 'Quotation', tooltip: '' });
    if( this.byType == 0  ) {
      this.columns.push({ name: 'customerName', label: 'Customer' });
    }
    this.columns.push({ name: 'idQuotationFromSupplier', label: 'QFS' });
    this.columns.push({ name: 'currencyName', label: 'Currency' });
    this.columns.push({ name: 'millName', label: 'Mill' });
    this.columns.push({ name: 'sstatusName', label: 'Status' });
    this.columns.push({ name: 'dateReceived', label: 'Date', numeric: false, format: DATE_FORMAT  });
  }

}
