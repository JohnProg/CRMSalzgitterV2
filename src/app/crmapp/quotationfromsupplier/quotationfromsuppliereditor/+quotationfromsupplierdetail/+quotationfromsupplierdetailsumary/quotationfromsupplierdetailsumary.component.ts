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
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';


import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor, EditordetailsumaryComponent } from '../../../../components/index';
import { QuotationFromSupplierDetailSumary, QuotationFromSupplierDetailSumaryProperty, 
     Property, TCRMEntity, ProductProperty } from '../../../../model/allmodels';


import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-quotationfromsupplierdetailsumary',
  templateUrl: '../../../../components/editordetailsumary/editordetailsumary.component.html',
  styleUrls: ['./quotationfromsupplierdetailsumary.component.scss']
})
export class QuotationfromsupplierdetailsumaryComponent extends EditordetailsumaryComponent {

  itemEdit: QuotationFromSupplierDetailSumary;


  // ngBeforeInit() {
  //   super.ngBeforeInit();
  //   this.catalogName = 'Quotation from Supplier Details Sumary';
  //   this._curService.setAPI('QuotationFromSupplierDetailSumary', this.catalogName, this.loadName);
  //   this.refreshItemUrl = 'QuotationFromSupplierDetailSumary/searchByDetail';
  //   this.sumProperties = 'quotationFromSupplierDetailSumaryProperties';  
  // }

    initEntity() {
    
    this.itemEdit = new QuotationFromSupplierDetailSumary() ;
    this.itemEdit.idQuotationFromSupplierDetail  = this.idDetail;
    this.itemEdit.idDetail = this.idDetail;
    this.itemEdit.dateCreated = new Date();
    this.itemEdit.price = this.price;
    this.itemEdit.quantity = this.maxQty;
    this.initDetails();
  }

 prepareToSave() {
    this.pdetails.forEach( (t: QuotationFromSupplierDetailSumaryProperty[]) => {
      this.itemEdit.quotationFromSupplierDetailSumaryProperties = new Array<QuotationFromSupplierDetailSumaryProperty>();
      t.forEach( (o: QuotationFromSupplierDetailSumaryProperty ) => {
            let p: QuotationFromSupplierDetailSumaryProperty = new QuotationFromSupplierDetailSumaryProperty();
            p.idQuotationFromSupplierDetailSumary = o.idQuotationFromSupplierDetailSumary;
            p.idProperty = o.idProperty;
            p.propertyValue = o.propertyValue;
            this.itemEdit.quotationFromSupplierDetailSumaryProperties.push(p);
      });
    });
 }


}
