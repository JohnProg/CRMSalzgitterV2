import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../catalogs/base.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import {  Company } from '../../model/allmodels';
import { CRMSelectComponent } from '../../components/crmselect/crmselect.component';
import {TranslateService} from '@ngx-translate/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
   providers: [ ],
})
export class CompanyComponent extends BaseComponent {


  itemEdit: Company = new Company();
  zipCode: string = "";
  @ViewChild('colony') colony: CRMSelectComponent;

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
 
    this.catalogName = 'Company';
    this._curService.setAPI('Company/', this.catalogName);
  }


  ngOnInit() {
    this.autoLoad = false;

    this.initData();
    this.entList = <Observable<Company[]>> this._curService.entList;
    this.editEntity(1);
  }

  initEntity() {
    this.itemEdit = new  Company();
  }

    editEntity( id: number ) {
      this.itemEdit = <Company>this._curService.itemEdit;
      this._curService.load(id);
    }

  afterLoadItem(item : Company) {
      this.zipCode = (<Company>item).zipCode;
      //this.colony.reloadFromZipCode(this.zipCode);
      this._actions.showAdd(false);
      this._actions.showSearch(false);
  }

  zipChange(event) {
     //this.colony.reloadFromZipCode(event);
  }

}
