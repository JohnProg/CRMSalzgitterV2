import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';


import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { MdSnackBar } from '@angular/material';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Currency } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../base.component';




@Component({
  selector: 'crm-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  providers: [],

})
export class CurrencyComponent extends BaseComponent {



  itemEdit: Currency;
  
  constructor( public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone) {
    super(_curService, _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone);
    this.catalogName = 'Currencies';
    this._curService.setAPI('Currency', this.catalogName);
  }

  ngOnInitClass() {
    this.entList = <Observable<Currency[]>>this._curService.entList;
    this.initData();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();


  }



  addColumns() {
    super.addColumns();
    this.columns.push({ name: 'ASign', label: 'Currency symbol' });
  }


  editEntity(id: number) {
    this._actions.updateTitle('Edit ' + this.catalogName);
    this.itemEdit = <Currency>this._curService.itemEdit;
    this._curService.load(id);
  }

  addEntity() {

    this._actions.updateTitle('Add ' + this.catalogName);
    this.itemEdit = new Currency();
    this.itemEdit.Id = 0;

  }






}
