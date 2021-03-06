import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { CatalogService } from '../../../services/catalog.service';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { ConfigurationService } from '../../../services/configuration.service';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn,
   } from '@covalent/core/data-table';

import { TdSearchBoxComponent } from '@covalent/core/search';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';

import { Customer } from '../../../model/allmodels';

import { Observable } from 'rxjs';
import { BaseComponent } from '../../../catalogs/base.component';
import { Router, ActivatedRoute } from '@angular/router';


import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-customerindex',
  templateUrl: './customerindex.component.html',
  styleUrls: ['./customerindex.component.scss']
})
export class CustomerindexComponent  extends BaseComponent  {


  ngBeforeInit() {
    super.ngBeforeInit();
    this.catalogName = 'Customer';
    this._curService.setAPI('Customer/', this.catalogName, this.loadName);   
  }



  editEntity(id: number) {

    this._router.navigate(['options/customer/edit/' + id]);
  }


  addEntity() {

    this._router.navigate(['options/customer/edit/' + 0]);
  }


  addColumns() {

    //super.addColumns();
    this.columns.push({ name: 'name', label: 'Name', tooltip: '' });
    this.columns.push({ name: 'rfc', label: 'RFC' })
    this.columns.push({ name: 'phone', label: 'Phone' })
  }

}
