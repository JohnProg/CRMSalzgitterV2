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
  selector: 'crm-shippingindex',
  templateUrl: './shippingindex.component.html',
  styleUrls: ['./shippingindex.component.scss']
})
export class ShippingindexComponent  {


  @Input() idPo: number = 0;

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
