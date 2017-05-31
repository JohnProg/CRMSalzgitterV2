import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';
import { QuotationFromSupplierDetailSumary, QuotationFromSupplierDetailSumaryProperty, 
     Property, TCRMEntity, ProductProperty } from '../../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../../components/abstractvalueaccessor';
import {TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'crm-quotationfromsupplierdetailsumary',
  templateUrl: './quotationfromsupplierdetailsumary.component.html',
  styleUrls: ['./quotationfromsupplierdetailsumary.component.scss']
})
export class QuotationfromsupplierdetailsumaryComponent extends BaseComponent {

  @Input() idDetail: number = 0;
  @Input() maxQty: number = 0;
  @Input() price: number = 0;
  @Input() idProduct: number = 0;
  @Output() onHasSumary: EventEmitter<any>= new EventEmitter();

   _columns: BehaviorSubject<ITdDataTableColumn[]>;
  pcolumns: Observable<ITdDataTableColumn[]>;
  _pcolumns: ITdDataTableColumn[];

  _pdetails: BehaviorSubject<QuotationFromSupplierDetailSumaryProperty[]>;
  pdetails: Observable<QuotationFromSupplierDetailSumaryProperty[]>;

   _props: ProductProperty[] = new Array<ProductProperty>();
  itemEdit: QuotationFromSupplierDetailSumary;
  sortBy: string = 'ItemDescription';







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
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, 
    _http, _tableService, translate);

    this.setTitle = false;
    this._columns = <BehaviorSubject<ITdDataTableColumn[]>>new BehaviorSubject([]);
    this.pcolumns = this._columns.asObservable();

    this._pdetails = <BehaviorSubject<QuotationFromSupplierDetailSumaryProperty[]>>new BehaviorSubject([]);
    this.pdetails = this._pdetails.asObservable();


    this.catalogName = 'Quotation from Supplier Details Sumary';
    this._curService.setAPI('QuotationFromSupplierDetailSumary', this.catalogName);
    this.itemEdit = new QuotationFromSupplierDetailSumary();
    
    this.handleScreenChange = false;
  }

  ngOnInitClass() {
    this.entList = <Observable<QuotationFromSupplierDetailSumary[]>>this._curService.entList;
    this.initData();
  }

  initData() {
    
    this.refreshItems();
    let pparams: TCRMEntity[] = new Array<TCRMEntity>();
    pparams.push( (<TCRMEntity>{ Name: 'idproduct', Description: this.idProduct.toString()}) );
    this._curService.loadCustomCatalogObs('ProductProperty/searchByProduct', pparams)
    .map((response) => response.json())
    .subscribe( (items: ProductProperty[]) => {
      
         this._props = items;
         this.initDetails();
    });
    this.initEntity();
  }
  
  refreshItems() {
    let oparams: URLSearchParams = new URLSearchParams();
    oparams.set('iddetail', this.idDetail.toString());
    this._curService.loadCustomAll('QuotationFromSupplierDetailSumary/searchByDetail', oparams, 0,  true);
  }
  addColumns() {}


  afterViewInit(): void {
    this._actions.setEdit();
  }

    
  initEntity() {
    this.itemEdit = new QuotationFromSupplierDetailSumary() ;
    this.itemEdit.IdQuotationFromSupplierDetail  = this.idDetail;
    this.itemEdit.DateCreated = new Date();
    this.itemEdit.Price = this.price;
    this.itemEdit.Quantity = this.maxQty;
    this.initDetails();
  }

  initDetails() {
    if (this._props !== undefined) {

      let pdet: QuotationFromSupplierDetailSumaryProperty[] = new Array<QuotationFromSupplierDetailSumaryProperty>();
      this._props.forEach((c: ProductProperty) => {
        let p: QuotationFromSupplierDetailSumaryProperty = new QuotationFromSupplierDetailSumaryProperty();
        p.IdQuotationFromSupplierDetailSumary = this.itemEdit.Id;
        p.IdProperty = c.IdProperty;
        p.PropertyValue = '';
        p.IsRequired = c.IsRequired;
        p.Property = new Property();
        p.NameDescription = 'prop' + c.IdProperty;
        Object.assign(p.Property, c.Property);
        pdet.push(p);
      });

      if(pdet.length > 0) {
        this._pdetails.next(pdet);
      }
    }

  }

  addEntity() {
    this.initEntity();
    this.isEditing = true;
  }

 saveEntity() {
    this.pdetails.forEach( (t: QuotationFromSupplierDetailSumaryProperty[]) => {
      this.itemEdit.QuotationFromSupplierDetailSumaryProperties = new Array<QuotationFromSupplierDetailSumaryProperty>();
      t.forEach( (o: QuotationFromSupplierDetailSumaryProperty ) => {
            let p: QuotationFromSupplierDetailSumaryProperty = new QuotationFromSupplierDetailSumaryProperty();
            p.IdQuotationFromSupplierDetailSumary = o.IdQuotationFromSupplierDetailSumary;
            p.IdProperty = o.IdProperty;
            p.PropertyValue = o.PropertyValue;
            this.itemEdit.QuotationFromSupplierDetailSumaryProperties.push(p);
      });
    });
    if (this.itemEdit.Id > 0) {
      this._curService.update(this.itemEdit, true);
    } else {
      this._curService.create(this.itemEdit, true);
    }
 }

  afterCreate(itms: QuotationFromSupplierDetailSumary[]) {
    this.afterLoadAll(itms);
  }

  afterUpdate(itms: QuotationFromSupplierDetailSumary[]) {
    this.afterLoadAll(itms);
  }


  afterDelete(items: any) {
    this.afterLoadAll(items);
  }
afterLoadAll(itms: QuotationFromSupplierDetailSumary[]) {
      if( itms !== undefined && itms.length > 0 && itms[0].QuotationFromSupplierDetailSumaryProperties !== undefined 
        && itms[0].QuotationFromSupplierDetailSumaryProperties.length > 0) {
        this._pcolumns = new Array<ITdDataTableColumn>();
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'tActions' ,  label: '' }));
        itms[0].QuotationFromSupplierDetailSumaryProperties.forEach( (t: QuotationFromSupplierDetailSumaryProperty) => {
          this._pcolumns.push( (<ITdDataTableColumn> { name: 'prop' +  t.IdProperty,
               label: t.Property.Name, tooltip: '', IdProperty: t.IdProperty }));
        });

        itms.forEach( (t: QuotationFromSupplierDetailSumary) => {
          t.QuotationFromSupplierDetailSumaryProperties.forEach( (p: QuotationFromSupplierDetailSumaryProperty) => {
              t['prop' + p.IdProperty] = p.PropertyValue;
          });
        });

        this._pcolumns.push( (<ITdDataTableColumn> { name: 'Quantity' ,  label: 'Quantity', tooltip: '',
         numeric: true, format: NUMBER_FORMAT, draw: true  }));
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'Price' ,  label: 'Price', tooltip: '',
         numeric: true, format: CURRENCY_FORMAT, draw: true }));
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'Amount' ,  label: 'Amount', tooltip: '',
         numeric: true, format: CURRENCY_FORMAT, draw: true }));
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'Comment' ,  label: 'Comment', tooltip: '',
         draw: true }));



        this._columns.next(this._pcolumns);
      }
      this.isLoading = false;
      this.onHasSumary.emit(itms.length > 0);
      this.totalItems = itms.length;
      this.reloadPaged();
      this.isLoading = false;
}




  change(event: IPChangeEventSorted): void {
    if (event !== undefined) {
      
      this.currentPage = event.page - 1;
      this.reloadPaged();
      this.isLoading = false;
    }
  }

  confirmDelete(item: QuotationFromSupplierDetailSumary) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit(' this Sumary');
  }



  deleteEntity(id: number) {
    this._curService.remove(id);
  }


}
