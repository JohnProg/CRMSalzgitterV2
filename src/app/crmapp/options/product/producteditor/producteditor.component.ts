import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';

import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { TCRMEntity, GetProductProperty, ProductProperty } from '../../../model/allmodels';
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
import { ProductpropertyComponent } from '../productproperty/productproperty.component';

@Component({
  selector: 'crm-producteditor',
  templateUrl: './producteditor.component.html',
  styleUrls: ['./producteditor.component.scss'],
  providers: [CatalogService, ConfigurationService],
})
export class ProducteditorComponent extends BaseComponent {


@ViewChild(ProductpropertyComponent) _props: ProductpropertyComponent;


  constructor(public _router: Router, public _route: ActivatedRoute, public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone) {
    super(_curService, _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone);
    this.catalogName = 'Product';
    this._curService.setAPI('Product/', this.catalogName);



  }


  ngOnInitClass() {
    this.entList = <Observable<TCRMEntity[]>>this._curService.entList;

    this._route.params.subscribe((params: { id: number }) => {
      let itemId: number = params.id;
      if (itemId > 0) {
        this.editEntity(itemId);
      } else {
        this.addEntity();
      }

    });

  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this._actions.showAdd(false);
    this._actions.showSearch(false);
    this._actions.showSave(true);

  }

  afterSave(item: TCRMEntity) {
    
  }

  expandProperties() {

    this._props.loadProperties();

  }

}
