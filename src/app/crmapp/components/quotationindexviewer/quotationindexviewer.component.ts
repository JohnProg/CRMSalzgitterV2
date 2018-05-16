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

import {  GetPurchaseOrder_Result, GetBaseQuote_Result, PurchaseOrder, TCRMEntity } from '../../model/index';
import { EnumDocType } from '../../constants/index';

import { BaseComponent } from '../../catalogs/base.component';



import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'crm-quotationindexviewer',
  templateUrl: './quotationindexviewer.component.html',
  styleUrls: ['./quotationindexviewer.component.scss']
})
export class QuotationindexviewerComponent extends BaseComponent  {
  
    @Input() idParent: number = 0;
    @Input() byType: number = 0;
    @Input() allowChild: boolean = true;
    sortBy: string = 'id';
    //catalogName: string;
    baseApi: string;
    parentDoc: number;
    itemRoute: string;
    parentSearchField: string = "idOpportunity";

    @Input() parentRoute: string;
    @Input() parentScreen: number;
    @Input() moveToScr: boolean = false;

    ngBeforeInit() {
    
      super.ngBeforeInit();
      
      this.autoLoad = this.idParent > 0;
      
      this.setTitle = this.idParent == 0;
      
      this._curService.setAPI(this.baseApi, this.catalogName, this.loadName);

    }


    afterViewInit() {
      super.afterViewInit();
      this._actions.showFilterButton(this.idParent == 0);  
      if( this.byType > 0 && this.byType != this.parentDoc && this.allowChild == false ){
        this._actions.showAdd(false);
      } 
   }
 
    loadData() {
          this.isLoading = true;
          let b = new GetBaseQuote_Result();

          this._curService.customSearch( this.baseApi, this.getLoadParams());
          this.dataLoaded = true;
    }
  
    getLoadParams(): GetBaseQuote_Result {
      let ffilter = new GetBaseQuote_Result();
      ffilter[this.parentSearchField] = this.idParent;
      return ffilter;
    }
  
    editEntity(id: number) {
      
      if( this.moveToScr == true) {
         this._router.navigate([ '/' + this.itemRoute + '/edit/' + id, {  scrId: this.parentScreen, moveToScr: this.moveToScr   }]);
      }else {
        this._router.navigate([ '/' + this.itemRoute + '/edit/' + id]);
      }
    }
  
  

    addEntity() {
      
      if( this.byType == this.parentDoc && this.idParent > 0) {
        
        this._router.navigate([  '/' + this.itemRoute + '/createfromquote/', this.idParent]);
      } else {
        this._router.navigate(['/' + this.itemRoute + '/edit/', 0]);
      }
    }
  
  
    loadFromServer() {
    
      var sh = this._shared;
      if(sh.loadField != '') {
        
        this._curService.customSearch( this.itemRoute + '/searchByOpp', sh.search);
        sh.loadField = '';

      } else {
         //this._curService.loadAll(this.getPageParams(''));
     
      }
     
    }
  
    loadFromFilter(event) {
      this._curService.customSearch( this.itemRoute + '/searchByOpp', event);
    }

    afterLoadAll(itms: any) {
      this.isLoading = false;
    }

  
  }
  