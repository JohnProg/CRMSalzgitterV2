import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor, EditordetailsumaryComponent } from '../../../../components/index';
import {TranslateService} from '@ngx-translate/core';
import { PurchaseOrderDetailSumary, PurchaseOrderDetailSumaryProperty, 
     Property, TCRMEntity, ProductProperty } from '../../../../model/allmodels';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-purchaseordereditordetailsumary',
  templateUrl: './purchaseordereditordetailsumary.component.html',
  styleUrls: ['./purchaseordereditordetailsumary.component.scss']
})
export class PurchaseordereditordetailsumaryComponent extends EditordetailsumaryComponent {

  itemEdit: PurchaseOrderDetailSumary;
  


  ngBeforeInit() {
    super.ngBeforeInit();
    this.catalogName = 'Purchase Order Details Sumary';
    this._curService.setAPI('PurchaseOrderDetailSumary', this.catalogName, this.loadName);
    this.refreshItemUrl = 'PurchaseOrderDetailSumary/searchByDetail';
    this.sumProperties = 'purchaseOrderDetailSumaryProperties';  
  }

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
