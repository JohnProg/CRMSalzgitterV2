import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

import { Mill } from '../../model/allmodels';

import { Observable } from 'rxjs';
import { BaseComponent } from '../base.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';


import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



@Component({
  selector: 'crm-mill',
  templateUrl: './mill.component.html',
  styleUrls: ['./mill.component.scss']
})
export class MillComponent extends BaseComponent {
  
    ngBeforeInit() {
      super.ngBeforeInit();
      this.catalogName = 'Mills';
      this._curService.setAPI('Mill/', this.catalogName, this.loadName);   
    }
  
  
  }
  