import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { OpportunityDetail } from '../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';



@Component({
  selector: 'crm-opportunitydetail',
  templateUrl: './opportunitydetail.component.html',
  styleUrls: ['./opportunitydetail.component.scss'],
  providers: []
})
export class OpportunitydetailComponent extends BaseComponent {

  @Input() idOpp: number = 0;

  itemEdit: OpportunityDetail;
  sortBy: string = 'ItemDescription';


  constructor(public _router: Router, public _route: ActivatedRoute, public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone) {
    super(_curService, _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone);
    this.catalogName = 'Opp Details';
    //this._curService.setAPI('OpportunityDetail', this.catalogName);
  }

  ngOnInitClass() {
    this.entList = <Observable<OpportunityDetail[]>>this._curService.entList;
    this.initData();
  }

  initData() {
    let pparams = new URLSearchParams();
    pparams.set('idopp', this.idOpp.toString());
    this._curService.loadCustomAll('OpportunityDetail/searchByOpp', pparams);


    this.initEntity();
    this.isEditing$ = this._curService.isEditing$.subscribe(status => {
      this.isEditing = status;
      this.reloadPaged('');
    });
  }

  afterViewInit(): void {
    
    this._actions.updateTitle('Details for opportunity ' + this.idOpp.toString());
  }

  addColumns() {
    this.columns.push({ name: 'ItemDescription', label: 'Item Description' });
    this.columns.push({ name: 'ProductDescription', label: 'Product', tooltip: '' });

    this.columns.push({ name: 'ItemQuantity', label: 'Quantity' });
    this.columns.push({ name: 'ItemPrice', label: 'Price', numeric: true, format: CURRENCY_FORMAT, sortable: false });
    this.columns.push({ name: 'ItemExtended', label: 'Extended', numeric: true, format: CURRENCY_FORMAT, sortable: false });
  }

  initEntity() {
    this.itemEdit = new OpportunityDetail();
  }

}
