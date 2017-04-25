import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import {  Opportunity } from '../../../model/allmodels';
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
  selector: 'crm-opportunityheader',
  templateUrl: './opportunityheader.component.html',
  styleUrls: ['./opportunityheader.component.scss'],
  providers: [],
})
export class OpportunityheaderComponent extends BaseComponent {

  @Input() idOpp: number = 0;
  itemEdit: Opportunity;
  
  @ViewChild('idCustomerContact') custContactSelect: AbstractValueAccessor;
  
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
    public _tableService: TdDataTableService    ) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService);

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
      this._actions.updateTitle('Edit opportunity ' + this.idOpp.toString());
    } else {
      this._actions.updateTitle('Create opportunity ');
      this.addEntity();
    }
  }

  initEntity() {
    this.itemEdit = new  Opportunity();
  }

  afterLoadItem(item: Opportunity) {

    super.afterLoadItem(item);
    this.itemEdit = item;
    this.custContactSelect.loadCustomData(item.IdCustomer);

  }

  afterSave(item: Opportunity) {}

  onCustomerChange(event: any) {}

}
