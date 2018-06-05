import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

import { Observable ,  Observer ,  BehaviorSubject } from 'rxjs';
import { BaseComponent } from '../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../components/abstractvalueaccessor';


import { TCRMEntity, Property, ProductProperty, 
      EditorDetailSumary, EditorDetailSumaryProperty } from '../../model/allmodels';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {saveAs as importedSaveAs} from "file-saver";
import * as request from 'superagent';


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
  @Input() idCustomerProduct: number = 0;
  @Output() onHasSumary: EventEmitter<any>= new EventEmitter();
  @Output() afterChange: EventEmitter<any>= new EventEmitter();
   _columns: BehaviorSubject<ITdDataTableColumn[]>;
  pcolumns: Observable<ITdDataTableColumn[]>;
  _pcolumns: ITdDataTableColumn[];

  _pdetails: BehaviorSubject<EditorDetailSumaryProperty[]>;
  pdetails: Observable<EditorDetailSumaryProperty[]>;

   _props: ProductProperty[] = new Array<ProductProperty>();
  itemEdit: EditorDetailSumary;
  sortBy: string = 'itemDescription';

  refreshItemUrl: string;
  
  total: number = 0;
  totalAmount: number = 0;
  totalShipped: number = 0;
  loadName: string = 'editprop.load';
  
  @Input() baseController: string;
  @Input() baseSearch: string;
  @Input() sumProperties: string;
  uTemplate: boolean = false;
  files: any;


  ngBeforeInit() {
    super.ngBeforeInit();
    this.setTitle = false;
    this._columns = <BehaviorSubject<ITdDataTableColumn[]>>new BehaviorSubject([]);
    this.pcolumns = this._columns.asObservable();

    this._pdetails = <BehaviorSubject<EditorDetailSumaryProperty[]>>new BehaviorSubject([]);
    this.pdetails = this._pdetails.asObservable();
    this.handleScreenChange = false;
    this.subEditor = true;  


    //this.catalogName = 'Opp Details Sumary';
    this._curService.setAPI(this.baseController, this.catalogName, this.loadName);
    this.refreshItemUrl = this.baseController + '/' + this.baseSearch;
    //this.sumProperties = 'opportunityDetailSumaryProperties'; 
    
  }

  
  // ngBeforeInit() {
  //   super.ngBeforeInit();
  //    this.catalogName = 'Opp Details Sumary';
  //   this._curService.setAPI('OpportunityDetailSumary', this.catalogName, this.loadName);
  //   this.refreshItemUrl = 'OpportunityDetailSumary/searchByDetail';
  //   this.sumProperties = 'opportunityDetailSumaryProperties'; 
  // }


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
    
    this.afterChange.emit();
  }

  afterUpdate(itms: EditorDetailSumary[]) {
    this.afterLoadAll(itms);
    
    this.afterChange.emit();
  }


  afterDelete(items: any) {
    this.afterLoadAll(items);
    
    this.afterChange.emit();
  }

  
  afterLoadAll(itms: EditorDetailSumary[]) {
      this.total = 0;
      this.totalAmount = 0;
      this.totalShipped = 0;
      
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
          this.totalShipped += t['qtyShipped'] || 0;
          t[this.sumProperties].forEach( (p: EditorDetailSumaryProperty) => {
              t['prop' + p.idProperty] = p.propertyValue;
          });
        });

        this.addOtherColumns();
        //this._pcolumns.push(  { name: 'comment' ,  label: 'Comment' });
        this._columns.next(this._pcolumns);


      }
      this.isLoading = false;
      this.onHasSumary.emit(itms.length > 0);
      this._curService.changeTotal(itms.length);
      this.reloadPaged();
      this.isLoading = false;
      this.isEditing = false;
}

addOtherColumns() {
  this._pcolumns.push(  { name: 'quantity' ,  label: 'Quantity',  numeric: true, format: NUMBER_FORMAT, sortable: false });
  if( this.totalShipped > 0 ){
    this._pcolumns.push(  { name: 'qtyShipped' ,  label: 'Ship Qty', numeric: true, format: NUMBER_FORMAT, sortable: false });
  }
  this._pcolumns.push(  { name: 'price' ,  label: 'Price',  numeric: true, format: CURRENCY_FORMAT, sortable: false  });
  this._pcolumns.push(  { name: 'amount' ,  label: 'Amount',  numeric: true, format: CURRENCY_FORMAT, sortable: false  });
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
    this.calculateOtherCosts();
  }
  priceChange(event)  {
    this.price = event;
    this.itemEdit.price = event;
    this.itemEdit.amount  = this.itemEdit.quantity * event;
    this.calculateOtherCosts();
  }  

  calculateOtherCosts() {
    
  }


  getTemplate() {

    //this._loadingService.register(this.loadName);
    request
    .get( this._confs.serverWithApiCustomUrl + this.baseController + '/getTemplate')
    .set('Authorization', this._confs.getToken() )
    .set('Content-Type', 'blob')
    .query({ idDetail: this.idDetail.toString() })
    .query({ idproduct: this.idProduct.toString() })
    .query({ price: this.price.toString() })
    .query({ maxQty: this.maxQty.toString() })
    .responseType('blob')
    .end( (err, res) => {
      //this._loadingService.resolve(this.loadName);
        if (err) {
          return;
        }
        importedSaveAs( res.body, 'Sumary Data for detail ' + this.idDetail + '.xlsx');
    });
  }

  uploadTemplate() {
    this.uTemplate = !this.uTemplate;
  }

  


  uploadFile() 
  {

    if (this.files) {
      let token: string = this._confs.getToken();
      
      const data = new FormData();
      data.append('file', this.files);


        request.post(this._confs.serverWithApiCustomUrl + this.baseController + '/uploadTemplate')
            //.set("Content-Type", this.files.type)
            .set( 'Authorization', token )
            .query({ iddetail: this.idDetail.toString() })
            .send(data)
            .accept('json')
            .end((err, response) => {
              if (err) {
                this._snackBarService.open(err.response.body.message, 'Ok');
                
                return;
              }
               this.refreshItems();
              this.uTemplate = !this.uTemplate;
              this.afterChange.emit();
                //this._loadingService.resolve(this.loadItem);
            });
      
    }
  //this._loadingService.register(this.loadItem);
  }
}
