import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ViewChild, ContentChild, NgZone } from '@angular/core';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';


import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


import { Observable ,  Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }  from '@angular/platform-browser';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, DATE_FORMAT } from '../../services/catalog.service';
import { ActionsService } from '../../services/actions.services';
import { ConfigurationService } from '../../services/configuration.service';

import { Product, GetBaseQuote_Result } from '../../model/allmodels';
import { BaseComponent } from '../../catalogs/base.component';
import { GetOpportunities } from '../../model/allmodels';


import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { debug } from 'util';
import {FormControl} from '@angular/forms';

import { Moment } from 'moment';
import * as moment from 'moment';
import { MatDatepicker } from '@angular/material';


import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


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
@Component({
  selector: 'crm-filteropp',
  templateUrl: './filteropp.component.html',
  styleUrls: ['./filteropp.component.scss']
})
export class FilteroppComponent extends BaseComponent {



  filterData: GetBaseQuote_Result;

  lstStatus = Array<number>();
  @Output() onLoadData = new EventEmitter<any>();
  @Input() idDocType: number = 1;

  //@ViewChild(MatDatepicker) startDate: MatDatepicker<Moment>;


  ngBeforeInit() {
    super.ngBeforeInit();
    //this.sortBy = 'id';
    //this.catalogName = 'OPP';
    this.autoLoad = false;
    this.filterData = new GetBaseQuote_Result();
    //this._curService.setAPI('Opportunity/', this.catalogName, this.loadName);   
  }


  loadCatalogs() {
    this._curService.loadQl(oppQl, { iddoc: this.idDocType })
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


  cancelEdit(): void {
    this._actions.showFilterPanel();
    this.resetSearch(this.form)
  }

  resetSearch(form) {
    form.reset();
  }


  public loadData() {
    if( this.lstStatus != null && this.lstStatus.length > 0) {
       this.filterData.listStatus = this.lstStatus.join(',');
    } else {
      this.filterData.listStatus = undefined;
    }
    this.onLoadData.emit(this.filterData);
    if( this.autoHideFilterPanel == true) {
      this.showFilter = !this.showFilter;
    }
  }

  getSelectedText(value) {
    if( value != null && value.length > 0) {
      var d = this.catStatus.filter(t => t.id == value[0])[0];
      return d.description;
    }
    return '';
  }


}
