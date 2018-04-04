import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ViewChild, ContentChild, NgZone } from '@angular/core';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';

import { MatSnackBar } from '@angular/material';
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



@Component({
  selector: 'crm-quotationtocustomerindex',
  templateUrl: './quotationtocustomerindex.component.html',
  styleUrls: ['./quotationtocustomerindex.component.scss']
})
export class QuotationtocustomerindexComponent  {

  @Input() idQFS: number = 0;
  docType: number = 3;
  constructor( 
    public _actions: ActionsService,

    public _route: ActivatedRoute) {

    this._route.params.subscribe((params: { id: number }) => {
      this.idQFS = params.id;
    });
  }

  search(e) {
    this._actions.search(e);
  }
}
