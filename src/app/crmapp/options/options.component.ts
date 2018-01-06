import { Component, AfterViewInit, ViewChild, ContentChild } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { CatalogComponent } from '../catalogs/catalog.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService, TdSearchBoxComponent } from '@covalent/core';
import { MatSnackBar } from '@angular/material';

import { MenuClass } from '../model/menuclass';


import { ActionsService } from '../services/actions.services';
import { Router, ActivatedRoute } from '@angular/router';




@Component({
  selector: 'crm-options',
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





  addItem() {
    
   this._router.navigate(['/options/products/edit/0']);
  }


}
