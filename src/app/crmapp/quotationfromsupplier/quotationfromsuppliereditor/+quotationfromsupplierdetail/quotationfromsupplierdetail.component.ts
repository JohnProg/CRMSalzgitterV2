import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Subscription ,  Observable ,  Observer ,  BehaviorSubject } from 'rxjs';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { QuotationFromSupplierDetail } from '../../../model/allmodels';
import { BaseComponent } from '../../../catalogs/base.component';
import {  EditordetailComponent } from '../../../components/index';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';


import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';
//import { OpportunitydetailsumaryComponent } from './+opportunitydetailsumary/opportunitydetailsumary.component';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-quotationfromsupplierdetail',
  templateUrl: './quotationfromsupplierdetail.component.html',
  styleUrls: ['./quotationfromsupplierdetail.component.scss']
})
export class QuotationfromsupplierdetailComponent extends EditordetailComponent {


  itemEdit: QuotationFromSupplierDetail;
  baseApi: string = 'QuotationFromSupplierDetail';
  catalogName: string = 'Quotation Details';
  baseSearch: string = 'searchByQuotation';
  


  getLoadParams(): URLSearchParams {
    let pparams = new URLSearchParams();
    pparams.set('idquote', this.idOpp.toString());
    return pparams;
  }


  initEntity() {
    this.itemEdit = new QuotationFromSupplierDetail() ;
    this.itemEdit.idQuotationFromSupplier  = this.idOpp;
    this.itemEdit.idProduct = 0;
  }

}
