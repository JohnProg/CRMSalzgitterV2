import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { QuotationToCustomerDetail } from '../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'crm-quotationtocustomereditordetail',
  templateUrl: './quotationtocustomereditordetail.component.html',
  styleUrls: ['./quotationtocustomereditordetail.component.scss']
})
export class QuotationtocustomereditordetailComponent extends BaseComponent {

  @Input() idQuotation: number = 0;
  itemEdit: QuotationToCustomerDetail;
  sortBy: string = 'ItemDescription';
  allowProduct: boolean = true;
  propSubscription: Subscription;


 constructor(public _router: Router, public _route: ActivatedRoute, 
    public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone, 
    public _http: Http, 
    public _tableService: TdDataTableService,
    public translate: TranslateService) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate);    
    this.catalogName = 'Quotation Details';
    this._curService.setAPI('QuotationToCustomerDetail', this.catalogName);
    this.itemEdit = new QuotationToCustomerDetail();
  }

  ngOnInitClass() {
    this.entList = <Observable<QuotationToCustomerDetail[]>>this._curService.entList;
    this.initData();
  }


  initData() {
    let pparams = new URLSearchParams();
    pparams.set('idquote', this.idQuotation.toString());
    this._curService.loadCustomAll('QuotationToCustomerDetail/searchByQuotation', pparams);
    this.initEntity();
  }

  afterViewInit(): void {
    this._actions.updateTitle('Details for Quotation to Customer ' + this.idQuotation.toString());

  }

  onDestroy() {
    if (this.propSubscription !== undefined) { this.propSubscription.unsubscribe(); }
  }

  addColumns() {
    this.columns.push({ name: 'ItemDescription', label: 'Item Description' });
    this.columns.push({ name: 'ProductDescription', label: 'Product', tooltip: '' });

    this.columns.push({ name: 'ItemQuantity', label: 'Quantity' });
    this.columns.push({ name: 'ItemPrice', label: 'Cost Price', numeric: true, format: CURRENCY_FORMAT, sortable: false });
    this.columns.push({ name: 'SalePrice', label: 'Sales Price', numeric: true, format: CURRENCY_FORMAT, sortable: false });
  }

  initEntity() {
    this.itemEdit = new QuotationToCustomerDetail() ;
    this.itemEdit.IdQuotationToCustomer  = this.idQuotation;
    this.itemEdit.IdProduct = 0;
  }


  afterLoadItem(itm: QuotationToCustomerDetail) {
    super.afterLoadItem(itm);
    this._actions.updateTitle('Edit item ' + this.idQuotation.toString());
  }


  confirmDelete(item:  QuotationToCustomerDetail) {
    this.itemEdit = item;
    this._actions.deleteItem(item.ItemDescription);
  }

  afterCreate(item: QuotationToCustomerDetail) {
    Object.assign(this.itemEdit, item);
  }

  afterUpdate(item: QuotationToCustomerDetail) {
    Object.assign(this.itemEdit, item);
  }

  hasSumary(h: boolean) {
    this.allowProduct = h;
  }
}
