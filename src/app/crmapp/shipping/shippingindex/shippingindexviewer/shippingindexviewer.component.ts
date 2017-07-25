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

import {  GetShippings_Result, Shipping } from '../../../model/index';
import { EnumDocType } from '../../../constants/index';

import { BaseComponent } from '../../../catalogs/base.component';

import {TranslateService} from '@ngx-translate/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'crm-shippingindexviewer',
  templateUrl: './shippingindexviewer.component.html',
  styleUrls: ['./shippingindexviewer.component.scss']
})
export class ShippingindexviewerComponent extends BaseComponent  {

  @Input() idPo: number = 0;

  byType: number = 0;

  constructor( public _curService: CatalogService, 
    public _confs: ConfigurationService,
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
    this.catalogName = 'Shippings';
    this._curService.setAPI('Shipping/', this.catalogName);
    this.route.params.subscribe((params: { id: number}) => {
      this.idPo = params.id;
      
    });
  }


  loadData() {

    if( this.idPo > 0) {
        let pparams = new URLSearchParams();
        pparams.set('idpo', this.idPo.toString());
        this._curService.loadCustomAll('Shipping/searchBy', pparams);
        this.dataLoaded = true;
    } else {
      super.loadData();
    }
  }

  ngOnInitClass() {
    this.entList = <Observable<GetShippings_Result[]>>this._curService.entList;
    this.initData();
    //this.reloadPaged();
  }

  editEntity(id: number) {
    this._router.navigate(['purchaseorder/edit/' + id]);
  }


  addEntity() {
    if( this.idPo > 0) {
      this._router.navigate(['/shipping/createfrompo/', this.idPo]);
    } else {
      this._router.navigate(['/shipping/edit/', 0]);
    }
  }


  addColumns() {

    //super.addColumns();
    this.columns.push({ name: 'id', label: 'Shipping', tooltip: '' });
    if(( this.idPo === undefined || this.idPo === 0)  ) {
      this.columns.push({ name: 'customerName', label: 'Customer' });
    }
    this.columns.push({ name: 'statusName', label: 'Status' });
    this.columns.push({ name: 'blNumber', label: 'BLNumber' });
    this.columns.push({ name: 'blDate', label: 'BL Date' });
    this.columns.push({ name: 'cdpName', label: 'Delivery Point' });
    this.columns.push({ name: 'userName', label: 'Created by' });
  }

}
