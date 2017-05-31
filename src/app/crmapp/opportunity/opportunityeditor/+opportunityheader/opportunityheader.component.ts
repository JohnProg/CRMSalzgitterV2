import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { ReactiveFormsModule, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import {  Opportunity, IncoTerm } from '../../../model/allmodels';
import {  OpportunityService } from '../../../services/oppservice.service';

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
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'crm-opportunityheader',
  templateUrl: './opportunityheader.component.html',
  styleUrls: ['./opportunityheader.component.scss'],
  providers: [],
})
export class OpportunityheaderComponent extends BaseComponent {

  @Input() idOpp: number = 0;
  itemEdit: Opportunity;
  
  @ViewChild('idCustomerContact') custContactSelect: AbstractValueAccessor;
  @ViewChild('idIncoTerm') incoTermSelect: AbstractValueAccessor;


  deliveryRequired: boolean = false;

  constructor(public _router: Router, 
    public _route: ActivatedRoute,
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
    public _oppservice: OpportunityService    ) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate);

    this.itemEdit = new Opportunity();
    this.catalogName = 'Opportunity';
    this.autoLoad = false;
    this._curService.setAPI('Opportunity/', this.catalogName);
    this.singleEditor = true;

  }


  ngOnInitClass() {

    this.entList = <Observable<Opportunity[]>>this._curService.entList;


  }

  afterViewInit(): void {
    this._actions.showAdd(false);
    this._actions.showSearch(false);
    this._actions.showSave(true);
    this._actions.showCancel(false);

    if (this.idOpp > 0) {
      this.editEntity(this.idOpp);
      this._actions.updateTitle('Edit ' + this.idOpp.toString());
    } else {
      this._actions.updateTitle('Create ');
      this.addEntity();
    }
  }

  initEntity() {
    this.itemEdit = new  Opportunity();
    this.itemEdit.IdStatus = 1;
  }

  afterLoadItem(item: Opportunity) {

    super.afterLoadItem(item);
    this.itemEdit = item;
    this._oppservice.currentOpp = this.itemEdit;
    this.custContactSelect.loadCustomDataFromId(item.IdCustomer);
    let bself = this;
    setTimeout(function() {
        let req =  (<IncoTerm>bself.incoTermSelect.getItemSelected()).DeliveryRequired;
        bself.setDeliveryRequired(req);
    },500);
  }

  afterSave(item: Opportunity) {}

  onCustomerChange(event: any) {}
  incoTermChange(item: IncoTerm) {
    this.setDeliveryRequired(item.DeliveryRequired);
  }

  setDeliveryRequired(isreq: boolean) {
    this.deliveryRequired = isreq;
    if ( this.deliveryRequired === false ) {
      this.itemEdit.DeliveryLocation = undefined;
    }
  }
}
