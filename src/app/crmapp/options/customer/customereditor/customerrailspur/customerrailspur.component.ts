import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';


import { Observable ,  Observer ,  BehaviorSubject } from 'rxjs';
import { BaseComponent,  } from '../../../../catalogs/base.component';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn,
   } from '@covalent/core/data-table';

import { TdSearchBoxComponent } from '@covalent/core/search';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


import { Router, ActivatedRoute } from '@angular/router';


import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  Customer, TCRMEntity, Colony } from '../../../../model/allmodels';
import { SelectcolonyComponent } from '../../../../components/index';
import { CustomerbaseComponent } from '../customerbase.component';


@Component({
  selector: 'crm-customerrailspur',
  templateUrl: './customerrailspur.component.html',
  styleUrls: ['./customerrailspur.component.scss']
})
export class CustomerrailspurComponent  extends CustomerbaseComponent {



  ngBeforeInit() {
    super.ngBeforeInit();
     this.singleEditor = true;
    this.autoLoad = false; 
  }
}
