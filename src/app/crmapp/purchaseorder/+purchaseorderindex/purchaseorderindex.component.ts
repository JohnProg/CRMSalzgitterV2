import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ViewChild, ContentChild, NgZone } from '@angular/core';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';
import { BehaviorSubject ,  Observable } from 'rxjs';

import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }  from '@angular/platform-browser';
import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ActionsService } from '../../services/actions.services';
import { ConfigurationService } from '../../services/configuration.service';

import { Product } from '../../model/allmodels';
import { BaseComponent } from '../../catalogs/base.component';
import { getQuotationFromSupplier_Result } from '../../model/allmodels';


import { EnumDocType } from '../../constants/index';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'crm-purchaseorderindex',
  templateUrl: './purchaseorderindex.component.html',
  styleUrls: ['./purchaseorderindex.component.scss']
})
export class PurchaseorderindexComponent {

  @Input() idQFS: number = 0;
  @Input() idQTS: number = 0;
  @Input() idOpp: number = 0;
  byType: number = 0;
  docType: number = 4;
  constructor( 
    public _actions: ActionsService,
    public _ngZone: NgZone,
    private _router: Router,
    public _route: ActivatedRoute) {

    this._route.params.subscribe((params: { id: number, bytype: number }) => {
      this.byType = params.bytype;
      switch(params.bytype) {
        case EnumDocType.Opportunity:
             this.idOpp = params.id;
             break;
        case EnumDocType.QuotationFromSupplier:
             this.idQFS = params.id;
             break;
        case EnumDocType.QuotationToCustomer:
             this.idQTS = params.id;
             break;
        default:
             break;
      }
    });
  }

  search(e) {
    this._actions.search(e);
  }
}
