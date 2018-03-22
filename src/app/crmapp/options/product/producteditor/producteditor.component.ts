import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import {  getProductProperties_Result, ProductProperty, Product } from '../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../catalogs/base.component';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn,
   } from '@covalent/core/data-table';

import { TdSearchBoxComponent } from '@covalent/core/search';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Router, ActivatedRoute } from '@angular/router';
import { ProductpropertyComponent } from '../producteditor/+productproperty/productproperty.component';


import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'crm-producteditor',
  templateUrl: './producteditor.component.html',
  styleUrls: ['./producteditor.component.scss'],
  providers: [],
})
export class ProducteditorComponent extends BaseComponent {


   itemEdit: Product;
@ViewChild(ProductpropertyComponent) _props: ProductpropertyComponent;


  ngBeforeInit() {
    super.ngBeforeInit();
    this.catalogName = 'Product';
    this._curService.setAPI('Product/', this.catalogName, this.loadName);
    this.singleEditor = true;
    this.autoLoad = false;   
  }



  afterViewInit(): void {
      this.route.params.subscribe((params: { id: number }) => {
      let itemId: number = params.id;
      if (itemId > 0) {
        this.editEntity(itemId);
      } else {
        
        this.addEntity();
      }

    });
    // this._actions.showAdd(false);
    // this._actions.showSearch(false);
    // this._actions.showSave(true);
    // this._actions.showCancel(true);
  }

  initEntity() {
    this.itemEdit = new  Product();
  }


  expandProperties() {

   //this._props.loadProperties();

  }

  cancelEdit(): void {
    this._router.navigate([ '../../'], { relativeTo: this.route });
  }

}
