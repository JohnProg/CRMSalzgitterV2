import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent,  } from '../../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';


import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  Customer, Colony } from '../../../../model/allmodels';
import { SelectcolonyComponent } from '../../../../components/index';
export const custQl = gql`
  query {
    responsibles { id name isActive  }
  }
`;


@Component({
  selector: 'crm-customereditorheader',
  templateUrl: './customereditorheader.component.html',
  styleUrls: ['./customereditorheader.component.scss']
})
export class CustomereditorheaderComponent extends BaseComponent {

   @Input() idCustomer: number;
   @ViewChild(SelectcolonyComponent) _colony: SelectcolonyComponent;
   itemEdit: Customer;
   colony: Colony;
  constructor(public _router: Router,  
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
 
 
    this.catalogName = 'Customer';
    this._curService.setAPI('Customer/', this.catalogName);
    this.singleEditor = true;
    this.autoLoad = false;
  }


  ngOnInitClass() {
    this.entList = <Observable<Customer[]>>this._curService.entList;
    this.initEntity();


  }

  afterViewInit(): void {


      if (this.idCustomer > 0) {
        this.editEntity(this.idCustomer);
      } else {
        
        this.addEntity();
      }


    // this._actions.showAdd(false);
    // this._actions.showSearch(false);
    // this._actions.showSave(true);
    // this._actions.showCancel(true);
  }

  initEntity() {
    this.itemEdit = new  Customer();
  }


  cancelEdit(): void {
    this._router.navigate([ '../../'], { relativeTo: this.route });
  }


  afterLoadItem(itm:  Customer) {
    super.afterLoadItem(itm);
    
    this._colony.setZipCode(itm.colony.zipCode);
  }


  loadCatalogs() {

        this._curService.loadQl(custQl, undefined)
        .subscribe(({data}) => {
          this.catResponsible = data['responsibles'];
        }, (error: Error) => {
          this._loadingService.resolve('');
          
          this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
        }
        );   
  }



}