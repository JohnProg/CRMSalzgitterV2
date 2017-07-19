import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ViewChild, ContentChild, NgZone } from '@angular/core';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }  from '@angular/platform-browser';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ActionsService } from '../../../services/actions.services';
import { ConfigurationService } from '../../../services/configuration.service';

import {  GetPurchaseOrder_Result, PurchaseOrder } from '../../../model/index';
import { EnumDocType } from '../../../constants/index';

import { BaseComponent } from '../../../catalogs/base.component';

import {TranslateService} from '@ngx-translate/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
@Component({
  selector: 'crm-purchaseorderindexviewer',
  templateUrl: './purchaseorderindexviewer.component.html',
  styleUrls: ['./purchaseorderindexviewer.component.scss']
})
export class PurchaseorderindexviewerComponent extends BaseComponent  {

  @Input() idQFS: number = 0;
  @Input() idOpp: number = 0;
  @Input() idQTS: number = 0;
  byType: number = 0;

  constructor( public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone,
    private _router: Router,
    public _http: Http, 
    public _tableService: TdDataTableService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public apollo: Apollo) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, route, apollo);
 
    this.sortBy = 'id';
    this.catalogName = 'Purchase Order';
    this._curService.setAPI('PurchaseOrder/', this.catalogName);
    this.route.params.subscribe((params: { id: number, bytype: number }) => {
      this.byType = params.bytype;
      switch(params.bytype) {
        case EnumDocType.Opportunity:
             this.idOpp = params.id;
             break;
        case EnumDocType.QuotationFromSupplier:
             this.idQFS = params.id;
             break;
        case EnumDocType.QuotationToCustomer:
             this.idQTS = params.id;
             break;
        default:
             break;
      }
    });
  }


  loadData() {

    if( this.byType > 0) {
        let pparams = new URLSearchParams();
        pparams.set('idquote', this.idOpp === 0 ?  this.idQFS.toString() : '0');
        pparams.set('bytype', this.idOpp > 0 ? this.idOpp.toString() : '0');
        this._curService.loadCustomAll('PurchaseOrder/searchBy', pparams);
        this.dataLoaded = true;
    } else {
      super.loadData();
    }
  }

  ngOnInitClass() {
    this.entList = <Observable<GetPurchaseOrder_Result[]>>this._curService.entList;
    this.initData();
    //this.reloadPaged();
  }

  editEntity(id: number) {
    this._router.navigate(['purchaseorder/edit/' + id]);
  }


  addEntity() {
    if( this.idQFS > 0) {
      this._router.navigate(['/purchaseorder/createfromquote/', this.idQFS]);
    } else {
      this._router.navigate(['/purchaseorder/edit/', 0]);
    }
  }


  addColumns() {

    //super.addColumns();
    this.columns.push({ name: 'id', label: 'Quotation', tooltip: '' });
    if(( this.idQFS === undefined || this.idQFS === 0) && ( this.idOpp === undefined || this.idOpp === 0) ) {
      this.columns.push({ name: 'customerName', label: 'Customer' });
    }
    this.columns.push({ name: 'idQuotationToCustomer', label: 'QTC' });
    this.columns.push({ name: 'currencyName', label: 'Currency' });
    this.columns.push({ name: 'millName', label: 'Mill' });
    this.columns.push({ name: 'sstatusName', label: 'Status' });
    this.columns.push({ name: 'dateReceived', label: 'Date' });
  }

}
