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


import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'crm-templateemail',
  templateUrl: './templateemail.component.html',
  styleUrls: ['./templateemail.component.scss']
})
export class TemplateemailComponent extends BaseComponent {

  ngBeforeInit() {
    super.ngBeforeInit();
    this.catalogName = 'Template Email';
    this._curService.setAPI('TemplateEmail/', this.catalogName, this.loadName);   
  }

  addColumns() {
    this.columns.push({ name: 'name', label: 'Name', tooltip: '' });
    this.columns.push({ name: 'eMailSubject', label: 'EMail Subject' });
  }

}
