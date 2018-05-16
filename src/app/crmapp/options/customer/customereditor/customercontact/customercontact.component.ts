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
