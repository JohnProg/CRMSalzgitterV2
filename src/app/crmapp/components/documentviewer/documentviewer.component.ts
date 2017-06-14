import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import {TranslateService} from '@ngx-translate/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';


import { ActionsService } from '../../services/actions.services';
import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

import { BaseComponent } from '../../catalogs/base.component';
import {  BaseDocument  } from '../../model/allmodels';

@Component({
  selector: 'crm-documentviewer',
  templateUrl: './documentviewer.component.html',
  styleUrls: ['./documentviewer.component.scss']
})
export class DocumentviewerComponent extends BaseComponent {

 @Input() idParent: number = 0;
 @Input() baseApi: string;

 sortBy: string = 'DocTypeName';
 itemEdit: BaseDocument;

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
    public translate: TranslateService,
    public route: ActivatedRoute) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, route);

  }

 ngOnInitClass() {
    this._curService.setAPI( this.baseApi + '/', this.catalogName);
    this.entList = <Observable<BaseDocument[]>>this._curService.entList;
    this.initData();
  }

 initData() {
    let pparams = new URLSearchParams();
    pparams.set('iddialog', '0');
    pparams.set('idparent', this.idParent.toString());
    this._curService.loadCustomAll( this.baseApi + '/searchBy', pparams);
    this.initEntity();
  }

  addColumns() {
     this.columns.push({ name: 'DocTypeName', label: 'Doc. Type' });
     this.columns.push({ name: 'DateUploaded', label: 'Date Uploaded', tooltip: '' });
     this.columns.push({ name: 'DocName', label: 'Document Name' });
  }

  downLoad() {}
  
  initEntity() {
    this.itemEdit = new  BaseDocument();
  }

}
