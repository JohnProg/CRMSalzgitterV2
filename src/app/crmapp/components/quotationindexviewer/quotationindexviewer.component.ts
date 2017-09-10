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

import {  GetPurchaseOrder_Result, PurchaseOrder, TCRMEntity } from '../../model/index';
import { EnumDocType } from '../../constants/index';

import { BaseComponent } from '../../catalogs/base.component';

import {TranslateService} from '@ngx-translate/core';

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
    catalogName: string;
    baseApi: string;
    parentDoc: number;
    parentRoute: string;
   

  
    ngOnInitClass() {
      this._curService.setAPI(this.baseApi, this.catalogName);
      super.ngOnInitClass();
    }


    ngAfterViewInit() {
 
      super.ngAfterViewInit();

      if( this.byType > 0 && this.byType != this.parentDoc && this.allowChild == false ){
        this._actions.showAdd(false);
      } 
     
  
    }

    loadData() {
          this._curService.loadCustomAll(this.baseApi , this.getLoadParams());
          this.dataLoaded = true;
    }
  
    getLoadParams(): URLSearchParams {
      let pparams = new URLSearchParams();
      pparams.set('idquote', this.idParent.toString());
      pparams.set('bytype', this.byType.toString());
      return pparams;
    }
  
    editEntity(id: number) {
      this._router.navigate([ '/' + this.parentRoute + '/edit/' + id]);
    }
  
  

    addEntity() {
      
      if( this.byType == this.parentDoc && this.idParent > 0) {
        
        this._router.navigate([  '/' + this.parentRoute + '/createfromquote/', this.idParent]);
      } else {
        this._router.navigate(['/' + this.parentRoute + '/edit/', 0]);
      }
    }
  
  

  
  }
  