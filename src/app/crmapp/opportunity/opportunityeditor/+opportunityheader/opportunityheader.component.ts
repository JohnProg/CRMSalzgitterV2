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


import { Observable ,  Observer ,  BehaviorSubject } from 'rxjs';
import { BaseOppComponent } from '../../../catalogs/index';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';


import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';

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
    this.catalogName = 'OPP';
    this.autoLoad = false;
    this._curService.setAPI('Opportunity/', this.catalogName, this.loadName);
    this.singleEditor = true;
    
  }




  initEntity() {
    this.itemEdit = new  Opportunity();
    this.itemEdit.idStatus = 1;
  }


}
