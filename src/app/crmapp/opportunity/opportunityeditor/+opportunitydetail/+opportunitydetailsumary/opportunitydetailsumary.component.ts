import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';
import { OpportunityDetailSumary, OpportunityDetailSumaryProperty, Property, TCRMEntity, ProductProperty } from '../../../../model/allmodels';
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

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor, EditordetailsumaryComponent } from '../../../../components/index';
import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-opportunitydetailsumary',
  templateUrl: './opportunitydetailsumary.component.html',
  styleUrls: ['./opportunitydetailsumary.component.scss']
})
export class OpportunitydetailsumaryComponent extends EditordetailsumaryComponent {

  itemEdit: OpportunityDetailSumary;

  constructor(public _router: Router,
      public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone, 
    public _http: Http, 
    public _tableService: TdDataTableService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public apollo: Apollo) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, route, apollo);
 
    this.catalogName = 'Opp Details Sumary';
    this._curService.setAPI('OpportunityDetailSumary', this.catalogName);
    this.refreshItemUrl = 'OpportunityDetailSumary/searchByDetail';
    this.sumProperties = 'opportunityDetailSumaryProperties';

  }

    
  initEntity() {
    this.itemEdit = new OpportunityDetailSumary() ;
    this.itemEdit.idOpportunityDetail  = this.idDetail;
    this.itemEdit.dateCreated = new Date();
    this.itemEdit.price = this.price;
    this.itemEdit.quantity = this.maxQty;
    this.initDetails();
  }


 prepareToSave() {
    this.pdetails.forEach( (t: OpportunityDetailSumaryProperty[]) => {
      this.itemEdit.opportunityDetailSumaryProperties = new Array<OpportunityDetailSumaryProperty>();
      t.forEach( (o: OpportunityDetailSumaryProperty ) => {
            let p: OpportunityDetailSumaryProperty = new OpportunityDetailSumaryProperty();
            p.idOpportunityDetailSumary = o.idOpportunityDetailSumary;
            p.idProperty = o.idProperty;
            p.propertyValue = o.propertyValue;
            this.itemEdit.opportunityDetailSumaryProperties.push(p);
      });
    });
 }


}
