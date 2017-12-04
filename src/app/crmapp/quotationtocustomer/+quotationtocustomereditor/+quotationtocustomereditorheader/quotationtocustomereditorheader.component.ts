import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { ReactiveFormsModule, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { QuotationFromSupplier, QuotationToCustomer, IncoTerm, TCRMEntity, GetQFSFields_Result } from '../../../model/index';
//import {  OpportunityService } from '../../oppservice.service';

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
  selector: 'crm-quotationtocustomereditorheader',
  templateUrl: './quotationtocustomereditorheader.component.html',
  styleUrls: ['./quotationtocustomereditorheader.component.scss']
})
export class QuotationtocustomereditorheaderComponent extends BaseOppComponent {


  idParent: number = 0;
  itemEdit: QuotationToCustomer;
  opp: QuotationFromSupplier;

  dta: Date;


  ngBeforeInit() {
    super.ngBeforeInit();
     this.itemEdit = new QuotationToCustomer();
    this.catalogName = 'QTC';
    this.autoLoad = false;
    this._curService.setAPI('QuotationToCustomer/', this.catalogName, this.loadName);
    this.singleEditor = true;
    this.dta = new Date(); 
  }





  initEntity() {
    this.itemEdit = new  QuotationToCustomer();
    this.itemEdit.idStatus = 1;
  }

  afterLoadItem(item: QuotationToCustomer) {

    super.afterLoadItem(item);
    this.idParent = item.idQuotationFromSupplier;
    this.loadCurrentOpp(this.idParent);
    this.loadCountryOrigin(item.idMill);

  }



  getFromOpp(event: any) {
    let t = event.target.value;
    this.loadFromOpp(t);
  }


  loadFromOpp(oid: number ) {
    let pparams: TCRMEntity[] = new Array<TCRMEntity>();
    pparams.push( (<TCRMEntity>{ name: 'idqfs', description: oid.toString() }) );


    this._curService.loadCustomCatalogObs('QuotationToCustomer/getQFSFields', pparams) 
      .map((response) => response.json())
        .subscribe( (data: GetQFSFields_Result) => {
        
        this.opp = new QuotationFromSupplier();
        Object.assign(this.opp, data);
        this.itemEdit.idQuotationFromSupplier = oid;
        this.itemEdit.idCurrency = data.idCurrency;
        this.itemEdit.idPort = data.idPort;
        this.itemEdit.idUser = data.idUser;
        this.itemEdit.idIncoTerm = data.idIncoTerm;
        this.itemEdit.idLinerTerm = data.idLinerTerm;
        this.itemEdit.idDeliveryPoint = data.idDeliveryPoint;
        this.itemEdit.quoteNotes = data.oppNotes;
        this.itemEdit.asImporter = data.asImporter;
        this.itemEdit.idStatus = 1;
        this.itemEdit.offerValidity = data.offerValidity;
        this.itemEdit.shipmentOffered = data.shipmentOffered;
        this.itemEdit.idMill = data.idMill;
        this.itemEdit.idCountry = data.idCountryOrigin;
        this.itemEdit.shipmentOffered = data.shipmentOffered;
        //this.itemEdit.dateCreated = Date.now();
        this.itemEdit.idTypeOpp = data.idTypeOpp;
        this.itemEdit.idCustomer = data.idCustomer;
        this.itemEdit.creditDays = data.creditDays;
        this.itemEdit.interestRate = data.interestRate;        
        this.idParent = oid;
        
        this.loadCountryOrigin(this.itemEdit.idMill);
      }, error => {
        this._snackBarService.open('QFS does not exists', 'Ok');
      });

  }

  loadCurrentOpp(oid: number ) {
    let pparams: TCRMEntity[] = new Array<TCRMEntity>();
    pparams.push( (<TCRMEntity>{ name: 'idqfs', description: oid.toString() }) );


    this._curService.loadCustomCatalogObs('QuotationToCustomer/getQFSFields', pparams) 
      .map((response) => response.json())
        .subscribe( (data: GetQFSFields_Result) => {
          
        this.idParent = oid;
        this.itemEdit.idCustomer = data.idCustomer;
        this.loadCustomerContact(data.idCustomer);
      }, error => {
        this._snackBarService.open('QFS does not exists', 'Ok');
      });

  }

  goToOpp() {
        this._router.navigate(['/quotationfromsupplier/edit', this.idParent]);
  }

}
