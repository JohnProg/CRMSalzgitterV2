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



@Component({
  selector: 'crm-purchaseordereditordetailsumary',
  templateUrl: './purchaseordereditordetailsumary.component.html',
  styleUrls: ['./purchaseordereditordetailsumary.component.scss']
})
export class PurchaseordereditordetailsumaryComponent extends EditordetailsumaryComponent {


  itemEdit: PurchaseOrderDetailSumary;
  
  constructor(public _router: Router, public _route: ActivatedRoute, 
    public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone, 
    public _http: Http, 
    public _tableService: TdDataTableService,
    public translate: TranslateService,
    public route: ActivatedRoute) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, route);

    this.catalogName = 'Purchase Order Details Sumary';
    this._curService.setAPI('PurchaseOrderDetailSumary', this.catalogName);
    this.refreshItemUrl = 'PurchaseOrderDetailSumary/searchByDetail';
    this.sumProperties = 'PurchaseOrderDetailSumaryProperties';
  }



   
  initEntity() {
    
    this.itemEdit = new PurchaseOrderDetailSumary() ;
    this.itemEdit.IdPurchaseOrderDetail  = this.idDetail;
    this.itemEdit.IdDetail = this.idDetail;
    this.itemEdit.DateCreated = new Date();
    this.itemEdit.Price = this.price;
    this.itemEdit.Quantity = this.maxQty;
    this.initDetails();
  }


 prepareToSave() {
    this.pdetails.forEach( (t: PurchaseOrderDetailSumaryProperty[]) => {
      this.itemEdit.PurchaseOrderDetailSumaryProperties = new Array<PurchaseOrderDetailSumaryProperty>();
      t.forEach( (o: PurchaseOrderDetailSumaryProperty ) => {
            let p: PurchaseOrderDetailSumaryProperty = new PurchaseOrderDetailSumaryProperty();
            p.IdPurchaseOrderDetailSumary = o.IdPurchaseOrderDetailSumary;
            p.IdProperty = o.IdProperty;
            p.PropertyValue = o.PropertyValue;
            this.itemEdit.PurchaseOrderDetailSumaryProperties.push(p);
      });
    });
 }

}
