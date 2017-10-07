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

  ngOnInitClass() {
    super.ngOnInitClass();
    this.entList = <Observable<GetCustomerDeliverPoints_Result[]>>this._curService.entList;

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
