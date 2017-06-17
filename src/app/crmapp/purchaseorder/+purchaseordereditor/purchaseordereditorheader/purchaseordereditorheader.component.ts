import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { ReactiveFormsModule, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { QuotationToCustomer, PurchaseOrder, IncoTerm,
         GetFieldForPurchaseOrder_Result, TCRMEntity } from '../../../model/allmodels';

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
  selector: 'crm-purchaseordereditorheader',
  templateUrl: './purchaseordereditorheader.component.html',
  styleUrls: ['./purchaseordereditorheader.component.scss']
})
export class PurchaseordereditorheaderComponent extends BaseComponent {

  @Input() idPurchase: number = 0;
  idParent: number = 0;
  itemEdit: PurchaseOrder;
  @ViewChild('idIncoTerm') incoTermSelect: AbstractValueAccessor;
  @ViewChild('IdCountry') countryOrigin: AbstractValueAccessor;
  @ViewChild('idCustomerContact') custContactSelect: AbstractValueAccessor;  
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
    public translate: TranslateService,
    public _oppservice: OpportunityService,
    public route: ActivatedRoute,
       ) {
        super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, route);

    this.itemEdit = new PurchaseOrder();
    this.catalogName = 'Purchase Order';
    this.autoLoad = false;
    this._curService.setAPI('PurchaseOrder/', this.catalogName);
    this.singleEditor = true;
    this.dta = new Date();
  }


  ngOnInitClass() {
    this.entList = <Observable<PurchaseOrder[]>>this._curService.entList;
  }

  afterViewInit(): void {
    this._actions.showAdd(false);
    this._actions.showSearch(false);
    this._actions.showSave(true);
    this._actions.showCancel(false);

    if (this.idPurchase > 0) {
      this.editEntity(this.idPurchase);

    } else {
      this._actions.updateTitle('Create Purchase Order ');
      this.addEntity();
    }

  }

  initEntity() {
    this.itemEdit = new  PurchaseOrder();
    this.itemEdit.IdStatus = 1;
  }

  afterLoadItem(item: PurchaseOrder) {
    super.afterLoadItem(item);
    this.itemEdit = item;
    this.setDeliverRequired();
    this.idParent = item.IdQuotationToCustomer;
    this.countryOrigin.loadCustomDataFromId(item.IdMill);
    this.custContactSelect.loadCustomDataFromId(item.IdCustomer);
    this._actions.showCancel(false);
    this.onItemCreated.emit(item);
    this._actions.updateTitle('Edit Purchase Order ' + this.idPurchase.toString());
  }

  setDeliverRequired() {
    setTimeout(() => {
        let req =  (<IncoTerm>this.incoTermSelect.getItemSelected()).DeliveryRequired;
        this.setDeliveryRequired(req);
    }, 500);
  }
  afterSave(item: PurchaseOrder) {}


  onCustomerChange(event: any) {}

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

    let p: TCRMEntity[] = new Array<TCRMEntity>();
    let p1 = new TCRMEntity();
    p1.Name = 'idquote'; p1.Description = oid.toString();

    let p2 = new TCRMEntity();
    p2.Name = 'twith'; p2.Description = '';
   
    p.push(p1);
    p.push(p2);
    this._curService.loadCustomCatalogObs('PurchaseOrder/getFieldsForOrder', p) 
      .map((response) => response.json())
        .subscribe( (data: GetFieldForPurchaseOrder_Result) => {


        this._oppservice.currentFields = data;
        this.itemEdit.IdOpportunity = data.IdOpportunity;
        this.itemEdit.IdQuotationFromSupplier = data.IdQuotationFromSupplier;
        this.itemEdit.IdQuotationToCustomer = data.IdQuotationToCustomer;
        this.itemEdit.IdDocType = data.IdDocType;
        this.itemEdit.IdStatus = data.IdStatus;
        this.itemEdit.IdResponsible = data.IdResponsible;
        this.itemEdit.IdCustomer = data.IdCustomer;
        this.itemEdit.IdCustomerContact = data.IdCustomerContact;
        this.itemEdit.IdCurrency = data.IdCurrency;
        this.itemEdit.IdContact = data.IdContact;
        this.itemEdit.IdUser = data.IdUser;
        this.itemEdit.IdPort = data.IdPort;
        this.itemEdit.IdIncoTerm = data.IdIncoTerm;
        this.itemEdit.IdLinerTerm = data.IdLinerTerm;
        this.itemEdit.IsActive = true;
        this.itemEdit.IdMarket = data.IdMarket;
        this.itemEdit.IdSector = data.IdSector;
        this.itemEdit.DeliveryLocation = data.DeliveryLocation;
        this.itemEdit.OppNotes = data.OppNotes;
        this.itemEdit.AsImporter = data.AsImporter;
        this.itemEdit.IdTransactionFlow = data.IdTransactionFlow;
        this.itemEdit.IdTypeOpp = data.IdTypeOpp;
        this.itemEdit.IdMill = data.IdMill;
        this.itemEdit.IdCountryOrigin = data.IdCountryOrigin;
        this.itemEdit.OfferValidity = data.OfferValidity;
        this.itemEdit.ShipmentOffered = data.ShipmentOffered;
        this.countryOrigin.loadCustomDataFromId(this.itemEdit.IdMill);
        this.idParent = data.IdQuotationToCustomer;
        this.setDeliverRequired();
      }, error => {
        this._snackBarService.open('Purchase Order does not exists', 'Ok');
      });


  }

  // loadCurrentOpp(oid: number ) {
  //   this._curService.loadItemObs('QuotationFromSupplier', oid) 
  //     .map((response) => response.json())
  //       .subscribe( (data: QuotationFromSupplier) => {
  //       this.opp = new QuotationFromSupplier();
  //       Object.assign(this.opp, data);
  //       this._oppservice.currentQFS = data;
  //       this.idParent = data.Id;
  //     }, error => {
  //       this._snackBarService.open('Opportunity does not exists', 'Ok');
  //     });

  // }

  goToOpp() {
        this._router.navigate(['/quotationfromsupplier/edit', this.idParent]);
  }


  afterCreate(item: PurchaseOrder) {
    super.afterCreate(item);
    this.idPurchase = item.Id;
  }
}

