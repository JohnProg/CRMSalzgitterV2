import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';

import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

import { ActionOpportunity } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../base.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';




@Component({
  selector: 'crm-actionopp',
  templateUrl: './actionopp.component.html',
  styleUrls: ['./actionopp.component.scss'],
  providers: [ ]
})
export class ActionoppComponent extends BaseComponent {



  pTitle: string;
  constructor( public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone) {
    super(_curService, _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone);

     this.catalogName = 'Opp Action';
     this._curService.setAPI('ActionOpportunity/', this.catalogName);
  }

  ngOnInit() {
    this.pTitle = '';
    this.initData();
    this.entList = <Observable<ActionOpportunity[]>> this._curService.entList;
  }

  addColumns() {

    this.columns.push({ name: 'Name', label: 'Name' });
    this.columns.push({ name: 'EmailToText', label: 'EMail to' });
    this.columns.push({ name: 'EstatusName', label: 'Status' });
    this.columns.push({ name: 'BidStatusDescription', label: 'Bid Status' });
    this.columns.push({ name: 'TemplateName', label: 'Template EMail' });


  }
    editEntity( id: number ) {
      this.itemEdit = <ActionOpportunity>this._curService.itemEdit;
      this._curService.load(id);
    }

    addEntity() {
      this.itemEdit = new ActionOpportunity();
      this.itemEdit.Id = 0;
      this._curService.changeState(true);
    }


}
