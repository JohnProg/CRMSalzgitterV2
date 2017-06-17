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

import { Product } from '../../../model/allmodels';
import { BaseComponent } from '../../../catalogs/base.component';
import { getQuotationFromSupplier_Result } from '../../../model/allmodels';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'crm-quotationfromsupplierindexviewer',
  templateUrl: './quotationfromsupplierindexviewer.component.html',
  styleUrls: ['./quotationfromsupplierindexviewer.component.scss']
})
export class QuotationfromsupplierindexviewerComponent  extends BaseComponent  {

  @Input() idOpp: number = 0;
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
    public _route: ActivatedRoute,
    public translate: TranslateService) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, _route);
    this.sortBy = 'Id';
    this.catalogName = 'Quotation from Supplier';
    this._curService.setAPI('QuotationFromSupplier/', this.catalogName);
    this._route.params.subscribe((params: { id: number }) => {
      this.idOpp = params.id;
    });
  }


  loadData() {

    if( this.idOpp > 0) {
        let pparams = new URLSearchParams();
        pparams.set('idopp', this.idOpp.toString());
        pparams.set('idtype', '0');
        this._curService.loadCustomAll('QuotationFromSupplier/searchByOpp', pparams);
        this.dataLoaded = true;
    } else {
      super.loadData();
    }
  }

  ngOnInitClass() {
    this.entList = <Observable<getQuotationFromSupplier_Result[]>>this._curService.entList;
    this.initData();
    //this.reloadPaged();
  }

  editEntity(id: number) {
    this._router.navigate(['quotationfromsupplier/edit/' + id]);
  }


  addEntity() {
    if( this.idOpp > 0) {
      this._router.navigate(['/quotationfromsupplier/createfromopp/', this.idOpp]);
    } else {
      this._router.navigate(['/quotationfromsupplier/edit/', 0]);
    }
  }


  addColumns() {

    //super.addColumns();
    this.columns.push({ name: 'Id', label: 'Quotation', tooltip: '' });
    if( this.idOpp === undefined || this.idOpp === 0 ) {
      this.columns.push({ name: 'CustomerName', label: 'Customer' });
    }
    this.columns.push({ name: 'IdOpportunity', label: 'Opportunity' });
    this.columns.push({ name: 'CurrencyName', label: 'Currency' });
    this.columns.push({ name: 'MillName', label: 'Mill' });
    this.columns.push({ name: 'PortName', label: 'Port' });
    this.columns.push({ name: 'SstatusName', label: 'Status' });
    this.columns.push({ name: 'DateReceived', label: 'Date' });
    this.columns.push({ name: 'AsImporter', label: 'As Importer' });
  }

}
