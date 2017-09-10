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
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


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
  sortBy: string = 'itemDescription';

  refreshItemUrl: string;
  sumProperties: string;
  total: number = 0;
  totalAmount: number = 0;

  ngBeforeInit() {
    super.ngBeforeInit();
    this.setTitle = false;
    this._columns = <BehaviorSubject<ITdDataTableColumn[]>>new BehaviorSubject([]);
    this.pcolumns = this._columns.asObservable();

    this._pdetails = <BehaviorSubject<EditorDetailSumaryProperty[]>>new BehaviorSubject([]);
    this.pdetails = this._pdetails.asObservable();
    this.handleScreenChange = false;
    this.subEditor = true;  
  }

  
  loadData() {
    
    this.refreshItems();
    let pparams: TCRMEntity[] = new Array<TCRMEntity>();
    pparams.push( (<TCRMEntity>{ name: 'prodId', description: this.idProduct.toString()}) );
    pparams.push( (<TCRMEntity>{ name: 'idprop', description: '0'}) );
    this._curService.loadCustomCatalogObs('ProductProperty/searchByProduct', pparams)
    .map((response) => response.json())
    .subscribe( (items: ProductProperty[]) => {
      
         this._props = items;
         
         //this.initDetails();
    });

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
    //this.initDetails();
  }

  initDetails() {
    
    if (this._props !== undefined) {

      let pdet: EditorDetailSumaryProperty[] = new Array<EditorDetailSumaryProperty>();
      debugger
      this._props.forEach((c: ProductProperty) => {
        let p: EditorDetailSumaryProperty = new EditorDetailSumaryProperty();
        p.idParent = this.itemEdit.id;
        p.idProperty = c.idProperty;
        p.propertyValue = '';
        p.isRequired = c.isRequired;
        
        p.nameDescription = 'prop' + c.idProperty;
        p.property = new Property();
        if( c.property != undefined) {
           Object.assign(p.property, c.property);
        } else {
          p.property.name = c.name;
          p.property.id = c.id;
          p.property.description = c.description;
          
        }
        pdet.push(p);
      });

      if(pdet.length > 0) {
        this.setPropertyValues(pdet);
        this._pdetails.next(pdet);
        
      }
    }

  }

  setPropertyValues(details: EditorDetailSumaryProperty[] ) {

  }

  
  addEntity() {
    this.initEntity();
    this.isEditing = true;
  }

 saveEntity() {
    this.prepareToSave();
    if (this.itemEdit.id > 0) {
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
      this.total = 0;
      this.totalAmount = 0;
      if( itms !== undefined && itms.length > 0 && itms[0][this.sumProperties] !== undefined 
        && itms[0][this.sumProperties].length > 0) {
        this._pcolumns = new Array<ITdDataTableColumn>();
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'tActions' ,  label: '' }));
        itms[0][this.sumProperties].forEach( (t: EditorDetailSumaryProperty) => {
          this._pcolumns.push( (<ITdDataTableColumn> { name: 'prop' +  t.idProperty,
               label: t.property.name, tooltip: '', idProperty: t.idProperty }));
        });

        itms.forEach( (t: EditorDetailSumary) => {
          this.total += t.quantity;
          this.totalAmount += t.amount;
          t[this.sumProperties].forEach( (p: EditorDetailSumaryProperty) => {
              t['prop' + p.idProperty] = p.propertyValue;
          });
        });

        this._pcolumns.push(  { name: 'quantity' ,  label: 'Quantity', tooltip: '', numeric: true, format: NUMBER_FORMAT, sortable: false });
        this._pcolumns.push(  { name: 'price' ,  label: 'Price', tooltip: '', numeric: true, format: CURRENCY_FORMAT, sortable: false  });
        this._pcolumns.push(  { name: 'amount' ,  label: 'Amount', tooltip: '', numeric: true, format: CURRENCY_FORMAT, sortable: false  });
        this._pcolumns.push(  { name: 'comment' ,  label: 'Comment', tooltip: '' });
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

  qtyChange(event)  {
    this.itemEdit.quantity = event;
    this.itemEdit.amount  = event * this.itemEdit.price;
  }
  priceChange(event)  {
    this.price = event;
    this.itemEdit.amount  = this.itemEdit.quantity * event;
  }  
}
