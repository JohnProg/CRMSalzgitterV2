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

import { QuotationToCustomer } from '../../model/index';
import { QuotationtocustomereditorheaderComponent } from './+quotationtocustomereditorheader/quotationtocustomereditorheader.component';
import { EnumDocType } from '../../constants/index';


@Component({
  selector: 'crm-quotationtocustomereditor',
  templateUrl: './quotationtocustomereditor.component.html',
  styleUrls: ['./quotationtocustomereditor.component.scss']
})
export class QuotationtocustomereditorComponent extends CatalogComponent {

  qts: QuotationToCustomer;
 
  @ViewChild(QuotationtocustomereditorheaderComponent) headercomp: QuotationtocustomereditorheaderComponent;
  itemRoute: string = 'quotationtocustomer';
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
    this.quoteType = EnumDocType.QuotationToCustomer;
    this.itemRoute = 'quotationtocustomer'
    this.parentRoute = 'quotationfromsupplier';
  }



  linkClick(scr: number ) : boolean {
    if( this.headercomp !== undefined){
      this.idCustomer = this.headercomp.itemEdit.idCustomer;
    }
    this.scrId = scr;
    return true;
  }



  doOnItemCreated(itm: QuotationToCustomer) {
    this.idQuotation = itm.id;
    this.idOpp = itm.idQuotationFromSupplier;
    this.idCustomer = itm.idCustomer;    
  }

  goToUpp() {
    this.headercomp.goToOpp();
  }

  onItemLoaded(itm: QuotationToCustomer) {
    this.qts = itm;
    this.idQuotation = itm.id;
    this.idOpp = itm.idQuotationFromSupplier;
    this.idCustomer = this.qts.idCustomer;
    super.onItemLoaded(itm);
  }
}




@Component({
  selector: 'crm-quotationtocustomereditorfromopp',
  templateUrl: './quotationtocustomereditor.component.html',
  styleUrls: ['./quotationtocustomereditor.component.scss'],
  providers: [],
})
export class QuotationtocustomereditorFromQFSComponent extends QuotationtocustomereditorComponent {


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

