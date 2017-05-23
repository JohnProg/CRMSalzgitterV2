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
import { GetOpportunities } from '../../model/allmodels';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'crm-opportunityindex',
  templateUrl: './opportunityindex.component.html',
  styleUrls: ['./opportunityindex.component.scss'],
  providers: []
})
export class OpportunityindexComponent extends BaseComponent  {


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
    this.catalogName = 'Opportunity';
    this._curService.setAPI('Opportunity/', this.catalogName);

  }





  ngOnInitClass() {
    this.entList = <Observable<GetOpportunities[]>>this._curService.entList;
    this.initData();
    //this.reloadPaged();
  }

  reloadPaged(sText: string = undefined) {
    this._curService.getPaged(this.getPageParams(sText));
  }


  editEntity(id: number) {

    this._router.navigate(['opportunity/edit/' + id]);
  }


  addColumns() {

    //super.addColumns();
    this.columns.push({ name: 'Id', label: 'Opportunity', tooltip: '' });
    this.columns.push({ name: 'CustomerName', label: 'Customer Name' });
    this.columns.push({ name: 'ProjectName', label: 'Project Name' });
    this.columns.push({ name: 'AsImporter', label: 'IOR' });
    this.columns.push({ name: 'StatusName', label: 'Status' });
    this.columns.push({ name: 'LastUpdated', label: 'Last Update' });

  }

}
