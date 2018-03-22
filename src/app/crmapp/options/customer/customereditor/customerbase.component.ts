import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent,  } from '../../../catalogs/base.component';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn,
   } from '@covalent/core/data-table';

import { TdSearchBoxComponent } from '@covalent/core/search';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Router, ActivatedRoute } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  Customer, TCRMEntity, Colony } from '../../../model/allmodels';
import { SelectcolonyComponent } from '../../../components/index';





@Component({
  selector: 'crm-customerbase',
  templateUrl: './customerbase.component.html',
  styleUrls: ['./customerbase.component.scss']
})
export class CustomerbaseComponent extends BaseComponent {

   @Input() idCustomer: number;
   @Input() customer: Customer;
   @ViewChild(SelectcolonyComponent) _colony: SelectcolonyComponent;

   catalog: string;
   colony: Colony;
  zipcode: string;

  loadData() {
    
      if ( this.isLoading === false ) {

        if ( this.dataLoaded === true ) {
          this.reloadPaged();
        } else {
          let pparams = new URLSearchParams();
          pparams.set('idcust', this.idCustomer.toString());
          this._curService.loadCustomAll( this.catalog + '/searchByCustomer', pparams);
          this.dataLoaded = true;
        }
      }
  }

  afterLoadItem(itm:  TCRMEntity) {
     this.isEditing = true;
     this.itemEdit = itm;
     this._actions.setEdit();
     setTimeout( () => {
      if( this._colony !== undefined) {
        this._colony.setZipCode(this.zipcode);
      }
     }, 100);
     //this.onItemLoaded.emit(itm);
  }




}
