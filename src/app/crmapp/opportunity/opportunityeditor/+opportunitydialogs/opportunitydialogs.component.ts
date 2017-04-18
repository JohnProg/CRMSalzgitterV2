import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';


import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import {  OpportunityDialog  } from '../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';


@Component({
  selector: 'crm-opportunitydialogs',
  templateUrl: './opportunitydialogs.component.html',
  styleUrls: ['./opportunitydialogs.component.scss'],
  providers: [CatalogService, ConfigurationService, ActionsService],    
})
export class OpportunitydialogsComponent extends BaseComponent {


 idOpp: number = 0;
 sortBy: string = 'ActionName';
itemEdit: OpportunityDialog;

  constructor(public _router: Router, public _route: ActivatedRoute, public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone) {
    super(_curService, _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone);
    this.catalogName = 'Opp Dialogs';
  }

 ngOnInitClass() {
    this.entList = <Observable<OpportunityDialog[]>>this._curService.entList;

    this._route.params.subscribe((params: { id: number }) => {
      
      this.idOpp = params.id;
      this.initData();
      // if ( this.idOpp > 0) {
      //   this.editEntity( this.idOpp);
      // } else {
      //   this.addEntity();
      // }

    });

  }
 initData() {
    let pparams = new URLSearchParams();
    pparams.set('idopp', this.idOpp.toString());
    
   this._curService.loadCustomAll('OpportunityDialog/searchByOpp', pparams);

    this.initEntity();
    this.isEditing$ = this._curService.isEditing$.subscribe(status => {
      this.isEditing = status;
      this.reloadPaged('');
    });
  }

  addColumns() {


     this.columns.push({ name: 'ActionName', label: 'Action' });    
     this.columns.push({ name: 'Contact', label: 'Contact', tooltip: '' });
     this.columns.push({ name: 'ResponsibleName', label: 'Responsible' });        
    

  }


  initEntity() {
    this.itemEdit = new  OpportunityDialog();
  }
}
