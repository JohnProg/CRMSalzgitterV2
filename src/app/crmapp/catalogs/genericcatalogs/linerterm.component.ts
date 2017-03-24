import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';

import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import { TCRMEntity } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../base.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'crm-linerterm',
  templateUrl: '../base.component.html',
  styleUrls: ['../base.component.scss'],
  providers: [CatalogService, ConfigurationService ],
})
export class LinerTermComponent extends BaseComponent {


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
    this.catalogName = 'Liner Term';
    this._curService.setAPI('LinerTerm/', this.catalogName);
    this.initData();
      this.entList = <Observable<TCRMEntity[]>> this._curService.entList;
   
  }

}
