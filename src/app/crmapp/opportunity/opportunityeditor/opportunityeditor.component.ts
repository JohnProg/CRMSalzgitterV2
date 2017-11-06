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

import { MatSnackBar } from '@angular/material';
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

  opp: Opportunity;
  @ViewChild(OpportunityheaderComponent) headercomp: OpportunityheaderComponent;

  itemRoute: string = 'opportunity';
  
  constructor(
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MatSnackBar,
    public _mediaService: TdMediaService,
    public _actions: ActionsService,
    public _ngZone: NgZone,
    public _router: Router, public _route: ActivatedRoute,
    translate: TranslateService) {
    super(_loadingService, _dialogService, _snackBarService, _mediaService, _actions, _router, _route);
    this.quoteType = EnumDocType.Opportunity;
    this._route.params.subscribe((params: any) => {
      this.idOpp = params.id;
      if( params['parentRoute'] != undefined) this.parentRoute = params.parentRoute;
      if( params['scrId'] != undefined)  this.parentScr = params.scrId;
    });
  }

  doOnItemCreated(itm: Opportunity) {
    this.opp = itm;
    this.idOpp = itm.id;
    this.idCustomer = itm.idCustomer;
  }

  linkClick(scr: number ) : boolean {
    this.scrId = scr;
    return true;
  }


  onItemLoaded(itm: Opportunity) {
    
    this.opp = itm;
    this.idOpp = itm.id;
    this.idCustomer = itm.idCustomer;
    super.onItemLoaded(itm);
  }
}
