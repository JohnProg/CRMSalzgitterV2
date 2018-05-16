import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';

import { Observable ,  Observer ,  BehaviorSubject } from 'rxjs';
import { BaseComponent } from '../../../../catalogs/base.component';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';

import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor, EditordetailsumaryComponent } from '../../../../components/index';

import { PurchaseOrderDetailSumary, PurchaseOrderDetailSumaryProperty, 
     Property, TCRMEntity, ProductProperty } from '../../../../model/allmodels';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



@Component({
  selector: 'crm-purchaseordereditordetailsumary',
  templateUrl: '../../../../components/editordetailsumary/editordetailsumary.component.html',
  styleUrls: ['./purchaseordereditordetailsumary.component.scss']
})
export class PurchaseordereditordetailsumaryComponent extends EditordetailsumaryComponent {

  itemEdit: PurchaseOrderDetailSumary;
  


  // ngBeforeInit() {
  //   super.ngBeforeInit();
  //   this.catalogName = 'Purchase Order Details Sumary';
  //   this._curService.setAPI('PurchaseOrderDetailSumary', this.catalogName, this.loadName);
  //   this.refreshItemUrl = 'PurchaseOrderDetailSumary/searchByDetail';
  //   this.sumProperties = 'purchaseOrderDetailSumaryProperties';  
  // }

  initEntity() {
    this.itemEdit = new PurchaseOrderDetailSumary() ;
    this.itemEdit.idPurchaseOrderDetail  = this.idDetail;
    this.itemEdit.idDetail = this.idDetail;
    this.itemEdit.dateCreated = new Date();
    this.itemEdit.price = this.price;
    this.itemEdit.quantity = this.maxQty;
    this.initDetails();
  }


 prepareToSave() {
    this.pdetails.forEach( (t: PurchaseOrderDetailSumaryProperty[]) => {
      this.itemEdit.purchaseOrderDetailSumaryProperties = new Array<PurchaseOrderDetailSumaryProperty>();
      t.forEach( (o: PurchaseOrderDetailSumaryProperty ) => {
            let p: PurchaseOrderDetailSumaryProperty = new PurchaseOrderDetailSumaryProperty();
            p.idPurchaseOrderDetailSumary = o.idPurchaseOrderDetailSumary;
            p.idProperty = o.idProperty;
            p.propertyValue = o.propertyValue;
            this.itemEdit.purchaseOrderDetailSumaryProperties.push(p);
      });
    });
 }

}
