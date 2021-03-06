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
import {  GetCustomerDeliverPoints_Result, Customer, CustomerDeliveryPoint, TCRMEntity, Colony } from '../../../../model/allmodels';
import { SelectcolonyComponent } from '../../../../components/index';
import { CustomerbaseComponent } from '../customerbase.component';


const custDelivType = gql`
  query {
    deliveryTypes { id name description }
  }
`;


@Component({
  selector: 'crm-customerdeliverypoint',
  templateUrl: './customerdeliverypoint.component.html',
  styleUrls: ['./customerdeliverypoint.component.scss']
})
export class CustomerdeliverypointComponent  extends CustomerbaseComponent {

  itemEdit: CustomerDeliveryPoint;
  catDelivType: TCRMEntity[];
  sortBy: 'cdpName';



  ngBeforeInit() {
    super.ngBeforeInit();
     this.catalogName = 'Delivery Point';
    this.catalog = 'CustomerDeliveryPoint';
    this._curService.setAPI( this.catalog + '/', this.catalogName, this.loadName); 
  }





  initEntity() {
    this.itemEdit = new  CustomerDeliveryPoint();
    this.itemEdit.idCustomer = this.idCustomer;
    this.itemEdit.isActive = true;
  }

  addColumns() {
    this.columns.push({ name: 'cdpName', label: 'Name' });
    this.columns.push({ name: 'cdpContact', label: 'Contact', tooltip: '' });
    this.columns.push({ name: 'colonyName', label: 'Colony' });
    this.columns.push({ name: 'stateName', label: 'State' });
    
    this.columns.push({ name: 'isActive', label: 'Active'});
  }


  customEditEntity(id: number, zip: string) {
    this.zipcode = zip;
    this.editEntity(id);
    
  }


  loadCatalogs() {

        this._curService.loadQl(custDelivType, undefined)
        .subscribe(({data}) => {
          
          this.catDelivType = data['deliveryTypes'];
        }, (error: Error) => {
          this._loadingService.resolve('');
          
          this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
        }
        );   
  }



}
