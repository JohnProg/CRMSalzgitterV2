import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { MatSelect } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { NgForm } from '@angular/forms';
import { CatalogService, IPChangeEventSorted } from '../services/catalog.service';
import { ConfigurationService } from '../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import {TranslateService} from '@ngx-translate/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import {  Opportunity, IncoTerm, TCRMEntity, GetStatusByDocType_Result } from '../model/index';
import { IDeleteEventModel } from '../model/deleteeventmodel';
import { ActionsService } from '../services/actions.services';
import { BaseComponent } from './base.component';
import { AbstractValueAccessor } from '../components/abstractvalueaccessor';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { EnumDocType } from '../constants/index';

export const oppQl = gql`
  query 
  findStatusByDocType($iddoc: Int!)
  {
    currencies { id name description aSign }
    responsibles { id name isActive  }
    findStatusByDocType(iddoc: $iddoc) { id name description allowChild isEditable idDocType }
    customers { id name isAutomotive interestRate daysCredit idResponsible }
    contacts { id name isActive }
    markets { id name description }
    sectors { id name description }
    ports { id name description }
    transactionFlows { id name description }
    incoTerms { id name description, deliveryRequired }
    linerTerms { id name description }
    typeOpportunities { id name description }
    mills { id name description }
  }
`;



export class BaseOppComponent extends BaseComponent {

  @ViewChild('idCustomerContact') custContactSelect: MatSelect;
  @ViewChild('idIncoTerm') incoTermSelect: MatSelect;
  @ViewChild('idCountryOrigin') countryOrigin: MatSelect;

  @Input() idDoc: number = 0;
  deliveryRequired: boolean = false;
  @Input() quoteType: EnumDocType;

   loadCatalogs() {
    this._curService.loadQl(oppQl, { iddoc: this.quoteType })
    .subscribe(({data}) => {
      this.catDocType = data['docType'];
      this.catStatus = data['findStatusByDocType'];
      this.catResponsible = data['responsibles'];
      this.catCustomer = data['customers'];
      this.catCurrencies = data['currencies'];
      this.catContact = data['contacts'];
      this.catUser = data['users'];
      this.catIncoTerm = data['incoTerms'];
      this.catLinerTerm = data['linerTerms'];
      this.catMarket = data['markets'];
      this.catSector = data['sectors'];
      this.catTransactionFlow = data['transactionFlows'];
      this.catTypeOpp = data['typeOpportunities'];
      this.catPort = data['ports'];
      this.catMill = data['mills'];
    }, (error: Error) => {
      this._loadingService.resolve('');
      
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    }
    );   
  }


  afterViewInit(): void {
    this._actions.showAdd(false);
    this._actions.showSearch(false);
    this._actions.showSave(true);
    this._actions.showCancel(false);
    setTimeout( () => {
        if (this.idDoc > 0) {

        this.editEntity(this.idDoc);
        this._actions.updateTitle('Edit ' + this.idDoc.toString());
      } else {
        this._actions.updateTitle('Create ');
        this.addEntity();
      }    
    }, 50);


  }


  afterLoadItem(item: TCRMEntity) {
    super.afterLoadItem(item);
    this.itemEdit = item;
    if(item['idCustomer']) {
      this.loadCustomerContact(item['idCustomer']);
    }
    this.setDeliveryRequired();
    this.setAllowChild();
  }


  onCustomerChange(event: any) {
    this.itemEdit['idCustomerContact'] = undefined;
    this.loadCustomerContact(event.value);
  }

  afterLoadCustomerContact() {
    if( this.itemEdit.id == 0 && this.catCustomer != undefined) {
      let cust = this.catCustomer.find(o => o.id == this.itemEdit['idCustomer']);
      if( cust !== undefined) {
        this.itemEdit['isAutomotive'] = cust.isAutomotive;
        this.itemEdit['creditDays'] = cust.daysCredit;
        this.itemEdit['interestRate'] = cust.interestRate;
        this.itemEdit['idResponsible'] = cust.idResponsible;
      }
    }
  }

  onMillChange(event: any) {
    this.itemEdit['idCountryOrigin'] = undefined;
    this.loadCountryOrigin(event.value);
  }

  incoTermChange(item: any) {
    this.setDeliveryRequired();
  }

  setDeliveryRequired() {
    setTimeout(() => {
   if( this.catIncoTerm != undefined) {    
       let req =  <IncoTerm>(this.catIncoTerm.filter( i => i.id === this.itemEdit['idIncoTerm'])[0]);
          if( req !== undefined) {
            this.deliveryRequired = req['deliveryRequired'];
            if ( this.deliveryRequired === false ) {
              this.itemEdit['idDeliveryPoint'] = undefined;
            }
          }

      }
   },500);
  }  

  setAllowChild() {
    setTimeout(() => {
    if( this.catStatus != undefined) {
      
          let req =  <GetStatusByDocType_Result>(this.catStatus.filter( i => i.id === this.itemEdit['idStatus'])[0]);
          if( req !== undefined) {
            this.itemEdit['allowChild'] = req['allowChild'];
            this.itemEdit['isEditable'] = req['isEditable'];
          }

      }
   },500);
  }
  afterCreate(item: TCRMEntity) {
    super.afterCreate(item);
    this.idDoc = item.id;
    this.setAllowChild();
  }
}