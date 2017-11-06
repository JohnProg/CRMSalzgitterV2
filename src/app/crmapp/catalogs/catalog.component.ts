import { Component, AfterViewInit, OnInit, ViewChild, ContentChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';


import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { MatSnackBar } from '@angular/material';
import { ActionsService } from '../services/actions.services';
import { CurrencyComponent } from './currency/currency.component';

import { MenuClass } from '../model/menuclass';
import { Subscription } from 'rxjs/Subscription';
import { BaseComponent } from './base.component';
import { TCRMEntity } from '../model/index';
import { EnumDocType } from '../constants/index';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'crm-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [  ]
})
export class CatalogComponent implements AfterViewInit, OnDestroy {

  @ViewChild(BaseComponent) headercomp: BaseComponent;

  scrId: number = 1;
  afterCreateItem: Subscription;
  afterItemLoaded: Subscription;
  idCustomer: number;
  catalogs: MenuClass[] = [
  ];
  quoteType : EnumDocType;

  idQuotation: number = 0;
  idOpp: number;
  itemRoute: string;
  parentRoute: string;
  parentScr: number = 5;
  moveToScr: boolean = false;

  constructor(
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MatSnackBar,
    public media: TdMediaService,
    public _actions: ActionsService,
    public _router: Router, public _route: ActivatedRoute,) {
  }

  ngAfterViewInit() {
    this.checkParams();
    this.afterInit();
  }

  checkParams() {
    this._route.params.subscribe((params: any) => {
      
      if( params != undefined) {
      this.idQuotation = params.id;
      
      if( params['parentRoute'] != undefined) this.parentRoute = params.parentRoute;
      if( params['scrId'] != undefined)  this.parentScr = params.scrId;
      if( params['moveToScr'] != undefined)  this.moveToScr = params.moveToScr == "true";
      }
    });
  }

  afterInit() {
       this.bindOnItemCreated();
  }


  ngOnDestroy() {
     if (this.afterCreateItem !== undefined) { this.afterCreateItem.unsubscribe(); }
     if (this.afterItemLoaded !== undefined) { this.afterItemLoaded.unsubscribe(); }
  }
  bindOnItemCreated() {

      if( this.headercomp ) {
        this.afterCreateItem = this.headercomp.onItemCreated.subscribe( (itm: TCRMEntity) => {
                this.doOnItemCreated(itm);
          } );
        this.afterItemLoaded = this.headercomp.onItemLoaded.subscribe( (itm: TCRMEntity) => {
              this.onItemLoaded(itm);
        });
      }
  }

  bindOnItemLoaded() {
     

  }

  doOnItemCreated(itm: TCRMEntity) { }

  onItemLoaded(itm: TCRMEntity) {
    this.afterOnItemLoaded();
  }

  afterOnItemLoaded() {
    
    if( this.parentRoute != undefined && this.moveToScr == true ) {
      this.scrId = this.parentScr;
    }
  }

  goToInex() {
    if( this.parentRoute != undefined && this.parentScr != undefined) {
      this._router.navigate([ '/' + this.parentRoute + '/edit/' + this.idOpp, {  parentRoute: this.parentRoute, scrId: this.parentScr, moveToScr: true  }]);
   }else {
     this._router.navigate([ '/' + this.itemRoute]);
   }
  }
}
