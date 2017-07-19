
import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../base.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import { State } from '../../model/allmodels';
import {TranslateService} from '@ngx-translate/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
  providers: [ ],
})
export class StateComponent extends BaseComponent {


   idCountry: number = 0;
   enableAdd: boolean = false;
   itemEdit: State;
 
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
 
    this.autoLoad = false;
    this.catalogName = 'State';
    this._curService.setAPI('State/', this.catalogName);
  }


  ngOnInit() {


    this.initData();
    this.entList = <Observable<State[]>> this._curService.entList;
  }

    editEntity( id: number ) {
      this.itemEdit = <State>this._curService.itemEdit;
      this._curService.load(id);
    }

    addEntity() {
      this.itemEdit = new State();
      this.itemEdit.id = 0;
      (<State>this.itemEdit).idCountry = this.idCountry;
    }

    onCountrySelected(event: any) {
      this.idCountry = event;
      if( event > 0 ) {
        this.idCountry = event;
        this.reloadPaged();
      }
      this.enableAdd = this.idCountry > 0;
    
    }

      reloadPaged(sText: string = undefined) {
        let p = { page: this.currentPage, pageSize: this.pageSize, sortBy : this.sortBy, sortType: this.sortType, 
                  sText: undefined, maxPage: 0, total: 0, fromRow: 0, toRow: 0 } as IPChangeEventSorted;

        this._curService.getCustomPaged(p, 'GetPaged', [
          { name: 'idCountry', description: this.idCountry.toString() }
        ] as State[] );
      }

}
