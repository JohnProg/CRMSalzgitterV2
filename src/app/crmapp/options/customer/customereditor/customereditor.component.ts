import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';

import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService, TdLayoutManageListComponent 
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {TranslateService} from '@ngx-translate/core';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';
import { CatalogComponent } from '../../../catalogs/catalog.component';

import {   Customer } from '../../../model/index';
import { EnumDocType } from '../../../constants/index';
import { CustomereditorheaderComponent } from './customereditorheader/customereditorheader.component';



@Component({
  selector: 'crm-customereditor',
  templateUrl: './customereditor.component.html',
  styleUrls: ['./customereditor.component.scss']
})
export class CustomereditorComponent extends CatalogComponent  {

  
  idCustomer: number;
  scrId: number = 1;
  @ViewChild(CustomereditorheaderComponent) headercomp: CustomereditorheaderComponent;

  customer: Customer;


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

    this._route.params.subscribe((params: { id: number }) => {
       this.idCustomer = params.id;
      });
  }


  doOnItemCreated(itm: Customer) {
    this.idCustomer = itm.id;
    this.customer = itm;
  }

  linkClick(scr: number ) : boolean {
    this.scrId = scr;
    return true;
  }


  onItemLoaded(itm: Customer) {
    
    this.customer = itm;
  }

}
