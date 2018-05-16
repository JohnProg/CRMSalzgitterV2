import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

import { Observable ,  Observer ,  BehaviorSubject } from 'rxjs';
import { BaseComponent } from '../../catalogs/base.component';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';


import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


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
  parentRoute = 'opportunity';

  doConstruct() {
    super.doConstruct();
    this.quoteType = EnumDocType.Opportunity;
    this._route.params.subscribe((params: any) => {
      this.idOpp = params.id;
      //if( params['parentRoute'] != undefined) this.parentRoute = params.parentRoute;
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

  updateTotal(data) {
    this.opp.subtotal = data.subtotal;
    this.opp.taxAmount = data.subtotal * this.opp.tax;
    this.opp.total = this.opp.subtotal + this.opp.taxAmount;
  }
}
