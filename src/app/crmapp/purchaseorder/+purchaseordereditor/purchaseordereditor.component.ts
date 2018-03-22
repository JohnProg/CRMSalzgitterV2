import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Response, RequestOptions, Http, Headers, URLSearchParams, QueryEncoder  } from '@angular/http';
import { ConfigurationService, ActionsService, TokenService } from '../../services/index';

import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../catalogs/base.component';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../components/abstractvalueaccessor';
import { CatalogComponent } from '../../catalogs/catalog.component';

import {  GetPurchaseOrder_Result, PurchaseOrder } from '../../model/index';
import { EnumDocType } from '../../constants/index';
import { PurchaseordereditorheaderComponent } from './purchaseordereditorheader/purchaseordereditorheader.component';
import { AuthHelper } from '../../authHelper/authHelper';


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
  allowShippings: boolean = false;
  //idPurchase: number = 0;
  idCustomer: number;
  po: PurchaseOrder;
  @ViewChild(PurchaseordereditorheaderComponent) headercomp: PurchaseordereditorheaderComponent;
  
  doConstruct() {
    super.doConstruct();
    this.quoteType = EnumDocType.PurchaseOrder;
    this.itemRoute = 'purchaseorder';
    this.parentRoute = 'quotationtocustomer';
    // this._route.params.subscribe((params: any) => {
      

    //    this.idPurchase = params.id;
    //   });
  }





  doOnItemCreated(itm: PurchaseOrder) {
    this.idQuotation = itm.id;
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

  goToInex() {
    if(  this.parentScr != undefined) {
      this._router.navigate([ '/' + this.parentRoute + '/edit/' + this.idQTC, {  scrId: this.parentScr, moveToScr: true  }]);
   }else {
     this._router.navigate([ '/' + this.itemRoute]);
   }
  }

  onItemLoaded(itm: PurchaseOrder) {
    this.po = itm;
    this.idQuotation = itm.id;
    this.idQTC = itm.idQuotationToCustomer;
    this.idQFS = itm.idQuotationFromSupplier;
    this.idOpp = itm.idOpportunity;
    this.idCustomer = itm.idCustomer;
    super.onItemLoaded(itm);
    this.allowShippings = itm.asImporter == true && itm.purchaseOrderConfirmation != null;
    
  }

  onItemUpdated(itm: PurchaseOrder) {
    super.onItemUpdated(itm);
    this.allowShippings = itm.asImporter == true && itm.purchaseOrderConfirmation != null;
  }

  updateTotal(data) {
    this.po.subtotal = data.subtotal;
    this.po.taxAmount = data.subtotal * this.po.tax;
    this.po.total = this.po.subtotal + this.po.taxAmount;
  }
}




@Component({
  selector: 'crm-purchaseordereditorfromoppqts',
  templateUrl: './purchaseordereditor.component.html',
  styleUrls: ['./purchaseordereditor.component.scss']
})
export class PurchaseordereditorFromQTSComponent extends PurchaseordereditorComponent {

  doConstruct() {
    super.doConstruct();
    debugger
    this._route.params.subscribe((params: { id: number, bytype: number }) => {
      this.idQuotation = 0;
      this.idParent = params.id;
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

  

  checkParams() {
  }
  afterInit() {
    super.afterInit();
    
    this.headercomp.loadFromOpp(this.idParent);
  }
}

