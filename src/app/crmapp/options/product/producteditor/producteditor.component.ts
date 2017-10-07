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
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductpropertyComponent } from '../producteditor/+productproperty/productproperty.component';

import {TranslateService} from '@ngx-translate/core';
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


  ngOnInitClass() {
    this.entList = <Observable<getProductProperties_Result[]>>this._curService.entList;
    this.initEntity();


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
