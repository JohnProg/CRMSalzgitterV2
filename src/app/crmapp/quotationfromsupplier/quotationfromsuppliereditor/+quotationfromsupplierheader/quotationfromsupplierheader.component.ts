import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { ReactiveFormsModule, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { Opportunity, QuotationFromSupplier, IncoTerm } from '../../../model/allmodels';
//import {  OpportunityService } from '../../oppservice.service';


import { Observable ,  Observer ,  BehaviorSubject } from 'rxjs';
import { BaseOppComponent } from '../../../catalogs/index';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';


import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';

import {  OpportunityService } from '../../../services/oppservice.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-quotationfromsupplierheader',
  templateUrl: './quotationfromsupplierheader.component.html',
  styleUrls: ['./quotationfromsupplierheader.component.scss']
})
export class QuotationfromsupplierheaderComponent  extends BaseOppComponent {

  idOpp: number = 0;
  itemEdit: QuotationFromSupplier;
  opp: Opportunity;


  deliveryRequired: boolean = false;
  dta: Date;


  ngBeforeInit() {
    super.ngBeforeInit();
     this.itemEdit = new QuotationFromSupplier();
    this.catalogName = 'QFS';
    this.autoLoad = false;
    this._curService.setAPI('QuotationFromSupplier/', this.catalogName, this.loadName);
    this.singleEditor = true;
    this.dta = new Date(); 
  }


  initEntity() {
    this.itemEdit = new  QuotationFromSupplier();
    this.itemEdit.idStatus = 1;
  }

  afterLoadItem(item: QuotationFromSupplier) {
    super.afterLoadItem(item);
    this.idOpp = item.idOpportunity;
    this.loadCurrentOpp(this.idOpp);
    this.loadCountryOrigin(item.idMill);
  }


  getFromOpp(event: any) {
    let t = event.target.value;
    this.loadFromOpp(t);
  }


  loadFromOpp(oid: number ) {
    
    this._curService.loadItemObs('Opportunity', oid) 
      .map((response) => response.json())
        .subscribe( (data: Opportunity) => {

          this.opp = new Opportunity();
        Object.assign(this.opp, data);
        this.itemEdit.idOpportunity = data.id;
        this.itemEdit.idCurrency = data.idCurrency;

        this.itemEdit.idPort = data.idPort;
        this.itemEdit.idUser = data.idUser;
        this.itemEdit.idIncoTerm = data.idIncoTerm;
        this.itemEdit.idLinerTerm = data.idLinerTerms;
        this.itemEdit.idDeliveryPoint = data.idDeliveryPoint;
        this.itemEdit.quoteNotes = data.oppNotes;
        this.itemEdit.asImporter = data.asImporter;
        this.itemEdit.idTransactionFlow = data.idTransactionFlow;
        this.itemEdit.idStatus = 1;
        this.itemEdit.idTypeOpp = data.idTypeOpp;
        this.itemEdit.idCustomer = data.idCustomer;
        this.itemEdit.creditDays = data.creditDays;
        this.itemEdit.interestRate = data.interestRate;
        this.itemEdit.isAutomotive = data.isAutomotive;
        this.itemEdit.subtotal = data.subtotal;
        this.itemEdit.tax = data.tax;
        this.itemEdit.taxAmount = data.taxAmount;
        this.itemEdit.total = data.total;
        

        this.idOpp = data.id;
        //this.setDeliverRequired();
      }, error => {
        this._snackBarService.open('Opportunity does not exists', 'Ok');
      });

  }

  loadCurrentOpp(oid: number ) {
    
    this._curService.loadItemObs('Opportunity', oid) 
      .map((response) => response.json())
        .subscribe( (data: Opportunity) => {
        this.opp = new Opportunity();
        Object.assign(this.opp, data);
        this.idOpp = data.id;
        this.itemEdit.idCustomer = data.idCustomer;
         this.loadCustomerContact(data.idCustomer);
      }, error => {
        this._snackBarService.open('Opportunity does not exists', 'Ok');
      });

  }

  goToOpp() {
        this._router.navigate(['/opportunity/edit', this.idOpp]);
  }




}
