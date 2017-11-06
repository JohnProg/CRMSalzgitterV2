import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor, EditordetailsumaryComponent } from '../../../../components/index';
import { QuotationToCustomerDetailSumary, QuotationToCustomerDetailSumaryProperty, 
     Property, TCRMEntity, ProductProperty } from '../../../../model/allmodels';



import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';




@Component({
  selector: 'crm-quotationtocustomerdetailsumary',
  templateUrl: '../../../../components/editordetailsumary/editordetailsumary.component.html',
  styleUrls: ['./quotationtocustomerdetailsumary.component.scss']
})
export class QuotationtocustomerdetailsumaryComponent extends EditordetailsumaryComponent {

  itemEdit: QuotationToCustomerDetailSumary;

  // ngBeforeInit() {
  //   super.ngBeforeInit();
  //    this.catalogName = 'Quotation to Customer Details Sumary';
  //   this._curService.setAPI('QuotationToCustomerDetailSumary', this.catalogName, this.loadName);
  //   this.refreshItemUrl = 'QuotationToCustomerDetailSumary/searchByDetail';
  //   this.sumProperties = 'quotationToCustomerDetailSumaryProperties'; 
  // }

  initEntity() {
    
    this.itemEdit = new QuotationToCustomerDetailSumary() ;
    this.itemEdit.idQuotationToCustomerDetail  = this.idDetail;
    this.itemEdit.idDetail = this.idDetail;
    this.itemEdit.dateCreated = new Date();
    this.itemEdit.price = this.price;
    this.itemEdit.quantity = this.maxQty;
    this.initDetails();
  }

 prepareToSave() {
    this.pdetails.forEach( (t: QuotationToCustomerDetailSumaryProperty[]) => {
      this.itemEdit.quotationToCustomerDetailSumaryProperties = new Array<QuotationToCustomerDetailSumaryProperty>();
      t.forEach( (o: QuotationToCustomerDetailSumaryProperty ) => {
            let p: QuotationToCustomerDetailSumaryProperty = new QuotationToCustomerDetailSumaryProperty();
            p.idQuotationToCustomerDetailSumary = o.idQuotationToCustomerDetailSumary;
            p.idProperty = o.idProperty;
            p.propertyValue = o.propertyValue;
            this.itemEdit.quotationToCustomerDetailSumaryProperties.push(p);
      });
    });
 }

}
