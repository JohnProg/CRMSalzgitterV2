
import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';


import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import { BaseComponent } from '../base.component';
import { IncoTerm } from '../../model/allmodels';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'crm-incoterm',
  templateUrl: './incoterm.component.html',
  styleUrls: ['./incoterm.component.scss'],
    providers: [ ],
})
export class IncotermComponent extends BaseComponent {

  itemEdit: IncoTerm;
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
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate);    this.catalogName = 'IncoTerm';
    this._curService.setAPI('IncoTerm/', this.catalogName);
  }



  ngOnInit() {

    this.initData();
    this.entList = <Observable<IncoTerm[]>> this._curService.entList;
  }

  addColumns() {

    super.addColumns();
      this.columns.push({ name: 'deliveryRequired', label: 'Delivery Req.' });
    
  }

    editEntity( id: number ) {
      this.itemEdit = <IncoTerm>this._curService.itemEdit;
      this._curService.load(id);
    }


    addEntity() {
      this.itemEdit = new IncoTerm();
      this.itemEdit.Id = 0;

    }
}
