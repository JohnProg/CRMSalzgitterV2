import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Subscription ,  Observable ,  Observer ,  BehaviorSubject } from 'rxjs';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { QuotationToCustomerDetail } from '../../../model/allmodels';
import { BaseComponent } from '../../../catalogs/base.component';
import {  EditordetailComponent } from '../../../components/index';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const productQl = gql`
  query {
    products { id name description }
  }
`;


@Component({
  selector: 'crm-quotationtocustomereditordetail',
  templateUrl: './quotationtocustomereditordetail.component.html',
  styleUrls: ['./quotationtocustomereditordetail.component.scss']
})
export class QuotationtocustomereditordetailComponent extends EditordetailComponent {

  itemEdit: QuotationToCustomerDetail;
  baseApi: string = 'QuotationToCustomerDetail';
  catalogName: string = 'Quotation Details';
  baseSearch: string = 'searchByQuotation';



  getLoadParams(): URLSearchParams {
    let pparams = new URLSearchParams();
    pparams.set('idquote', this.idOpp.toString());
    return pparams;
  }

  initEntity() {
    this.itemEdit = new QuotationToCustomerDetail() ;
    this.itemEdit.idQuotationToCustomer  = this.idOpp;
    this.itemEdit.idProduct = 0;
  }



}
