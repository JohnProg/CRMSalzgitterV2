import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { TCRMEntity } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../base.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
@Component({
  selector: 'crm-department',
  templateUrl: '../base.component.html',
  styleUrls: ['../base.component.scss'],
  providers: [ ],
})
export class DepartmentComponent extends BaseComponent {



constructor(
public _confs: ConfigurationService,
public _loadingService: TdLoadingService,
public _dialogService: TdDialogService,
public _snackBarService: MdSnackBar,
public _actions: ActionsService,
public _mediaService: TdMediaService,
public _ngZone: NgZone, 
public _http: Http, 
public _tableService: TdDataTableService,
    public translate: TranslateService) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate);    this.catalogName = 'Department';
    this._curService.setAPI('Department/', this.catalogName);
  }



}
