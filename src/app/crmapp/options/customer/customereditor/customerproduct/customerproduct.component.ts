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
import {  GetCustomerProducts_Result, CustomerProduct, TCRMEntity, 
         Colony, Product, CustomerProductExtended, ProductProperty, CustomerProductProperty  } from '../../../../model/allmodels';
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
  prodProps: ProductProperty[];


  ngBeforeInit() {
    super.ngBeforeInit();
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
        this.columns.push({ name: 'productName', label: 'Material', tooltip: '' });
    this.columns.push({ name: 'platform', label: 'Platform', tooltip: '' });


    this.columns.push({ name: 'spec', label: 'Spec' });
    this.columns.push({ name: 'thickness', label: 'Thickness', tooltip: '' });
    this.columns.push({ name: 'width', label: 'Width', tooltip: '' });
    this.columns.push({ name: 'partNumberBuyer', label: 'Part buyer', tooltip: '' });
    this.columns.push({ name: 'partNumberOEM', label: 'Part OEM', tooltip: '' });
    
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


   changeAuto(event) {
     

      if( this.itemEdit.idProduct > 0 && this.itemEdit.isAutomotive == true ) {
         this.getProperties();
      } else {
        this.itemEdit.customerProductProperties = undefined;
      }
    
   }

  changeProduct(event) {
    
      if( this.itemEdit.idProduct && this.itemEdit.isAutomotive == true  ) {
         this.getProperties();
      } else {
        this.itemEdit.customerProductProperties = undefined;
      }
  }


  getProperties() {
    let pparams: TCRMEntity[] = new Array<TCRMEntity>();
    pparams.push( (<TCRMEntity>{ name: 'prodId', description: this.itemEdit.idProduct.toString()}) );
            this._curService.loadCustomCatalogObs('ProductProperty/searchByProductProp', pparams)
            .map((response) => response.json())
            .subscribe( (items: ProductProperty[]) => {
                this.prodProps = items;
                this.itemEdit.customerProductProperties = new Array< CustomerProductProperty>();
                items.forEach( (p: ProductProperty) => {
                      let pp: CustomerProductProperty = new CustomerProductProperty();
                      pp.idCustomerProduct = this.itemEdit.id;
                      pp.idProperty = p.idProperty;
                      pp.propertyValue = undefined;
                      pp.property = p.property;
                      this.itemEdit.customerProductProperties.push(pp);
                });
            });
  }

   afterLoadItem(itm:  CustomerProduct) {
     
     if( itm.customerProductExtended === null ) itm.customerProductExtended = new CustomerProductExtended();
     super.afterLoadItem(itm);
  }

}
