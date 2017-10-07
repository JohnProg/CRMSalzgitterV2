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
import { CustomerContact, getCustomerContacts_Result,  Customer, TCRMEntity, Colony } from '../../../../model/allmodels';
import { SelectcolonyComponent } from '../../../../components/index';
import { CustomerbaseComponent } from '../customerbase.component';


const custContactQl = gql`
  query {
    positions { id name description }
  }
`;


@Component({
  selector: 'crm-customercontact',
  templateUrl: './customercontact.component.html',
  styleUrls: ['./customercontact.component.scss']
})
export class CustomercontactComponent extends CustomerbaseComponent {

  itemEdit: CustomerContact;



  ngBeforeInit() {
    super.ngBeforeInit();
     this.catalogName = 'Customer Contact';
    this.catalog = 'CustomerContact';
    this._curService.setAPI( this.catalog + '/', this.catalogName, this.loadName); 
  }

  ngOnInitClass() {
    super.ngOnInitClass();
    this.entList = <Observable<getCustomerContacts_Result[]>>this._curService.entList;

  }



  initEntity() {
    this.itemEdit = new  CustomerContact();
    this.itemEdit.idCustomer = this.idCustomer;
  }

  addColumns() {
    this.columns.push({ name: 'name', label: 'Name' });
    this.columns.push({ name: 'nickName', label: 'Nickname', tooltip: '' });

    this.columns.push({ name: 'name1', label: 'Position' });
    this.columns.push({ name: 'email', label: 'E-Mail' });
    this.columns.push({ name: 'cellPhone', label: 'Cell Phone'});
  }


  // afterLoadItem(itm:  CustomerContact) {
  //   //super.afterLoadItem(itm);
    
  //   //this._colony.setZipCode(itm.colony.zipCode);
  // }


  loadCatalogs() {

        this._curService.loadQl(custContactQl, undefined)
        .subscribe(({data}) => {
          this.catPosition = data['positions'];
        }, (error: Error) => {
          this._loadingService.resolve('');
          
          this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
        }
        );   
  }



}
