import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn,
   } from '@covalent/core/data-table';

import { TdSearchBoxComponent } from '@covalent/core/search';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Product, getProductProperties_Result } from '../../model/allmodels';

import { Observable } from 'rxjs';
import { BaseComponent } from '../../catalogs/base.component';

import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { QueryResponse } from '../../model/queries/index';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



@Component({
  selector: 'crm-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends BaseComponent  {

  itemEdit: Product;
  
  ngBeforeInit() {
    super.ngBeforeInit();
    this.catalogName = 'Products';
    this._curService.setAPI('Product', this.catalogName, this.loadName);
  }



  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  editEntity(id: number) {

    //this.itemEdit = <Product>this._curService.itemEdit;
    this._curService.load(id);

    //this._curService.loadQl( gCurrency, { ssid: id }, 'currency' );

  }
}
