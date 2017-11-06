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
  constructor(
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MatSnackBar,
    public _mediaService: TdMediaService,
    public _actions: ActionsService,
    public _ngZone: NgZone,
    public _router: Router, public _route: ActivatedRoute,
    translate: TranslateService) {
    super(_loadingService, _dialogService, _snackBarService, _mediaService, _actions, _router, _route);
    this.quoteType = EnumDocType.QuotationFromSupplier;
    this.itemRoute = 'quotationfromsupplier'

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



  
}




@Component({
  selector: 'crm-quotationfromsuppliereditorfromopp',
  templateUrl: './quotationfromsuppliereditor.component.html',
  styleUrls: ['./quotationfromsuppliereditor.component.scss'],
  providers: [],
})
export class QuotationfromsuppliereditorFromOppComponent extends QuotationfromsuppliereditorComponent {


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
    
    this._route.params.subscribe((params: { id: number }) => {
      
      this.idOpp = params.id;
    });
    this.idQuotation = 0;
  }


  afterInit() {
    super.afterInit();
    this.headercomp.loadFromOpp(this.idOpp);
  }
}

