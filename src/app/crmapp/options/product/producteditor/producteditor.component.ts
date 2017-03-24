import { Component, OnInit, AfterViewInit,  } from '@angular/core';
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


@Component({
  selector: 'app-producteditor',
  templateUrl: './producteditor.component.html',
  styleUrls: ['./producteditor.component.scss']
})
export class ProducteditorComponent extends BaseComponent{

  constructor(public _curService: CatalogService, public _confs: ConfigurationService, 
              public _loadingService: TdLoadingService,
              public _dialogService: TdDialogService,
              public _snackBarService: MdSnackBar,
              public media: TdMediaService,  
              public _actions: ActionsService) {
     super(_curService, _confs, _loadingService, _dialogService, _snackBarService, _actions);
    this.catalogName = 'Colony Type';
    this._curService.setAPI('ColonyType/', this.catalogName);
  }


  ngOnInit() {

    this.initData();
    this.entList = <Observable<TCRMEntity[]>> this._curService.entList;
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    
  }  

}
