import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';


import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../base.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'crm-templateemail',
  templateUrl: './templateemail.component.html',
  styleUrls: ['./templateemail.component.scss']
})
export class TemplateemailComponent extends BaseComponent {

 constructor(
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
 

    this.catalogName = 'Template Email';
    this._curService.setAPI('TemplateEmail/', this.catalogName);
  }

  addColumns() {
    this.columns.push({ name: 'Name', label: 'Name', tooltip: '' });
    this.columns.push({ name: 'EMailSubject', label: 'EMail Subject' });
  }

}
