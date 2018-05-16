import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Currency } from '../../model/allmodels';

import { Observable } from 'rxjs';
import { BaseComponent } from '../base.component';

import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { QueryResponse } from '../../model/queries/index';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



// export const curQl = gql`
//  mutation createCurrency($currency: { id: '', name: '', description: '', aSign: '' }) {
//     createCurrency( value: $currency) {
//          id name description aSign
//       }
//   }
// `;

@Component({
  selector: 'crm-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']

})
export class CurrencyComponent extends BaseComponent {



  itemEdit: Currency;
  
  ngBeforeInit() {
    super.ngBeforeInit();
    this.catalogName = 'Currencies';
    this._curService.setAPI('Currency', this.catalogName, this.loadName);
  }



  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }

  addColumns() {
    super.addColumns();
    this.columns.push({ name: 'aSign', label: 'Currency symbol' });
  }


  editEntity(id: number) {
    this._actions.updateTitle({ action: 'Edit', title: this.catalogName , tparam: this.titleParam});
    this.itemEdit = <Currency>this._curService.itemEdit;
    this._curService.load(id);

    //this._curService.loadQl( gCurrency, { ssid: id }, 'currency' );

  }

  
}
