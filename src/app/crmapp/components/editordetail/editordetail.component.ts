import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { TCRMEntity,  GetCustomerProductData_Result } from '../../model/allmodels';
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


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../components/abstractvalueaccessor';

import { IDeleteEventModel } from '../../model/deleteeventmodel';
import { MatSelect } from '@angular/material';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const getProductData = gql`
  query 
        productData($idcust: Int!, $idproduct: Int!) {
            getCustomerProductData(idcust: $idcust, idproduct: $idproduct) { currentPrice id idCustomer idProduct isAutomotive partNumberBuyer partNumberOEM platform productName prodDescription } 
        }
`;



@Component({
  selector: 'crm-editordetail',
  templateUrl: './editordetail.component.html',
  styleUrls: ['./editordetail.component.scss']
})
export class EditordetailComponent extends BaseComponent {
  
      
    @Input() idOpp: number = 0;
    @Input() idCustomer: number;
    itemEdit: TCRMEntity;
    sortBy: string = 'itemDescription';
    allowProduct: boolean = true;
    propSubscription: Subscription;
    productData: GetCustomerProductData_Result[];
  
    @ViewChild('idProduct') mdProduct: MatSelect;
  
    @Output() onUpdateTotal: EventEmitter<any> = new EventEmitter<any>();
    

    baseApi: string;  
    baseSearch: string = 'searchByOpp';
    ngBeforeInit() {
      super.ngBeforeInit();
      this._curService.setAPI(this.baseApi, this.catalogName, this.loadName);
      this.itemEdit = new TCRMEntity(); 
      this.setTitle = false;
      
    }
  
  
    loadCatalogs() {
      let t = this;
      this._curService.loadQl(getProductData, { idcust: this.idCustomer, idproduct: 0 })
        .subscribe(({data}) => {
          this.productData = data['getCustomerProductData'];
        }, (error: Error) => {
          this._loadingService.resolve('');
          debugger
          this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
        }
        );     
    }
    
    initData() {
  
      this._curService.loadCustomAll( this.baseApi + '/' + this.baseSearch, this.getLoadParams() );
      this.initEntity();
      this.bindParentTotal();
    }
  
    getLoadParams(): URLSearchParams {
      let pparams = new URLSearchParams();
      pparams.set('idopp', this.idOpp.toString());
      return pparams;
    }
  
  
    onDestroy() {
      if (this.propSubscription !== undefined) { this.propSubscription.unsubscribe(); }
    }
  
    addColumns() {
      this.columns.push({ name: 'itemDescription', label: 'Item Description' });
      this.columns.push({ name: 'productDescription', label: 'Product', tooltip: '' });
  
      this.columns.push({ name: 'itemQuantity', label: 'Quantity', numeric: true, format: NUMBER_FORMAT, sortable: false });
      this.columns.push({ name: 'itemPrice', label: 'Price', numeric: true, format: CURRENCY_FORMAT, sortable: false });
      this.columns.push({ name: 'itemExtended', label: 'Extended', numeric: true, format: CURRENCY_FORMAT, sortable: false });
    }
  
    afterLoadItem(itm: TCRMEntity) {
      super.afterLoadItem(itm);
    }
  
    afterLoadAll(items) {
      this.setTotal(items);
    }

    confirmDelete(item:  TCRMEntity) {
      this.itemEdit = item;
      this._actions.deleteItem( { title: item['itemDescription'], objId: this.objId });
    }
  
    afterDelete(itm) {
      super.afterDelete(itm);
 
      //this.setParentTotal();
    }


    afterCreate(item: TCRMEntity) {
      
      Object.assign(this.itemEdit, item);

      //this.setParentTotal();
    }
  
    afterUpdate(item: TCRMEntity) {
      Object.assign(this.itemEdit, item);

      //this.setParentTotal();
    }
  
    hasSumary(h: boolean) {
      
      this.allowProduct = h || this.itemEdit.id === 0;
    }

  
    qtyChange(event)  {
      this.itemEdit['itemQuantity'] = event;
      this.itemEdit['itemExtended']  = event * this.itemEdit['itemPrice'];
      this.calculateOtherCosts();
    }
    priceChange(event)  {
      this.itemEdit['itemPrice'] = event;
      this.itemEdit['itemExtended']  = this.itemEdit['itemQuantity'] * event;
      this.calculateOtherCosts();
    } 
    
    calculateOtherCosts() {

    }
  
  
    productChange(event) {
      let p = parseInt(event);
      let pid =  <GetCustomerProductData_Result>(this.productData.filter( i => i.id === p)[0]);
      this.itemEdit['idProduct'] = pid.idProduct;
      this.itemEdit['itemPrice'] = pid.currentPrice;
      this.itemEdit['itemDescription'] = pid.prodDescription;
      //this.itemEdit.idCustomerProduct = pid.id;
    }
  
    refreshItem() {

     this.editEntity(this.itemEdit.id); 
    }

    bindParentTotal() {

     
        let subtotal: number = 0;
        this.entList.subscribe((items) => {
          setTimeout(() => {
             this.setTotal(items);
           }, 1000);
        });
        
        
      

    }

    setTotal(items) {
      let subtotal: number = 0;
      items.forEach((itm) => {
            
        subtotal += itm['itemExtended'];
      });
      this.onUpdateTotal.emit({ subtotal: subtotal, setTotal: this.setTotal }); 
    }

  }
  