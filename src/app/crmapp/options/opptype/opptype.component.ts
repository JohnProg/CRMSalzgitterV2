import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import {  DocType } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../catalogs/base.component';
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

@Component({
  selector: 'crm-opptype',
  templateUrl: './opptype.component.html',
  styleUrls: ['./opptype.component.css']
})
export class OpptypeComponent extends BaseComponent {
  
  
     itemEdit: DocType;
  //@ViewChild(ProductpropertyComponent) _props: ProductpropertyComponent;
  
  
    ngBeforeInit() {
      super.ngBeforeInit();
      this.catalogName = 'Opportunity Type';
      this._curService.setAPI('DocType/', this.catalogName, this.loadName);
    }
  
  
    // ngOnInitClass() {
    //   this.entList = <Observable<getProductProperties_Result[]>>this._curService.entList;
    //   this.initEntity();
  
  
    // }
  
  
  }
  