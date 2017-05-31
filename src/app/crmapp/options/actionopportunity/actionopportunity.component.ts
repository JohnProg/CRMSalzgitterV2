import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { MdSnackBar } from '@angular/material';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Currency } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../catalogs/base.component';
import {TranslateService} from '@ngx-translate/core';
import { ActionopportunitytemplateemailComponent } from './+actionopportunitytemplateemail/actionopportunitytemplateemail.component';



@Component({
  selector: 'crm-actionopportunity',
  templateUrl: './actionopportunity.component.html',
  styleUrls: ['./actionopportunity.component.scss']
})
export class ActionopportunityComponent extends BaseComponent  {


  @ViewChild(ActionopportunitytemplateemailComponent) _templates: ActionopportunitytemplateemailComponent;
  constructor( public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone,
    public _http: Http, 
    public _tableService: TdDataTableService,
    public translate: TranslateService) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate);
    this.catalogName = 'Action Opportunities';
    this._curService.setAPI('ActionOpportunity/', this.catalogName);
  }

  addColumns() {
    this.columns.push({ name: 'Name', label: 'Name', tooltip: '' });
    this.columns.push({ name: 'EMailTo', label: 'EMailTo' });
  }

  expandProperties() {

    this._templates.loadTemplates();

  }



}
