import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../components/abstractvalueaccessor';
import {TranslateService} from '@ngx-translate/core';

import { TCRMEntity, Property, ProductProperty, 
      EditorDetailSumary, EditorDetailSumaryProperty } from '../../model/allmodels';


@Component({
  selector: 'crm-editordetailsumary',
  templateUrl: './editordetailsumary.component.html',
  styleUrls: ['./editordetailsumary.component.scss']
})
export class EditordetailsumaryComponent extends BaseComponent {

  @Input() idDetail: number = 0;
  @Input() maxQty: number = 0;
  @Input() price: number = 0;
  @Input() idProduct: number = 0;
  @Output() onHasSumary: EventEmitter<any>= new EventEmitter();

   _columns: BehaviorSubject<ITdDataTableColumn[]>;
  pcolumns: Observable<ITdDataTableColumn[]>;
  _pcolumns: ITdDataTableColumn[];

  _pdetails: BehaviorSubject<EditorDetailSumaryProperty[]>;
  pdetails: Observable<EditorDetailSumaryProperty[]>;

   _props: ProductProperty[] = new Array<ProductProperty>();
  itemEdit: EditorDetailSumary;
  sortBy: string = 'ItemDescription';

  refreshItemUrl: string;
  sumProperties: string;
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

    this._pdetails = <BehaviorSubject<EditorDetailSumaryProperty[]>>new BehaviorSubject([]);
    this.pdetails = this._pdetails.asObservable();
    this.handleScreenChange = false;
    
  }

  ngOnInitClass() {
    super.ngOnInitClass();
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
    this._curService.loadCustomAll(this.refreshItemUrl, oparams, 0,  true);
  }

  addColumns() {}


  afterViewInit(): void {
    this._actions.setEdit();
  }

    
  initEntity() {
    this.initDetails();
  }

  initDetails() {
    
    if (this._props !== undefined) {

      let pdet: EditorDetailSumaryProperty[] = new Array<EditorDetailSumaryProperty>();
      
      this._props.forEach((c: ProductProperty) => {
        let p: EditorDetailSumaryProperty = new EditorDetailSumaryProperty();
        p.IdParent = this.itemEdit.Id;
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
    this.prepareToSave();
    if (this.itemEdit.Id > 0) {
      this._curService.update(this.itemEdit, true);
    } else {
      this._curService.create(this.itemEdit, true);
    }
 }

 prepareToSave() {

 }
  afterCreate(itms: EditorDetailSumary[]) {
    this.afterLoadAll(itms);
  }

  afterUpdate(itms: EditorDetailSumary[]) {
    this.afterLoadAll(itms);
  }


  afterDelete(items: any) {
    this.afterLoadAll(items);
  }

  afterLoadAll(itms: EditorDetailSumary[]) {
      if( itms !== undefined && itms.length > 0 && itms[0][this.sumProperties] !== undefined 
        && itms[0][this.sumProperties].length > 0) {
        this._pcolumns = new Array<ITdDataTableColumn>();
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'tActions' ,  label: '' }));
        itms[0][this.sumProperties].forEach( (t: EditorDetailSumaryProperty) => {
          this._pcolumns.push( (<ITdDataTableColumn> { name: 'prop' +  t.IdProperty,
               label: t.Property.Name, tooltip: '', IdProperty: t.IdProperty }));
        });

        itms.forEach( (t: EditorDetailSumary) => {
          t[this.sumProperties].forEach( (p: EditorDetailSumaryProperty) => {
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
      this.isEditing = false;
}




  change(event: IPChangeEventSorted): void {
    if (event !== undefined) {
      this.currentPage = event.page - 1;
      this.reloadPaged();
      this.isLoading = false;
    }
  }

  confirmDelete(item: EditorDetailSumary) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit( { title: ' this Sumary', objId: this.objId });
  }



  deleteEntity(id: number) {
    this._curService.remove(id);
  }


}
