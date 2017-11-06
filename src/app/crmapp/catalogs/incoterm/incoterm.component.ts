
import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';


import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';

import { BaseComponent } from '../base.component';
import { IncoTerm } from '../../model/allmodels';
import {TranslateService} from '@ngx-translate/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-incoterm',
  templateUrl: './incoterm.component.html',
  styleUrls: ['./incoterm.component.scss'],
    providers: [ ],
})
export class IncotermComponent extends BaseComponent {

  itemEdit: IncoTerm;

  ngBeforeInit() {
    super.ngBeforeInit();
    this.catalogName = 'IncoTerm';
    this._curService.setAPI('IncoTerm/', this.catalogName, this.loadName);   
  }




  addColumns() {

    super.addColumns();
      this.columns.push({ name: 'deliveryRequired', label: 'Delivery Req.' });
    
  }

    editEntity( id: number ) {
      this.itemEdit = <IncoTerm>this._curService.itemEdit;
      this._curService.load(id);
    }


    addEntity() {
      this.itemEdit = new IncoTerm();
      this.itemEdit.id = 0;

    }
}
