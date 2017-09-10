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

import { MdSnackBar } from '@angular/material';
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

  idQuotation: number = 0;
  qts: QuotationToCustomer;
  idOpp: number = 0;
  idCustomer: number;
  
  @ViewChild(QuotationtocustomereditorheaderComponent) headercomp: QuotationtocustomereditorheaderComponent;

  constructor(
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _mediaService: TdMediaService,
    public _actions: ActionsService,
    public _ngZone: NgZone,
    public _router: Router, public _route: ActivatedRoute,
    translate: TranslateService) {
    super(_loadingService, _dialogService, _snackBarService, _mediaService, _actions);
    this.quoteType = EnumDocType.QuotationToCustomer;
    this._route.params.subscribe((params: { id: number }) => {
      this.idQuotation = params.id;
    });
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
    //this.idOpp = itm.idOpportunity;
    this.idCustomer = itm.idCustomer;    
  }

  goToUpp() {
    this.headercomp.goToOpp();
  }

  onItemLoaded(itm: QuotationToCustomer) {
    this.qts = itm;
    this.idCustomer = this.qts.idCustomer;
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
    public _snackBarService: MdSnackBar,
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

