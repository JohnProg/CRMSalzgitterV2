import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { CatalogService } from '../../../services/catalog.service';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { ConfigurationService } from '../../../services/configuration.service';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';

import { Customer } from '../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../catalogs/base.component';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-customerindex',
  templateUrl: './customerindex.component.html',
  styleUrls: ['./customerindex.component.scss']
})
export class CustomerindexComponent  extends BaseComponent  {

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
    public _router: Router,
    public route: ActivatedRoute,
    public apollo: Apollo) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, route, apollo);
 

    this.catalogName = 'Customer';
    this._curService.setAPI('Customer/', this.catalogName);
  }

  ngOnInitClass() {
    this.entList = <Observable<Customer[]>>this._curService.entList;
    this.initData();
    this.reloadPaged();
  }

  editEntity(id: number) {

    this._router.navigate(['options/customer/edit/' + id]);
  }


  addEntity() {

    this._router.navigate(['options/customer/edit/' + 0]);
  }


  addColumns() {

    //super.addColumns();
    this.columns.push({ name: 'name', label: 'Name', tooltip: '' });
    this.columns.push({ name: 'rfc', label: 'RFC' })
    this.columns.push({ name: 'phone', label: 'Phone' })
  }

}