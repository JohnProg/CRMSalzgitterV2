import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';
import {  getProductProperties_Result, ProductProperty, Product } from '../../../../model/allmodels';

import { Observable ,  Observer ,  BehaviorSubject } from 'rxjs';
import { BaseComponent } from '../../../../catalogs/base.component';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn,
   } from '@covalent/core/data-table';

import { TdSearchBoxComponent } from '@covalent/core/search';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


import { Router, ActivatedRoute } from '@angular/router';


import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


export const propql = gql`
  query {
    properties { id name description }

  }
`;
@Component({
  selector: 'crm-productproperty',
  templateUrl: './productproperty.component.html',
  styleUrls: ['./productproperty.component.scss'],
  providers: [],
})
export class ProductpropertyComponent extends BaseComponent   {

  @Input() idproduct: number;
  sortBy: string = 'pOrder';
  // isEditProp: boolean = false;

  // _catList = <BehaviorSubject<getProductProperties_Result[]>>new BehaviorSubject([]);

  // propList: Observable<getProductProperties_Result[]>;
  // _props: getProductProperties_Result[] = new Array<getProductProperties_Result>();
  // dataStore: { properties: getProductProperties_Result[] };

  // propEdit: ProductProperty;
  
  // propColumns: ITdDataTableColumn[] = [
  // ];
  // catalogName: string;

  itemEdit: ProductProperty;
  loadName: string = 'productprop.load';
  
  ngBeforeInit() {
    super.ngBeforeInit();
    this.setTitle = false;
    this.subEditor = true;
    this.catalogName = 'Product Properties';
    this._curService.setAPI( 'ProductProperty/', this.catalogName, this.loadName);    
  }



  loadCatalogs() {
    let t = this;
    this._curService.loadQl(propql, undefined)
      .subscribe(({data}) => {
        this.catProperties = data['properties'];
      }, (error: Error) => {
        this._loadingService.resolve('');
        debugger
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      }
      );     
  }

  loadData() {
    let pparams = new URLSearchParams();
    pparams.set('prodId', this.idproduct.toString());
    pparams.set('idprop', '0');
    this._curService.loadCustomAll('ProductProperty/searchByProduct', pparams);
  }

  addColumns  () {
    
    this.columns.push({ name: 'pOrder', label: 'Order', tooltip: '' });
    this.columns.push({ name: 'name', label: 'Name', tooltip: '' });
    this.columns.push({ name: 'description', label: 'Description' });
    this.columns.push({ name: 'isRequired', label: 'Required' });
    //this.columns.push({ name: 'tActions', label: '' });
  }

  initEntity() {
    this.itemEdit = new  ProductProperty();
    this.itemEdit.idProduct = this.idproduct;
  }

  afterCreate(item: any) {
    this.isEditing = false;
  }

  afterUpdate(item: any) {
    this.isEditing = false;
  }
}
