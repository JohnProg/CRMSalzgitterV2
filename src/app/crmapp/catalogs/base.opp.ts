import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { MdSelect } from '@angular/material';
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
import { MdSnackBar } from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import {  Opportunity, IncoTerm, TCRMEntity } from '../model/index';
import { IDeleteEventModel } from '../model/deleteeventmodel';
import { ActionsService } from '../services/actions.services';
import { BaseComponent } from './base.component';
import { AbstractValueAccessor } from '../components/abstractvalueaccessor';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


export const oppQl = gql`
  query {
    currencies { id name description aSign }
    responsibles { id name isActive  }
    estatusOpportunities { id name description }
    customers { id name }
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

  @ViewChild('idCustomerContact') custContactSelect: MdSelect;
  @ViewChild('idIncoTerm') incoTermSelect: MdSelect;
  @ViewChild('idCountryOrigin') countryOrigin: MdSelect;

  @Input() idDoc: number = 0;
  deliveryRequired: boolean = false;


   loadCatalogs() {
    this._curService.loadQl(oppQl, undefined)
    .subscribe(({data}) => {
      this.catDocType = data['docType'];
      this.catStatus = data['estatusOpportunities'];
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
      debugger
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    }
    );   
  }


  afterViewInit(): void {
    this._actions.showAdd(false);
    this._actions.showSearch(false);
    this._actions.showSave(true);
    this._actions.showCancel(false);

    if (this.idDoc > 0) {
      this.editEntity(this.idDoc);
      this._actions.updateTitle('Edit ' + this.idDoc.toString());
    } else {
      this._actions.updateTitle('Create ');
      this.addEntity();
    }
  }


  afterLoadItem(item: TCRMEntity) {
    super.afterLoadItem(item);
    this.itemEdit = item;
    if(item['idCustomer']) {
      this.loadCustomerContact(item['idCustomer']);
    }
    this.setDeliveryRequired();
  }


  onCustomerChange(event: any) {
    this.itemEdit['idCustomerContact'] = undefined;
    this.loadCustomerContact(event.value);
  }


  onMillChange(event: any) {
    this.itemEdit['idCountryOrigin'] = undefined;
    this.loadCountryOrigin(event.value);
  }

  incoTermChange(item: any) {
    this.setDeliveryRequired();
  }

  setDeliveryRequired() {
   if( this.catIncoTerm != undefined) {
      setTimeout(() => {
    
          let req =  <IncoTerm>(this.catIncoTerm.filter( i => i.id === this.itemEdit['idIncoTerm'])[0]);
          if( req !== undefined) {
            this.deliveryRequired = req['deliveryRequired'];
            if ( this.deliveryRequired === false ) {
              this.itemEdit['idDeliveryPoint'] = undefined;
            }
          }

      },1000);
   }
  }  

  afterCreate(item: TCRMEntity) {
    super.afterCreate(item);
    this.idDoc = item.id;
  }
}