import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { QuotationFromSupplierDetail } from '../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../catalogs/base.component';
import {  EditordetailComponent } from '../../../components/index';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';
//import { OpportunitydetailsumaryComponent } from './+opportunitydetailsumary/opportunitydetailsumary.component';
import {TranslateService} from '@ngx-translate/core';
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
