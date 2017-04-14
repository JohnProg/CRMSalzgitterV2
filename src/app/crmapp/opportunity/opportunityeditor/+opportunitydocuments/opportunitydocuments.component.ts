import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';

import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import {  OpportunityDocument  } from '../../../model/allmodels';
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
  selector: 'crm-opportunitydocuments',
  templateUrl: './opportunitydocuments.component.html',
  styleUrls: ['./opportunitydocuments.component.scss'],
  providers: [CatalogService, ConfigurationService, ActionsService],  
})
export class OpportunitydocumentsComponent extends BaseComponent {

 idOpp: number = 0;



  constructor(public _router: Router, public _route: ActivatedRoute, public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone) {
    super(_curService, _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone);
    this.catalogName = 'Opportunity';
    this._curService.setAPI('Opportunity/', this.catalogName);
  }

 ngOnInitClass() {
    this.entList = <Observable<Opportunity[]>>this._curService.entList;

    this._route.params.subscribe((params: { id: number }) => {
      
      this.idOpp = params.id;
      this.itemEdit = new OppotunityDocument();
      // if ( this.idOpp > 0) {
      //   this.editEntity( this.idOpp);
      // } else {
      //   this.addEntity();
      // }

    });

  }

}
