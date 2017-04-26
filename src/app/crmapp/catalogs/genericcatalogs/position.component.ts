import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';


import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../base.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';


@Component({
  selector: 'crm-position',
  templateUrl: '../base.component.html',
  styleUrls: ['../base.component.scss'],
  providers: [ ],
})
export class PositionComponent extends BaseComponent {


 constructor(
public _confs: ConfigurationService,
public _loadingService: TdLoadingService,
public _dialogService: TdDialogService,
public _snackBarService: MdSnackBar,
public _actions: ActionsService,
public _mediaService: TdMediaService,
public _ngZone: NgZone, 
public _http: Http, 
public _tableService: TdDataTableService) {
super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService);
    this.catalogName = 'Position';
    this._curService.setAPI('Position/', this.catalogName);
  }



}
