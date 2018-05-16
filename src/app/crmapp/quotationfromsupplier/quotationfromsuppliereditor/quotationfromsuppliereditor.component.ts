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

import { QuotationFromSupplier } from '../../model/index';
import { QuotationfromsupplierheaderComponent } from './+quotationfromsupplierheader/quotationfromsupplierheader.component';
import { EnumDocType } from '../../constants/index';

@Component({
  selector: 'crm-quotationfromsuppliereditor',
  templateUrl: './quotationfromsuppliereditor.component.html',
  styleUrls: ['./quotationfromsuppliereditor.component.scss'],
  providers: [],
})
export class QuotationfromsuppliereditorComponent extends CatalogComponent {

  qts: QuotationFromSupplier;
  
  @ViewChild(QuotationfromsupplierheaderComponent) headercomp: QuotationfromsupplierheaderComponent;
  itemRoute: string = 'quotationfromsupplier';


  doConstruct() {
    super.doConstruct();
    this.quoteType = EnumDocType.QuotationFromSupplier;
    this.itemRoute = 'quotationfromsupplier'
    this.parentRoute = 'opportunity';
  }


  linkClick(scr: number ) : boolean {
    if( this.headercomp !== undefined){
      this.idCustomer = this.headercomp.itemEdit.idCustomer;
    }
    this.scrId = scr;
    return true;
  }

  doOnItemCreated(itm: QuotationFromSupplier) {
    this.qts = itm;
    
    this.idQuotation = itm.id;
    this.idOpp = itm.idOpportunity;
    this.idCustomer = itm.idCustomer;
  }


  goToUpp() {
    this.headercomp.goToOpp();
  }

  onItemLoaded(itm: QuotationFromSupplier) {

    
    this.qts = itm;
    this.idQuotation = itm.id;
    this.idOpp = itm.idOpportunity;
    this.idCustomer = itm.idCustomer;
    super.onItemLoaded(itm);
  }

  updateTotal(data) {
    this.qts.subtotal = data.subtotal;
    this.qts.taxAmount = data.subtotal * this.qts.tax;
    this.qts.total = this.qts.subtotal + this.qts.taxAmount;
  }

  
}




@Component({
  selector: 'crm-quotationfromsuppliereditorfromopp',
  templateUrl: './quotationfromsuppliereditor.component.html',
  styleUrls: ['./quotationfromsuppliereditor.component.scss'],
  providers: [],
})
export class QuotationfromsuppliereditorFromOppComponent extends QuotationfromsuppliereditorComponent {


  doConstruct() {
    super.doConstruct();
    this._route.params.subscribe((params: { id: number }) => {    
      this.idParent = params.id;
    });
    
    this.idQuotation = 0;
  }




  checkParams() {
  }
  
  afterInit() {
    super.afterInit();
    
    this.headercomp.loadFromOpp(this.idParent);
  }
}

