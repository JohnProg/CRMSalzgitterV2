import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';
import { OpportunityDetailSumary, OpportunityDetailSumaryProperty, Property } from '../../../../model/allmodels';
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
import { AbstractValueAccessor } from '../../../../components/abstractvalueaccessor';




@Component({
  selector: 'crm-opportunitydetailsumary',
  templateUrl: './opportunitydetailsumary.component.html',
  styleUrls: ['./opportunitydetailsumary.component.scss']
})
export class OpportunitydetailsumaryComponent extends BaseComponent {

  @Input() idDetail: number = 0;

   _columns: BehaviorSubject<ITdDataTableColumn[]>;
  pcolumns: Observable<ITdDataTableColumn[]>;
  _pcolumns: Array<ITdDataTableColumn>;
  itemEdit: OpportunityDetailSumary;
  sortBy: string = 'ItemDescription';
  

  constructor(public _router: Router, public _route: ActivatedRoute, 
    public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone, 
    public _http: Http, 
    public _tableService: TdDataTableService) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService);

    this._columns = <BehaviorSubject<ITdDataTableColumn[]>>new BehaviorSubject([]);
    this.pcolumns = this._columns.asObservable();


    this.catalogName = 'Opp Details Sumary';
    this._curService.setAPI('OpportunityDetailSumary', this.catalogName);
    this.itemEdit = new OpportunityDetailSumary();
  }

  ngOnInitClass() {
    this.entList = <Observable<OpportunityDetailSumary[]>>this._curService.entList;
    this.initData();
  }

  initData() {
    let pparams = new URLSearchParams();
    pparams.set('iddetail', this.idDetail.toString());
    this._curService.loadCustomAll('OpportunityDetailSumary/searchByDetail', pparams, true);
    this.initEntity();
  }

  addColumns() {}

  initEntity() {
    this.itemEdit = new OpportunityDetailSumary() ;
    this.itemEdit.IdOpportunityDetail  = this.idDetail;
    this.itemEdit.DateCreated = new Date();
    this.itemEdit.OpportunityDetailSumaryProperties = new Array<OpportunityDetailSumaryProperty>();
    
  }

  addEntity() {
    this.initEntity();
    this.isEditing = true;
  }

  

afterLoadAll(itms: OpportunityDetailSumary[]) {
      if( itms !== undefined && itms.length > 0 && itms[0].OpportunityDetailSumaryProperties !== undefined 
        && itms[0].OpportunityDetailSumaryProperties.length > 0) {
        this._pcolumns = new Array<ITdDataTableColumn>();
        itms[0].OpportunityDetailSumaryProperties.forEach( (t: OpportunityDetailSumaryProperty) => {
          this._pcolumns.push( (<ITdDataTableColumn> { name: 'prop' +  t.IdProperty,  label: t.Property.Name, tooltip: '', IdProperty: t.IdProperty }));
        });

        itms.forEach( (t: OpportunityDetailSumary) => {
          t.OpportunityDetailSumaryProperties.forEach( (p: OpportunityDetailSumaryProperty) => {
            t['prop' + p.IdProperty] = p.PropertyValue;
          });
        });

        this._pcolumns.push( (<ITdDataTableColumn> { name: 'Quantity' ,  label: 'Quantity', tooltip: '', draw: true }));
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'Price' ,  label: 'Price', tooltip: '', numeric: true, format: CURRENCY_FORMAT, draw: true }));
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'Amount' ,  label: 'Amount', tooltip: '', numeric: true, format: CURRENCY_FORMAT, draw: true }));
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'Total' ,  label: 'Total', tooltip: '', numeric: true, format: CURRENCY_FORMAT, draw: true }));
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'Comment' ,  label: 'Comment', tooltip: '', draw: true }));
        this._pcolumns.push( (<ITdDataTableColumn> { name: 'tActions' ,  label: '.', tooltip: '', draw: true }));
        this._columns.next(this._pcolumns);
      }
      this._curService._entList.next(itms);
}

  afterLoadItem(itm: OpportunityDetailSumary) {
    super.afterLoadItem(itm);
    this.itemEdit = itm;
  }



}
