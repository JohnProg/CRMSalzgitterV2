import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';


import { Observable ,  Subscription } from 'rxjs';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';



import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';

import { EmailSenderComponent } from '../../components/email-sender/email-sender.component';

import { BaseComponent } from '../../catalogs/base.component';
import {  TCRMEntity } from '../../model/allmodels';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



@Component({
  selector: 'crm-quotationfromsupplierdialogemail',
  templateUrl: '../../components/email-sender/email-sender.component.html',
  styleUrls: ['../../components/email-sender/email-sender.component.scss']
})
export class QuotationfromsupplierdialogemailComponent extends EmailSenderComponent {


  idOpp: number = 0;
 

   ngBeforeInit() {
    
     this.catalogName = 'Quotation from Supplier Dialog';
    this.mainField = 'IdQuotationFromSupplier';
    this.baseApi = 'QuotationFromSupplierDialog'; 
    super.ngBeforeInit();
  }
  

}
