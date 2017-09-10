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
import {TranslateService} from '@ngx-translate/core';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../components/abstractvalueaccessor';
import { CatalogComponent } from '../../catalogs/catalog.component';
import { Opportunity } from '../../model/index';
import { OpportunityheaderComponent } from './+opportunityheader/opportunityheader.component';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { EnumDocType } from '../../constants/index';

@Component({
  selector: 'crm-opportunityeditor',
  templateUrl: './opportunityeditor.component.html',
  styleUrls: ['./opportunityeditor.component.scss'],
  providers: [],
})
export class OpportunityeditorComponent extends CatalogComponent {

  idOpp: number = 0;
  opp: Opportunity;
  @ViewChild(OpportunityheaderComponent) headercomp: OpportunityheaderComponent;

  constructor(
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _mediaService: TdMediaService,
    public _actions: ActionsService,
    public _ngZone: NgZone,
    public _router: Router, public _route: ActivatedRoute,
    translate: TranslateService) {
    super(_loadingService, _dialogService, _snackBarService, _mediaService, _actions);
    this.quoteType = EnumDocType.Opportunity;
    this._route.params.subscribe((params: { id: number }) => {
      this.idOpp = params.id;
    });
  }

  doOnItemCreated(itm: Opportunity) {
    this.opp = itm;
    this.idOpp = itm.id;
  }

  linkClick(scr: number ) : boolean {
    this.scrId = scr;
    return true;
  }


  onItemLoaded(itm: Opportunity) {
    this.opp = itm;
    this.idCustomer = this.opp.idCustomer;
  }
}
