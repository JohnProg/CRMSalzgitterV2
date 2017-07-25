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

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';


import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  GetCustomerProducts_Result, CustomerProduct, TCRMEntity, Colony, Product } from '../../../../model/allmodels';
import { SelectcolonyComponent } from '../../../../components/index';
import { CustomerbaseComponent } from '../customerbase.component';



const custProductQl = gql`
  query {
    products { id name description }
  }
`;

@Component({
  selector: 'crm-customerproduct',
  templateUrl: './customerproduct.component.html',
  styleUrls: ['./customerproduct.component.scss']
})
export class CustomerproductComponent  extends CustomerbaseComponent {

  itemEdit: CustomerProduct;

  constructor( public _router: Router,  
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
    super( _router, _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, route, apollo);
 
    this.catalogName = 'Customer Products';
    this.catalog = 'CustomerProduct';
    this._curService.setAPI( this.catalog + '/', this.catalogName);
  }


  ngOnInitClass() {
    super.ngOnInitClass();
    this.entList = <Observable<GetCustomerProducts_Result[]>>this._curService.entList;

  }



  initEntity() {
    this.itemEdit = new  CustomerProduct();
    this.itemEdit.idCustomer = this.idCustomer;
  }

  addColumns() {
    this.columns.push({ name: 'prodDescription', label: 'Prod. Description', tooltip: '' });
    this.columns.push({ name: 'buyerName', label: 'Buyer Name' });
    this.columns.push({ name: 'name', label: 'Material', tooltip: '' });
    this.columns.push({ name: 'partNumberBuyer', label: 'Part #', tooltip: '' });
    
  }




  loadCatalogs() {

        this._curService.loadQl(custProductQl, undefined)
        .subscribe(({data}) => {
          this.catProduct = data['products'];
        }, (error: Error) => {
          this._loadingService.resolve('');
          
          this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
        }
        );   
  }

  // submitForm(form) {
    
  //   if ( form.valid &&  this.beforeSave() === true) {
  //     if( this.prodSelected.length > 0 ) {
  //       let items = new Array<CustomerProduct>();
  //       this.prodSelected.forEach(element => {
  //         let p = new CustomerProduct();
  //         p.idCustomer = this.idCustomer;
  //         p.idProduct = element;
  //         items.push(p);
  //       });
  //       this._curService.createArray(items);
  //     }
  //   } else {
  //     this._snackBarService.open('There are some errors, please review data ', 'Ok');
  //   }
  // }



}