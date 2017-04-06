
import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';


import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';


import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import { BaseComponent } from '../base.component';
import { IncoTerm } from '../../model/allmodels';

@Component({
  selector: 'crm-incoterm',
  templateUrl: './incoterm.component.html',
  styleUrls: ['./incoterm.component.scss'],
    providers: [CatalogService, ConfigurationService ],
})
export class IncotermComponent extends BaseComponent {

  constructor( public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone) {
    super(_curService, _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone);

    this.catalogName = 'IncoTerm';
    this._curService.setAPI('IncoTerm/', this.catalogName);
  }



  ngOnInit() {

    this.initData();
    this.entList = <Observable<IncoTerm[]>> this._curService.entList;
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
      this.itemEdit.Id = 0;
      this._curService.changeState(true);
    }
}
