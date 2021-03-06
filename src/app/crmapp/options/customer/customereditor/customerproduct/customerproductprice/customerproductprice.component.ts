import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../../services/actions.services';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn,
   } from '@covalent/core/data-table';

import { TdSearchBoxComponent } from '@covalent/core/search';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


import { CatalogService, CURRENCY_FORMAT, DATE_FORMAT } from '../../../../../services/catalog.service';
import { ConfigurationService } from '../../../../../services/configuration.service';
import { CustomerProductPrice, TCRMEntity } from '../../../../../model/allmodels';

import { Observable } from 'rxjs';
import { BaseComponent } from '../../../../../catalogs/base.component';

import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { QueryResponse } from '../../../../../model/queries/index';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { IDeleteEventModel } from '../../../../../model/deleteeventmodel';
import * as moment from 'moment';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'crm-customerproductprice',
  templateUrl: './customerproductprice.component.html',
  styleUrls: ['./customerproductprice.component.scss']
})
export class CustomerproductpriceComponent extends BaseComponent {


  @Input() idParent: number = 0;
  itemEdit: CustomerProductPrice;
  sortBy: string = 'validFrom';
  loadName: string = 'price.load';

  ngBeforeInit() {
    super.ngBeforeInit();
    this.setTitle = false;
    this.subEditor = true;
    this.catalogName = 'Prices';
    
    this._curService.setAPI('CustomerProductPrice', this.catalogName, this.loadName);   
  }
  



  initEntity() {
    this.itemEdit = new  CustomerProductPrice();
    this.itemEdit.idCustomerProduct = this.idParent;
  }


  loadData() {
    let oparams: URLSearchParams = new URLSearchParams();
    oparams.set('idcust', this.idParent.toString());
    this._curService.loadCustomAll('CustomerProductPrice/searchByCustomerProduct', oparams);
  }

  addColumns() {
    //super.addColumns();
    this.columns.push({ name: 'validFrom', label: 'Valid From', numeric: false, format: DATE_FORMAT });
    this.columns.push({ name: 'validTo', label: 'Valid To', numeric: false, format: DATE_FORMAT });
    this.columns.push({ name: 'price', label: 'Price', numeric: true, format: CURRENCY_FORMAT, sortable: false  });
  }


  editEntity(id: number) {

    this.itemEdit = <CustomerProductPrice>this._curService.itemEdit;
    this._curService.load(id);
  }

  confirmDelete(item:  CustomerProductPrice) {
    this.itemEdit = item;
    
    this._actions.deleteItemEvent.emit( (<IDeleteEventModel>{ title: moment(item.validFrom).format(environment.dateFormat), objId: this.objId }) );
  }

  afterCreate(item: any) {
    Object.assign(this.itemEdit, item);
    this.isEditing = false;
  }

    afterUpdate(item: any) {

    Object.assign(this.itemEdit, item);
    this.isEditing = false;

  }
  
}
