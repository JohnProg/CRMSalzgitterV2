import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent,  } from '../../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Router, ActivatedRoute } from '@angular/router';


import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  GetCustomerMarkets_Result, CustomerMarket, TCRMEntity, Colony, Market } from '../../../../model/index';
import { SelectcolonyComponent } from '../../../../components/index';
import { CustomerbaseComponent } from '../customerbase.component';



const custMarketQl = gql`
  query {
    markets { id name description }
  }
`;


@Component({
  selector: 'crm-customermarket',
  templateUrl: './customermarket.component.html',
  styleUrls: ['./customermarket.component.scss']
})
export class CustomermarketComponent extends CustomerbaseComponent {

  itemEdit: CustomerMarket;
  marketSelected: number[];


  ngBeforeInit() {
    super.ngBeforeInit();
     this.catalogName = 'Markets';
    this.catalog = 'CustomerMarket';
    this._curService.setAPI( this.catalog + '/', this.catalogName, this.loadName); 
  }





  initEntity() {
    this.itemEdit = new  CustomerMarket();
    this.itemEdit.idCustomer = this.idCustomer;
  }

  addColumns() {
    this.columns.push({ name: 'name', label: 'Name' });
    this.columns.push({ name: 'description', label: 'Description', tooltip: '' });
  }




  loadCatalogs() {

        this._curService.loadQl(custMarketQl, undefined)
        .subscribe(({data}) => {
          
          let t: Market[] = data['markets'];
          if( t !== undefined) {
             this.catProduct = new Array<TCRMEntity>();
             t.forEach( e => {
                   this.catProduct.push(e);
             });
            this.removeFromCatalog(undefined);          
          }
        }, (error: Error) => {
          this._loadingService.resolve('');
          
          this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
        }
        );   
  }

  submitForm(form) {
    
    let t = this.marketSelected;
    if ( form.valid &&  this.beforeSave() === true) {
      if( this.marketSelected.length > 0 ) {
        let items = new Array<CustomerMarket>();
        this.marketSelected.forEach(element => {
          let p = new CustomerMarket();
          p.idCustomer = this.idCustomer;
          p.idMarket = element;
          items.push(p);
        });
        this._curService.createArray(items);
      }
    } else {
      this._snackBarService.open('There are some errors, please review data ', 'Ok');
    }
  }

  afterLoadAll(itms: GetCustomerMarkets_Result[]) {
    this.isLoading = false;
    this.removeFromCatalog(itms);
  }

  ents: GetCustomerMarkets_Result[];
  notSelectedProducts: TCRMEntity[];
  removeFromCatalog(items: GetCustomerMarkets_Result[] ) {

    this.ents = items || this.ents;
    if( this.catProduct !== undefined && this.ents !== undefined ) {
    this.notSelectedProducts = new Array<TCRMEntity>();
    this.catProduct.forEach( element => {
        let idx = this.ents.findIndex( elem => { return elem.idMarket === element.id });
        if( idx < 0) {
            let tdx = this.catProduct.find( elem => { return elem.id === element.id })
            this.notSelectedProducts.push( tdx);
        } 
    });

    }
     this.marketSelected = [];
  }

  afterDelete(item: any) {
    super.afterDelete(item);
    this.removeFromCatalog(undefined);
  }

}
