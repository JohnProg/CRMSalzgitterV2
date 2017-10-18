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
import { BaseOppComponent } from '../../../catalogs/index';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';
import {TranslateService} from '@ngx-translate/core';
import {  OpportunityService } from '../../../services/oppservice.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'crm-purchaseordereditorheader',
  templateUrl: './purchaseordereditorheader.component.html',
  styleUrls: ['./purchaseordereditorheader.component.scss']
})
export class PurchaseordereditorheaderComponent extends BaseOppComponent {

  idParent: number = 0;
  itemEdit: PurchaseOrder;
  dta: Date;


  ngBeforeInit() {
    super.ngBeforeInit();
     this.itemEdit = new PurchaseOrder();
    this.catalogName = 'Purchase Order';
    this.autoLoad = false;
    this._curService.setAPI('PurchaseOrder/', this.catalogName, this.loadName);
    this.singleEditor = true;
    this.dta = new Date(); 
  }

  ngOnInitClass() {
    this.entList = <Observable<PurchaseOrder[]>>this._curService.entList;
  }


  initEntity() {
    this.itemEdit = new  PurchaseOrder();
    this.itemEdit.idStatus = 1;
  }

  afterLoadItem(item: PurchaseOrder) {
    super.afterLoadItem(item);
    this.idParent = item.idQuotationToCustomer;
    this.loadCountryOrigin(item.idMill);
  }

  getFromOpp(event: any) {
    let t = event.target.value;
    this.loadFromOpp(t);
  }



  loadFromOpp(oid: number ) {

    let p: TCRMEntity[] = new Array<TCRMEntity>();
    let p1 = new TCRMEntity();
    p1.name = 'idquote'; p1.description = oid.toString();

    let p2 = new TCRMEntity();
    p2.name = 'twith'; p2.description = '';
   
    p.push(p1);
    p.push(p2);
    
    this._curService.loadCustomCatalogObs('PurchaseOrder/getFieldsForOrder', p) 
      .map((response) => response.json())
        .subscribe( (data: GetFieldForPurchaseOrder_Result) => {
        this.itemEdit.idOpportunity = data.idOpportunity;
        this.itemEdit.idQuotationFromSupplier = data.idQuotationFromSupplier;
        this.itemEdit.idQuotationToCustomer = data.idQuotationToCustomer;
        this.itemEdit.idDocType = data.idDocType;
        this.itemEdit.idStatus = data.idStatus;
        this.itemEdit.idResponsible = data.idResponsible;
        this.itemEdit.idCustomer = data.idCustomer;
        this.itemEdit.idCustomerContact = data.idCustomerContact;
        this.itemEdit.idCurrency = data.idCurrency;
        this.itemEdit.idContact = data.idContact;
        this.itemEdit.idUser = data.idUser;
        this.itemEdit.idPort = data.idPort;
        this.itemEdit.idIncoTerm = data.idIncoTerm;
        this.itemEdit.idLinerTerm = data.idLinerTerm;
        this.itemEdit.isActive = true;
        this.itemEdit.idMarket = data.idMarket;
        this.itemEdit.idSector = data.idSector;
        this.itemEdit.idDeliveryPoint = data.idDeliveryPoint;
        this.itemEdit.oppNotes = data.oppNotes;
        this.itemEdit.asImporter = data.asImporter;
        this.itemEdit.idTransactionFlow = data.idTransactionFlow;
        this.itemEdit.idTypeOpp = data.idTypeOpp;
        this.itemEdit.idMill = data.idMill;
        this.itemEdit.idCountryOrigin = data.idCountryOrigin;
        this.itemEdit.offerValidity = data.offerValidity;
        this.itemEdit.shipmentOffered = data.shipmentOffered;
        this.itemEdit.creditDays = data.creditDays;
        this.itemEdit.interestRate = data.interestRate;
        //this.countryOrigin.loadCustomDataFromId(this.itemEdit.idMill);
        this.idParent = data.idQuotationToCustomer;

        this.loadCountryOrigin(this.itemEdit.idMill);
        this.loadCustomerContact(this.itemEdit.idCustomer);
      }, error => {
        this._snackBarService.open('Purchase Order does not exists', 'Ok');
      });



  }


  goToOpp() {
        this._router.navigate(['/quotationfromsupplier/edit', this.idParent]);
  }


}

