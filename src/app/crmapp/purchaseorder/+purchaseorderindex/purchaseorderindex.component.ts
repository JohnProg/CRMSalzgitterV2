import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ViewChild, ContentChild, NgZone } from '@angular/core';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }  from '@angular/platform-browser';
import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ActionsService } from '../../services/actions.services';
import { ConfigurationService } from '../../services/configuration.service';

import { Product } from '../../model/allmodels';
import { BaseComponent } from '../../catalogs/base.component';
import { getQuotationFromSupplier_Result } from '../../model/allmodels';

import {TranslateService} from '@ngx-translate/core';
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
  constructor( public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone,
    private _router: Router,
    public _http: Http, 
    public _tableService: TdDataTableService,
    public _route: ActivatedRoute,
    public translate: TranslateService) {

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

  search(t: string) {}
}
