import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService, TdLayoutManageListComponent 
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {TranslateService} from '@ngx-translate/core';

import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../components/abstractvalueaccessor';
import { CatalogComponent } from '../../catalogs/catalog.component';

import {  GetPurchaseOrder_Result, PurchaseOrder } from '../../model/index';
import { EnumDocType } from '../../constants/index';
import { PurchaseordereditorheaderComponent } from './purchaseordereditorheader/purchaseordereditorheader.component';

@Component({
  selector: 'crm-purchaseordereditor',
  templateUrl: './purchaseordereditor.component.html',
  styleUrls: ['./purchaseordereditor.component.scss']
})
export class PurchaseordereditorComponent extends CatalogComponent {

  idQTC: number = 0;
  idQFS: number = 0;
  idOpp: number = 0;
  byType: number = 0;
  scrId: number = 1;
  idPurchase: number = 0;
  idCustomer: number;
  po: PurchaseOrder;
  @ViewChild(PurchaseordereditorheaderComponent) headercomp: PurchaseordereditorheaderComponent;

  constructor(
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MatSnackBar,
    public _mediaService: TdMediaService,
    public _actions: ActionsService,
    public _ngZone: NgZone,
    public _router: Router, public _route: ActivatedRoute,
    translate: TranslateService) {
    super(_loadingService, _dialogService, _snackBarService, _mediaService, _actions);
    this.quoteType = EnumDocType.PurchaseOrder;
    this._route.params.subscribe((params: { id: number }) => {
       this.idPurchase = params.id;
      });
  }


  doOnItemCreated(itm: PurchaseOrder) {
    this.idPurchase = itm.id;
    this.idQTC = itm.idQuotationToCustomer;
    this.idQFS = itm.idQuotationFromSupplier;
    this.idOpp = itm.idOpportunity;
    this.idCustomer = itm.idCustomer;
  }

  linkClick(scr: number ) : boolean {
    this.scrId = scr;
    return true;
  }





  goToOpp() {
    this._router.navigate(['/opportunity/edit', this.idOpp]);
  }

  goToQTC() {
     this._router.navigate(['/quotationtocustomer/edit', this.idQTC]);
  }

  goToQFS() {
     this._router.navigate(['/quotationfromsupplier/edit', this.idQFS]);
  }

  onItemLoaded(itm: PurchaseOrder) {
    this.po = itm;
    this.idPurchase = itm.id;
    this.idQTC = itm.idQuotationToCustomer;
    this.idQFS = itm.idQuotationFromSupplier;
    this.idOpp = itm.idOpportunity;
    this.idCustomer = itm.idCustomer;
  }
}




@Component({
  selector: 'crm-purchaseordereditorfromoppqts',
  templateUrl: './purchaseordereditor.component.html',
  styleUrls: ['./purchaseordereditor.component.scss']
})
export class PurchaseordereditorFromQTSComponent extends PurchaseordereditorComponent {


  constructor(
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MatSnackBar,
    public _mediaService: TdMediaService,
    public _actions: ActionsService,
    public _ngZone: NgZone,
    public _router: Router, public _route: ActivatedRoute,
    translate: TranslateService) {
    super(_loadingService, _dialogService, _snackBarService, _mediaService, _actions, _ngZone, _router, _route, translate);

    this._route.params.subscribe((params: { id: number, bytype: number }) => {
      this.idPurchase = 0;
      this.idOpp = params.id;
      this.byType = params.bytype;
      // switch(params.bytype) {
      //   case EnumDocType.Opportunity:
      //        this.idOpp = params.id;
      //        break;
      //   case EnumDocType.QuotationFromSupplier:
      //        this.idQFS = params.id;
      //        break;
      //   case EnumDocType.QuotationToCustomer:
      //        this.idQTC = params.id;
      //        break;
      //   default:
      //        break;
      // }
    });

  }


  afterInit() {
    super.afterInit();
    
    this.headercomp.loadFromOpp(this.idOpp);
  }
}

