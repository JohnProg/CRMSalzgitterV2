import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';


import { Observable ,  Observer ,  BehaviorSubject } from 'rxjs';
import { BaseComponent,  } from '../../../../catalogs/base.component';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn,
   } from '@covalent/core/data-table';

import { TdSearchBoxComponent } from '@covalent/core/search';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


import { Router, ActivatedRoute } from '@angular/router';



import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  GetCustomerSectors_Result, CustomerSector, TCRMEntity, Colony, Sector } from '../../../../model/index';
import { SelectcolonyComponent } from '../../../../components/index';
import { CustomerbaseComponent } from '../customerbase.component';



const custMarketQl = gql`
  query {
    sectors { id name description }
  }
`;


@Component({
  selector: 'crm-customersector',
  templateUrl: './customersector.component.html',
  styleUrls: ['./customersector.component.scss']
})
export class CustomersectorComponent extends CustomerbaseComponent {

  itemEdit: CustomerSector;
  sectorSelected: number[];


  ngBeforeInit() {
    super.ngBeforeInit();
    this.catalogName = 'Sectors';
    this.catalog = 'CustomerSector';
    this._curService.setAPI( this.catalog + '/', this.catalogName, this.loadName);  
  }




  initEntity() {
    this.itemEdit = new  CustomerSector();
    this.itemEdit.idCustomer = this.idCustomer;
  }

  addColumns() {
    this.columns.push({ name: 'name', label: 'Name' });
    this.columns.push({ name: 'description', label: 'Description', tooltip: '' });
  }




  loadCatalogs() {

        this._curService.loadQl(custMarketQl, undefined)
        .subscribe(({data}) => {
          
          let t: Sector[] = data['sectors'];
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
    
    let t = this.sectorSelected;
    if ( form.valid &&  this.beforeSave() === true) {
      if( this.sectorSelected.length > 0 ) {
        let items = new Array<CustomerSector>();
        this.sectorSelected.forEach(element => {
          let p = new CustomerSector();
          p.idCustomer = this.idCustomer;
          p.idSector = element;
          items.push(p);
        });
        this._curService.createArray(items);
      }
    } else {
      this._snackBarService.open('There are some errors, please review data ', 'Ok');
    }
  }

  afterLoadAll(itms: GetCustomerSectors_Result[]) {
    this.isLoading = false;
    this.removeFromCatalog(itms);
  }

  ents: GetCustomerSectors_Result[];
  notSelectedProducts: TCRMEntity[];
  removeFromCatalog(items: GetCustomerSectors_Result[] ) {

    this.ents = items || this.ents;
    if( this.catProduct !== undefined && this.ents !== undefined ) {
    this.notSelectedProducts = new Array<TCRMEntity>();
    this.catProduct.forEach( element => {
        let idx = this.ents.findIndex( elem => { return elem.idSector === element.id });
        if( idx < 0) {
            let tdx = this.catProduct.find( elem => { return elem.id === element.id })
            this.notSelectedProducts.push( tdx);
        } 
    });

    }
     this.sectorSelected = [];
  }

  afterDelete(item: any) {
    super.afterDelete(item);
    this.removeFromCatalog(undefined);
  }

}
