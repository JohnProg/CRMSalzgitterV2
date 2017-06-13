import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { ReactiveFormsModule, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { QuotationFromSupplier, QuotationToCustomer, IncoTerm } from '../../../model/allmodels';
//import {  OpportunityService } from '../../oppservice.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';
import {TranslateService} from '@ngx-translate/core';
import {  OpportunityService } from '../../../services/oppservice.service';



@Component({
  selector: 'crm-quotationtocustomereditorheader',
  templateUrl: './quotationtocustomereditorheader.component.html',
  styleUrls: ['./quotationtocustomereditorheader.component.scss']
})
export class QuotationtocustomereditorheaderComponent extends BaseComponent {

  @Input() idQuotation: number = 0;
  idParent: number = 0;
  itemEdit: QuotationToCustomer;
  opp: QuotationFromSupplier;
  @ViewChild('idIncoTerm') incoTermSelect: AbstractValueAccessor;
  @ViewChild('IdCountry') countryOrigin: AbstractValueAccessor;
  deliveryRequired: boolean = false;
  dta: Date;
  constructor(public _router: Router, 
    public _route: ActivatedRoute,
    public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone,
    public _http: Http, 
    public _tableService: TdDataTableService,
    public translate: TranslateService
    ,  public _oppservice: OpportunityService 
       ) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate);

    this.itemEdit = new QuotationToCustomer();
    this.catalogName = 'Quotation to Customer';
    this.autoLoad = false;
    this._curService.setAPI('QuotationToCustomer/', this.catalogName);
    this.singleEditor = true;
    this.dta = new Date();
  }


  ngOnInitClass() {

    this.entList = <Observable<QuotationToCustomer[]>>this._curService.entList;


  }

  afterViewInit(): void {
    this._actions.showAdd(false);
    this._actions.showSearch(false);
    this._actions.showSave(true);
    this._actions.showCancel(false);

    if (this.idQuotation > 0) {
      
      this.editEntity(this.idQuotation);
      this._actions.updateTitle('Edit Quotation ' + this.idQuotation.toString());
    } else {
      this._actions.updateTitle('Create Quotation ');
      this.addEntity();
    }

  }

  initEntity() {
    this.itemEdit = new  QuotationToCustomer();
    this.itemEdit.IdStatus = 1;
  }

  afterLoadItem(item: QuotationToCustomer) {

    super.afterLoadItem(item);
    this.itemEdit = item;
    this.setDeliverRequired();
    this.idParent = item.IdQuotationFromSupplier;
    this.loadCurrentOpp(this.idParent);
    this.countryOrigin.loadCustomDataFromId(item.IdMill);
    this._actions.showCancel(false);
  }

  setDeliverRequired() {
    setTimeout(() => {
        let req =  (<IncoTerm>this.incoTermSelect.getItemSelected()).DeliveryRequired;
        this.setDeliveryRequired(req);
    }, 500);
  }
  afterSave(item: QuotationToCustomer) {}




  incoTermChange(item: IncoTerm) {
    this.setDeliveryRequired(item.DeliveryRequired);
  }

  setDeliveryRequired(isreq: boolean) {
    this.deliveryRequired = isreq;
    if ( this.deliveryRequired === false ) {
      this.itemEdit.DeliveryLocation = undefined;
    }
  }

  getFromOpp(event: any) {
    let t = event.target.value;
    this.loadFromOpp(t);
  }





  loadFromOpp(oid: number ) {
    this._curService.loadItemObs('QuotationFromSupplier', oid) 
      .map((response) => response.json())
        .subscribe( (data: QuotationFromSupplier) => {
        
        this.opp = new QuotationFromSupplier();
        Object.assign(this.opp, data);
        this._oppservice.currentQFS = data;
        this.itemEdit.IdQuotationFromSupplier = data.Id;
        this.itemEdit.IdCurrency = data.IdCurrency;
        this.itemEdit.IdPort = data.IdPort;
        this.itemEdit.IdUser = data.IdUser;
        this.itemEdit.IdIncoTerm = data.IdIncoTerm;
        this.itemEdit.IdLinerTerm = data.IdLinerTerm;
        this.itemEdit.DeliveryLocation = data.DeliveryLocation;
        this.itemEdit.QuoteNotes = data.QuoteNotes;
        this.itemEdit.AsImporter = data.AsImporter;
        this.itemEdit.IdStatus = 1;
        this.itemEdit.OfferValidity = data.OfferValidity;
        this.itemEdit.ShipmentOffered = data.ShipmentOffered;
        this.itemEdit.IdMill = data.IdMill;
        this.itemEdit.IdCountry = data.IdCountryOrigin;
        this.itemEdit.ShipmentOffered = data.ShipmentOffered;
        this.itemEdit.DateCreated = data.DateCreated;
        this.itemEdit.IdTypeOpp = data.IdTypeOpp;
        this.countryOrigin.loadCustomDataFromId(this.itemEdit.IdMill);
        this.idParent = data.Id;
        this.setDeliverRequired();
      }, error => {
        this._snackBarService.open('Quotation does not exists', 'Ok');
      });

  }

  loadCurrentOpp(oid: number ) {
    this._curService.loadItemObs('QuotationFromSupplier', oid) 
      .map((response) => response.json())
        .subscribe( (data: QuotationFromSupplier) => {
        this.opp = new QuotationFromSupplier();
        Object.assign(this.opp, data);
        this._oppservice.currentQFS = data;
        this.idParent = data.Id;
      }, error => {
        this._snackBarService.open('Opportunity does not exists', 'Ok');
      });

  }

  goToOpp() {
        this._router.navigate(['/quotationfromsupplier/edit', this.idParent]);
  }


  afterCreate(item: QuotationToCustomer) {
    super.afterCreate(item);
    this.idQuotation = item.Id;
  }
}
