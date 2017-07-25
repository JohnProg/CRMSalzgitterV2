import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { ReactiveFormsModule, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { Shipping, TCRMEntity } from '../../../model/allmodels';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseOppComponent } from '../../../catalogs/index';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';
import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



@Component({
  selector: 'crm-shippingeditorheader',
  templateUrl: './shippingeditorheader.component.html',
  styleUrls: ['./shippingeditorheader.component.scss']
})
export class ShippingeditorheaderComponent extends BaseOppComponent {

  itemEdit: Shipping;
  dta: Date;
  constructor(public _router: Router, 
    public _route: ActivatedRoute,
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
    public route: ActivatedRoute,
    public apollo: Apollo) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, route, apollo);
 
    this.itemEdit = new Shipping();
    this.catalogName = 'Shipping';
    this.autoLoad = false;
    this._curService.setAPI('Shipping/', this.catalogName);
    this.singleEditor = true;
  }


  ngOnInitClass() {
    this.entList = <Observable<Shipping[]>>this._curService.entList;
  }


  initEntity() {
    this.itemEdit = new  Shipping();
    this.itemEdit.idStatus = 1;
  }

  afterLoadItem(item: Shipping) {
    super.afterLoadItem(item);
    this.loadCountryOrigin(item.idMill);
  }


}

