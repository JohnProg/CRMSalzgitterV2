import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ViewChild, ContentChild, NgZone } from '@angular/core';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';


import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


import { Observable } from 'rxjs';
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
  selector: 'crm-shippingindex',
  templateUrl: './shippingindex.component.html',
  styleUrls: ['./shippingindex.component.scss']
})
export class ShippingindexComponent  {


  @Input() idPo: number = 0;
  docType: number = 5;
 constructor( public _route: ActivatedRoute, 
            public _actions: ActionsService,) {

    this._route.params.subscribe((params: { id: number }) => {
      this.idPo = params.id;
      
    });
  }

  search(e) {
    this._actions.search(e);
  }

}
