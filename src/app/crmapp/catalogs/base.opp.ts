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
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';


import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import {  Opportunity, IncoTerm, TCRMEntity, GetStatusByDocType_Result, Customer } from '../model/index';
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
    customers { id name isAutomotive interestRate daysCredit idResponsible idCurrency isTax }
    contacts { id name isActive }
    markets { id name description }
    sectors { id name description }
    ports { id name description }
    transactionFlows { id name description }
    incoTerms { id name description, deliveryRequired }
    linerTerms { id name description }
    typeOpportunities { id name description }
    mills { id name description }
    companies { taxAmount }
  }
`;



export class BaseOppComponent extends BaseComponent {

  @ViewChild('idCustomerContact') custContactSelect: MatSelect;
  @ViewChild('idIncoTerm') incoTermSelect: MatSelect;
  @ViewChild('idCountryOrigin') countryOrigin: MatSelect;

  @Input() idDoc: number = 0;
  deliveryRequired: boolean = false;
  @Input() quoteType: EnumDocType;
  @Input() itemRoute: string;
  
  customer: Customer;
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
      this.catCompanies = data['companies'];
    }, (error: Error) => {
      this._loadingService.resolve('');
      
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    }
    );   
  }


  
  afterViewInit(): void {
    super.afterViewInit();
    setTimeout( () => {
      
      if (this.idDoc > 0) {
        this.editEntity(this.idDoc);        
      } else {
        this._actions.updateTitle({ action: 'Add', title: this.catalogName , tparam: this.titleParam});
        this.addEntity();
      }    
    }, 100);
    this._actions.showAdd(false);
    this._actions.showSearch(false);
    this._actions.showSave(true);
    this._actions.showCancel(true);
  }

  updateTitle() {
    let txtcust: string =  this.idDoc.toString();
    if( this.customer != undefined) {
      txtcust += ' (Customer: ' + this.customer.name + ')';
    }
    
    this._actions.updateTitle( { action: 'Edit', title: this.catalogName , tparam: txtcust});
  }

  afterLoadItem(item: TCRMEntity) {
    super.afterLoadItem(item);
    this.itemEdit = item;
    if(item['idCustomer']) {
      this.loadCustomerContact(item['idCustomer']);
    }
    this.setDeliveryRequired();
    this.setAllowChild();
    this.updateTitle();
  }


  onCustomerChange(event: any) {
    this.itemEdit['idCustomerContact'] = undefined;
    this.loadCustomerContact(event.value);
  }

  afterLoadCustomerContact(data: any) {
    if( this.itemEdit.id == 0 && this.catCustomer != undefined) {
      let cust = this.catCustomer.find(o => o.id == this.itemEdit['idCustomer']);
      if( cust !== undefined) {
        this.itemEdit['isAutomotive'] = cust.isAutomotive;
        this.itemEdit['creditDays'] = cust.daysCredit;
        this.itemEdit['interestRate'] = cust.interestRate;
        this.itemEdit['idResponsible'] = cust.idResponsible;
        this.itemEdit['idCurrency'] = cust.idCurrency;
        
        if( cust.isTax == true) {
          this.itemEdit['tax'] = this.getTax();
        }

      }
    }
    
    this.customer = data['customer'];
    this.updateTitle();
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
    this.updateTitle();
    this.setAllowChild();
  }


}