import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { CatalogService } from '../../../services/catalog.service';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';

import { ConfigurationService } from '../../../services/configuration.service';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';

import { Product } from '../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../catalogs/base.component';
import { TCRMEntity } from '../../../model/allmodels';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productindex',
  templateUrl: './productindex.component.html',
  styleUrls: ['./productindex.component.scss'],
  providers: [CatalogService, ConfigurationService ]
})
export class ProductindexComponent extends BaseComponent  {

  constructor( public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone,
    private _router: Router) {
    super(_curService, _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone);
    this.catalogName = 'Product';
    this._curService.setAPI('Product/', this.catalogName);
  }

  ngOnInitClass() {
    this.entList = <Observable<TCRMEntity[]>>this._curService.entList;
    
    this.initData();
    this.reloadPaged();
  }

  editEntity(id: number) {
    
    this._router.navigate(['options/products/edit/' + id]);
  }


}
