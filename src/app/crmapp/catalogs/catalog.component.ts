import { Component, AfterViewInit, OnInit, ViewChild, ContentChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';


import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import { ActionsService } from '../services/actions.services';
import { CurrencyComponent } from './currency/currency.component';

import { MenuClass } from '../model/menuclass';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from './base.component';
import { TCRMEntity } from '../model/index';

@Component({
  selector: 'crm-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [  ]
})
export class CatalogComponent implements AfterViewInit, OnDestroy {

  @ViewChild(BaseComponent) headercomp: BaseComponent;
  afterCreateItem: Subscription;
  catalogs: MenuClass[] = [
  ];

  constructor(
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public media: TdMediaService,
    public _actions: ActionsService) {
  }

  ngAfterViewInit() {
    this.afterInit();
  }

  afterInit() {
       this.bindOnItemCreated();
  }


  ngOnDestroy() {
     if (this.afterCreateItem !== undefined) { this.afterCreateItem.unsubscribe(); }

  }
  bindOnItemCreated() {

      if( this.headercomp ) {
        this.afterCreateItem = this.headercomp.onItemCreated.subscribe( (itm: TCRMEntity) => {
                this.doOnItemCreated(itm);
          } );
      }
  }

  doOnItemCreated(itm: TCRMEntity) { }
}
