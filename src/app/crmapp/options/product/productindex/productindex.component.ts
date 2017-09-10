import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { CatalogService } from '../../../services/catalog.service';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { ConfigurationService } from '../../../services/configuration.service';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';

import { Product } from '../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../catalogs/base.component';
import { Router, ActivatedRoute } from '@angular/router';

import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-productindex',
  templateUrl: './productindex.component.html',
  styleUrls: ['./productindex.component.scss'],
  providers: [ ]
})
export class ProductindexComponent extends BaseComponent  {



  ngBeforeInit() {
    super.ngBeforeInit();
    this.catalogName = 'Product';
    this._curService.setAPI('Product/', this.catalogName);   
  }

  ngOnInitClass() {
    this.entList = <Observable<Product[]>>this._curService.entList;
    this.initData();
    this.reloadPaged();
  }

  editEntity(id: number) {

    this._router.navigate(['options/products/edit/' + id]);
  }


  addEntity() {

    this._router.navigate(['options/products/edit/' + 0]);
  }


  addColumns() {

    super.addColumns();
    this.columns.push({ name: 'FamilyName', label: 'Family', tooltip: '' });
    this.columns.push({ name: 'FamilyDescription', label: 'Fam. Description' })
  }

}
