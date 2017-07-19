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
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'crm-quotationtocustomerindexviewer',
  templateUrl: './quotationtocustomerindexviewer.component.html',
  styleUrls: ['./quotationtocustomerindexviewer.component.scss']
})
export class QuotationtocustomerindexviewerComponent  extends BaseComponent  {

  @Input() idQFS: number = 0;
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
    public translate: TranslateService,
    public route: ActivatedRoute,
    public apollo: Apollo) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, route, apollo);
 
    this.sortBy = 'id';
    this.catalogName = 'Quotation to Customer';
    this._curService.setAPI('QuotationToCustomer/', this.catalogName);
    this.route.params.subscribe((params: { id: number }) => {
      this.idQFS = params.id;
    });
  }


  loadData() {

    if( this.idQFS > 0 || this.idOpp > 0) {
        let pparams = new URLSearchParams();
        pparams.set('idquote', this.idOpp === 0 ?  this.idQFS.toString() : '0');
        pparams.set('idopp', this.idOpp > 0 ? this.idOpp.toString() : '0');
        this._curService.loadCustomAll('QuotationToCustomer/searchByQFS', pparams);
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
    this._router.navigate(['quotationtocustomer/edit/' + id]);
  }


  addEntity() {
    if( this.idQFS > 0) {
      this._router.navigate(['/quotationtocustomer/createfromquote/', this.idQFS]);
    } else {
      this._router.navigate(['/quotationtocustomer/edit/', 0]);
    }
  }


  addColumns() {

    //super.addColumns();
    this.columns.push({ name: 'id', label: 'Quotation', tooltip: '' });
    if(( this.idQFS === undefined || this.idQFS === 0) && ( this.idOpp === undefined || this.idOpp === 0) ) {
      this.columns.push({ name: 'customerName', label: 'Customer' });
    }
    this.columns.push({ name: 'idQuotationFromSupplier', label: 'QFS' });
    this.columns.push({ name: 'currencyName', label: 'Currency' });
    this.columns.push({ name: 'millName', label: 'Mill' });
    this.columns.push({ name: 'sstatusName', label: 'Status' });
    this.columns.push({ name: 'dateReceived', label: 'Date' });
  }

}
