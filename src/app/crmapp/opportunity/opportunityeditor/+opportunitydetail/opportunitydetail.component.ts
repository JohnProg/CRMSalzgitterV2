import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { OpportunityDetail, Opportunity, GetCustomerProductData_Result } from '../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../catalogs/base.component';
import {  EditordetailComponent } from '../../../components/index';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';
import { OpportunitydetailsumaryComponent } from './+opportunitydetailsumary/opportunitydetailsumary.component';
import {TranslateService} from '@ngx-translate/core';
import { IDeleteEventModel } from '../../../model/deleteeventmodel';
import { MatSelect } from '@angular/material';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const productQl = gql`
  query {
    products { id name description }
  }
`;


const getProductData = gql`
  query 
        productData($idcust: Int!, $idproduct: Int!) {
            getCustomerProductData(idcust: $idcust, idproduct: $idproduct) { currentPrice id idCustomer idProduct isAutomotive partNumberBuyer partNumberOEM platform productName prodDescription } 
        }
`;
@Component({
  selector: 'crm-opportunitydetail',
  templateUrl: './opportunitydetail.component.html',
  styleUrls: ['./opportunitydetail.component.scss'],
  providers: []
})
export class OpportunitydetailComponent extends EditordetailComponent {

  itemEdit: OpportunityDetail;


  baseApi: string = 'OpportunityDetail';
  catalogName: string = 'Opportunity Details';



  initEntity() {
    this.itemEdit = new OpportunityDetail() ;
    this.itemEdit.idOpportunity  = this.idOpp;
    this.itemEdit.dateAdded = new Date();
    this.itemEdit.idProduct = 0;
  }




}
