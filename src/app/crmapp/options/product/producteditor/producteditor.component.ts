import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';

import { CatalogService } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { TCRMEntity } from '../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../../catalogs/base.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producteditor',
  templateUrl: './producteditor.component.html',
  styleUrls: ['./producteditor.component.scss'],
  providers: [CatalogService, ConfigurationService ],
})
export class ProducteditorComponent extends BaseComponent{


  families : TCRMEntity[] = new Array<TCRMEntity>();

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

    this.entList = <Observable<TCRMEntity[]>> this._curService.entList;

    this._curService.loadCatalog('Family', this.families, null);

    this._route.params.subscribe((params: {id: number}) => {
      let itemId: number = params.id;
      if( itemId > 0) {
         this.editEntity(itemId);
      } else {
        this.addEntity();
      }
        
    });
  

   
    //this.initData();

  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
     this._actions.showAdd(false);
     this._actions.showSearch(false);
     this._actions.showSave(true);

  }  

  afterSave(item: TCRMEntity) {
    debugger
  }

}
