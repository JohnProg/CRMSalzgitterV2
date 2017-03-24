import { Component, AfterViewInit, ViewChild, ContentChild } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { CatalogComponent } from '../catalogs/catalog.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService, TdSearchBoxComponent } from '@covalent/core';
import { MdSnackBar } from '@angular/material';


import { ActionsService } from '../services/actions.services';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  providers: [ ActionsService ],
})
export class OptionsComponent extends CatalogComponent implements AfterViewInit  {

  catalogTitle: string;
  deleteDescription: string;
  showSearch: boolean = true;
  showAdd: boolean = true;
  showCancel: boolean = true;
  showSave: boolean = true;
  showSideNav: boolean = true;
  
  @ViewChild(TdSearchBoxComponent) searchBox: TdSearchBoxComponent;



  constructor(
              public _loadingService: TdLoadingService,
              public _dialogService: TdDialogService,
              public _snackBarService: MdSnackBar,
              public media: TdMediaService,  
              public _actions: ActionsService) { 
              
              super(_loadingService, _dialogService, _snackBarService, media, _actions);

              }


  ngAfterViewInit(): void {
  }



}
