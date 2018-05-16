import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

import { Observable ,  Observer ,  BehaviorSubject } from 'rxjs';
import { BaseComponent } from '../../catalogs/base.component';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';


import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../components/abstractvalueaccessor';
import { CatalogComponent } from '../../catalogs/catalog.component';

import {   Shipping } from '../../model/index';
import { EnumDocType } from '../../constants/index';
import { ShippingeditorheaderComponent } from './shippingeditorheader/shippingeditorheader.component';

@Component({
  selector: 'crm-shippingeditor',
  templateUrl: './shippingeditor.component.html',
  styleUrls: ['./shippingeditor.component.scss']
})
export class ShippingeditorComponent extends CatalogComponent {

  scrId: number = 1;
  @ViewChild(ShippingeditorheaderComponent) headercomp: ShippingeditorheaderComponent;
  byType: number = 0;
  shipping: Shipping;
  idPO: number;
  itemRoute: string = 'shipping';


  doConstruct() {
    super.doConstruct();
    this.quoteType = EnumDocType.Shipping;
    this.itemRoute = 'shipping';
    this.parentRoute = 'shipping';
  }



  doOnItemCreated(itm: Shipping) {
    
    this.idQuotation = itm.id;
    this.shipping = itm;
    this.idCustomer = this.shipping.idCustomer;
  }

  linkClick(scr: number ) : boolean {
    this.scrId = scr;
    return true;
  }


  onItemLoaded(itm: Shipping) {
    this.idQuotation = itm.id;
    this.shipping = itm;
    this.idCustomer = this.shipping.idCustomer;
  }

  
  goToPO() {
    this._router.navigate(['/purchaseorder/edit', this.idPO]);
 }

 goToInex() {
//   if( this.parentRoute != undefined && this.parentScr != undefined) {
//     this._router.navigate([ '/' + this.parentRoute + '/edit/' + this.idPO, {  parentRoute: this.parentRoute, scrId: this.parentScr, moveToScr: true  }]);
//  }else {
   this._router.navigate([ '/' + this.itemRoute]);
 //}
}

updateTotal(data) {
  this.shipping.subtotal = data.subtotal;
  this.shipping.taxAmount = data.subtotal * this.shipping.tax;
  this.shipping.total = this.shipping.subtotal + this.shipping.taxAmount;
}
}




@Component({
  selector: 'crm-shippingeditorfrompo',
  templateUrl: './shippingeditor.component.html',
  styleUrls: ['./shippingeditor.component.scss']
})
export class ShippingeditorFromPOComponent extends ShippingeditorComponent {


  doConstruct() {
    super.doConstruct();
    this._route.params.subscribe((params: { id: number, bytype: number }) => {
      //this.idPurchase = 0;
      this.idParent = params.id;
      this.byType = params.bytype;
    });
  }
  


  checkParams() {
  }
  afterInit() {
    super.afterInit();
    
    this.headercomp.loadFromOpp(this.idParent);
  }
}



