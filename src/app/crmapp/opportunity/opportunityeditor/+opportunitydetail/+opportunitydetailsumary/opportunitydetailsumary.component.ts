import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';
import { OpportunityDetailSumary, OpportunityDetailSumaryProperty, Property, TCRMEntity, ProductProperty } from '../../../../model/allmodels';
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
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-opportunitydetailsumary',
  templateUrl: './opportunitydetailsumary.component.html',
  styleUrls: ['./opportunitydetailsumary.component.scss']
})
export class OpportunitydetailsumaryComponent extends BaseComponent {

  @Input() idDetail: number = 0;
  @Input() maxQty: number = 0;
  @Input() price: number = 0;
  @Input() idProduct: number = 0;
  @Output() onHasSumary: EventEmitter<any>= new EventEmitter();

   _columns: BehaviorSubject<ITdDataTableColumn[]>;
  pcolumns: Observable<ITdDataTableColumn[]>;
  _pcolumns: ITdDataTableColumn[];

  _pdetails: BehaviorSubject<OpportunityDetailSumaryProperty[]>;
  pdetails: Observable<OpportunityDetailSumaryProperty[]>;

   _props: ProductProperty[] = new Array<ProductProperty>();
  itemEdit: OpportunityDetailSumary;
  sortBy: string = 'itemDescription';







  constructor(public _router: Router,
      public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone, 
    public _http: Http, 
    public _tableService: TdDataTableService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public apollo: Apollo) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, route, apollo);
 

    this.setTitle = false;
    this._columns = <BehaviorSubject<ITdDataTableColumn[]>>new BehaviorSubject([]);
    this.pcolumns = this._columns.asObservable();

    this._pdetails = <BehaviorSubject<OpportunityDetailSumaryProperty[]>>new BehaviorSubject([]);
    this.pdetails = this._pdetails.asObservable();


    this.catalogName = 'Opp Details Sumary';
    this._curService.setAPI('OpportunityDetailSumary', this.catalogName);
    this.itemEdit = new OpportunityDetailSumary();
    
    this.handleScreenChange = false;
  }

  ngOnInitClass() {
    this.entList = <Observable<OpportunityDetailSumary[]>>this._curService.entList;
    this.initData();
  }

  initData() {
    
    this.refreshItems();
    let pparams: TCRMEntity[] = new Array<TCRMEntity>();
    pparams.push( (<TCRMEntity>{ name: 'idproduct', description: this.idProduct.toString()}) );
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
    this._curService.loadCustomAll('OpportunityDetailSumary/searchByDetail', oparams, 0,  true);
  }
  addColumns() {}


  afterViewInit(): void {
    this._actions.setEdit();
  }

    
  initEntity() {
    this.itemEdit = new OpportunityDetailSumary() ;
    this.itemEdit.idOpportunityDetail  = this.idDetail;
    this.itemEdit.dateCreated = new Date();
    this.itemEdit.price = this.price;
    this.itemEdit.quantity = this.maxQty;
    this.initDetails();
  }

  initDetails() {
    if (this._props !== undefined) {

      let pdet: OpportunityDetailSumaryProperty[] = new Array<OpportunityDetailSumaryProperty>();
      this._props.forEach((c: ProductProperty) => {
        let p: OpportunityDetailSumaryProperty = new OpportunityDetailSumaryProperty();
        p.idOpportunityDetailSumary = this.itemEdit.id;
        p.idProperty = c.idProperty;
        p.propertyValue = '';
        p.isRequired = c.isRequired;
        p.property = new Property();
        p.nameDescription = 'prop' + c.idProperty;
        Object.assign(p.property, c.property);
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
    this.pdetails.forEach( (t: OpportunityDetailSumaryProperty[]) => {
      this.itemEdit.opportunityDetailSumaryProperties = new Array<OpportunityDetailSumaryProperty>();
      t.forEach( (o: OpportunityDetailSumaryProperty ) => {
            let p: OpportunityDetailSumaryProperty = new OpportunityDetailSumaryProperty();
            p.idOpportunityDetailSumary = o.idOpportunityDetailSumary;
            p.idProperty = o.idProperty;
            p.propertyValue = o.propertyValue;
            this.itemEdit.opportunityDetailSumaryProperties.push(p);
      });
    });
    if (this.itemEdit.id > 0) {
      this._curService.update(this.itemEdit, true);
    } else {
      this._curService.create(this.itemEdit, true);
    }
 }

  afterCreate(itms: OpportunityDetailSumary[]) {

    this.afterLoadAll(itms);
    this.isEditing = false;
  }

  afterUpdate(itms: OpportunityDetailSumary[]) {
    this.afterLoadAll(itms);
  }


  afterDelete(items: any) {
    this.afterLoadAll(items);
  }
afterLoadAll(itms: OpportunityDetailSumary[]) {
      if( itms !== undefined && itms.length > 0 && itms[0].opportunityDetailSumaryProperties !== undefined 
        && itms[0].opportunityDetailSumaryProperties.length > 0) {
        this._pcolumns = new Array<ITdDataTableColumn>();
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'tActions' ,  label: '' }));
        itms[0].opportunityDetailSumaryProperties.forEach( (t: OpportunityDetailSumaryProperty) => {
          this._pcolumns.push( (<ITdDataTableColumn> { name: 'prop' +  t.idProperty,
               label: t.property.name, tooltip: '', idProperty: t.idProperty }));
        });

        itms.forEach( (t: OpportunityDetailSumary) => {
          t.opportunityDetailSumaryProperties.forEach( (p: OpportunityDetailSumaryProperty) => {
              t['prop' + p.idProperty] = p.propertyValue;
          });
        });

        this._pcolumns.push( (<ITdDataTableColumn> { name: 'quantity' ,  label: 'Quantity', tooltip: '',
         numeric: true, format: NUMBER_FORMAT, draw: true  }));
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'price' ,  label: 'Price', tooltip: '',
         numeric: true, format: CURRENCY_FORMAT, draw: true }));
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'amount' ,  label: 'Amount', tooltip: '',
         numeric: true, format: CURRENCY_FORMAT, draw: true }));
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'comment' ,  label: 'Comment', tooltip: '',
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

  confirmDelete(item:  OpportunityDetailSumary) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit( { title: ' this Sumary', objId: this.objId });
  }



  deleteEntity(id: number) {
    this._curService.remove(id);
  }


}
