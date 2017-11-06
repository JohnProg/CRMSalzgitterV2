import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { ReactiveFormsModule, NgForm } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import {  Opportunity, IncoTerm, TCRMEntity } from '../../../model/index';
import {  OpportunityService } from '../../../services/oppservice.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseOppComponent } from '../../../catalogs/index';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';
import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-opportunityheader',
  templateUrl: './opportunityheader.component.html',
  styleUrls: ['./opportunityheader.component.scss'],
  providers: [],
})
export class OpportunityheaderComponent extends BaseOppComponent {


  itemEdit: Opportunity;


  ngBeforeInit() {
    super.ngBeforeInit();
    this.itemEdit = new Opportunity();
    this.catalogName = 'Opportunity';
    this.autoLoad = false;
    this._curService.setAPI('Opportunity/', this.catalogName, this.loadName);
    this.singleEditor = true;
    
  }




  initEntity() {
    this.itemEdit = new  Opportunity();
    this.itemEdit.idStatus = 1;
  }


}
