import { Component, AfterViewInit, OnInit, ViewChild, ContentChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';


import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn, TdDialogService
} from '@covalent/core';

import { TdLoadingService } from '@covalent/core/loading';

import { TdMediaService } from '@covalent/core/media';

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
export class CatalogComponent implements AfterViewInit, OnDestroy    {

  @ViewChild(BaseComponent) headercomp: BaseComponent;

  scrId: number = 1;
  afterCreateItem: Subscription;
  afterItemLoaded: Subscription;
  afterItemUpdated: Subscription;
  onCancelEdit: Subscription;
  idCustomer: number;
  catalogs: MenuClass[] = [
  ];
  quoteType : EnumDocType;

  idQuotation: number = 0;
  idOpp: number;
  idParent: number;
  itemRoute: string;
  parentRoute: string;
  parentScr: number = 5;
  moveToScr: boolean = false;

  constructor(
    public _router: Router, 
    public _actions: ActionsService,
    public _loadingService: TdLoadingService, 
    public _mediaService: TdMediaService,
    public _route: ActivatedRoute) {
      this.checkParams(); 
      this.doConstruct();
  }

  doConstruct() {


  }

  ngAfterViewInit() {
    this.afterInit();
  }



  checkParams() {
    this._route.params.subscribe((params: any) => {
      
      if( params != undefined) {
      this.idQuotation = params.id;
      
      //if( params['parentRoute'] != undefined) this.parentRoute = params.parentRoute;
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
     if (this.onCancelEdit !== undefined) { this.onCancelEdit.unsubscribe(); }
     if (this.afterItemUpdated !== undefined) { this.afterItemUpdated.unsubscribe(); }
     
     
  }
  bindOnItemCreated() {

      if( this.headercomp ) {
        this.afterCreateItem = this.headercomp.onItemCreated.subscribe( (itm: TCRMEntity) => {
                this.doOnItemCreated(itm);
          } );
        this.afterItemLoaded = this.headercomp.onItemLoaded.subscribe( (itm: TCRMEntity) => {
              this.onItemLoaded(itm);
        });
        this.onCancelEdit = this.headercomp.onCancelEdit.subscribe( (p: any) => {
          this.onCancel(p);
       });    
       this.afterItemUpdated = this.headercomp.onItemUpdated.subscribe( (itm: TCRMEntity) => {
           this.afterOnItemUpdated(itm);
        });
       
      }
  }

  bindOnItemLoaded() {
     

  }

  doOnItemCreated(itm: TCRMEntity) { }

  onItemLoaded(itm: TCRMEntity) {
    this.afterOnItemLoaded(itm);
  }

  onItemUpdated(itm: TCRMEntity) {

  }

  afterOnItemLoaded(itm: TCRMEntity) {
    
    if(  this.moveToScr == true ) {
      this.scrId = this.parentScr;
    }
  }

  afterOnItemUpdated(itm: TCRMEntity) {

  }

  
  goToInex() {
    if(  this.parentScr != undefined && this.idOpp > 0) {
      this._router.navigate([ '/' + this.parentRoute + '/edit/' + this.idOpp, {   scrId: this.parentScr, moveToScr: true  }]);
   }else {
     this._router.navigate([ '/' + this.itemRoute]);
   }
  }

  onCancel(p: any) {
    
    this.goToInex();
  }
}
