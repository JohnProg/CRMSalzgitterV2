import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService, TdLayoutManageListComponent 
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../components/abstractvalueaccessor';
import { CatalogComponent } from '../../catalogs/catalog.component';


@Component({
  selector: 'crm-opportunityeditor',
  templateUrl: './opportunityeditor.component.html',
  styleUrls: ['./opportunityeditor.component.scss'],
  providers: [],
})
export class OpportunityeditorComponent extends CatalogComponent {

  idOpp: number = 0;
  scrId: number = 1;

  constructor(
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _mediaService: TdMediaService,
    public _actions: ActionsService,
    public _ngZone: NgZone,
    public _router: Router, public _route: ActivatedRoute) {
    super(_loadingService, _dialogService, _snackBarService, _mediaService, _actions);
  }


  afterInit() {
    this._route.params.subscribe((params: { id: number }) => {
      this.idOpp = params.id;
    });
  }


  linkClick(scr: number ) : boolean {
    this.scrId = scr;
    return true;
  }

  saveEntity() {

  }

  addEntity() {

  }

}
