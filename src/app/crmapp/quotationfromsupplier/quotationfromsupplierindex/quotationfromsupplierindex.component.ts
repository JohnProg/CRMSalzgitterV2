import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }  from '@angular/platform-browser';
import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ActionsService } from '../../services/actions.services';
import { ConfigurationService } from '../../services/configuration.service';

import { Product } from '../../model/allmodels';
import { BaseComponent } from '../../catalogs/base.component';
import { getQuotationFromSupplier_Result } from '../../model/allmodels';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'crm-quotationfromsupplierindex',
  templateUrl: './quotationfromsupplierindex.component.html',
  styleUrls: ['./quotationfromsupplierindex.component.scss']
})
export class QuotationfromsupplierindexComponent extends BaseComponent  {


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
    public translate: TranslateService) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate);
    this.sortBy = 'Id';
    this.catalogName = 'Quotation from Supplier';
    this._curService.setAPI('QuotationFromSupplier/', this.catalogName);

  }



  ngOnInitClass() {
    this.entList = <Observable<getQuotationFromSupplier_Result[]>>this._curService.entList;
    this.initData();
    //this.reloadPaged();
  }

  editEntity(id: number) {

    this._router.navigate(['quotationfromsupplier/edit/' + id]);
  }


  addColumns() {

    //super.addColumns();
    this.columns.push({ name: 'Id', label: 'Quotation', tooltip: '' });
    this.columns.push({ name: 'IdOpportunity', label: 'Opportunity' });
    this.columns.push({ name: 'CurrencyName', label: 'Currency' });
    this.columns.push({ name: 'MillName', label: 'Mill' });
    this.columns.push({ name: 'PortName', label: 'Port' });
    this.columns.push({ name: 'SstatusName', label: 'Status' });
    this.columns.push({ name: 'DateReceived', label: 'Date' });
    this.columns.push({ name: 'AsImporter', label: 'As Importer' });
  }

}
