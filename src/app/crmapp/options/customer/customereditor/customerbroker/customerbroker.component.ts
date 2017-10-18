import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent,  } from '../../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Router, ActivatedRoute } from '@angular/router';


import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  Customer, TCRMEntity, Colony } from '../../../../model/allmodels';
import { SelectcolonyComponent } from '../../../../components/index';
import { CustomerbaseComponent } from '../customerbase.component';



@Component({
  selector: 'crm-customerbroker',
  templateUrl: './customerbroker.component.html',
  styleUrls: ['./customerbroker.component.scss']
})
export class CustomerbrokerComponent extends CustomerbaseComponent {


  ngBeforeInit() {
    super.ngBeforeInit();
     this.singleEditor = true;
    this.autoLoad = false; 
  }
}
