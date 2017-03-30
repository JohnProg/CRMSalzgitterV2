import { Component, AfterViewInit, ViewChild, ContentChild } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { CatalogComponent } from '../catalogs/catalog.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService, TdSearchBoxComponent } from '@covalent/core';
import { MdSnackBar } from '@angular/material';

import { MenuClass } from '../model/menuclass';


import { ActionsService } from '../services/actions.services';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  providers: [ ActionsService ],
})
export class OptionsComponent extends CatalogComponent  {

  catalogTitle: string;
  deleteDescription: string;
  showSearch: boolean = true;
  showAdd: boolean = true;
  showCancel: boolean = true;
  showSave: boolean = false;
  showSideNav: boolean = true;
  
  @ViewChild(TdSearchBoxComponent) searchBox: TdSearchBoxComponent;


  catalogs : MenuClass[] =  [
    
  ];

  constructor(
              public _loadingService: TdLoadingService,
              public _dialogService: TdDialogService,
              public _snackBarService: MdSnackBar,
              public media: TdMediaService,  
              public _actions: ActionsService,
              private _router: Router, ) { 
              
              super(_loadingService, _dialogService, _snackBarService, media, _actions);

              }



  addItem() {
    
   this._router.navigate(['/options/products/edit/0']);
  }


}
