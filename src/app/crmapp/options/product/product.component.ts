import { Component, AfterViewInit, ViewChild, ContentChild } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { CatalogComponent } from '../../catalogs/catalog.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService, TdSearchBoxComponent } from '@covalent/core';
import { MdSnackBar } from '@angular/material';

import { MenuClass } from '../../model/menuclass';


import { ActionsService } from '../../services/actions.services';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'crm-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent    {


  constructor(
              public _loadingService: TdLoadingService,
              public _dialogService: TdDialogService,
              public _snackBarService: MdSnackBar,
              public media: TdMediaService,  
              public _actions: ActionsService,
               ) { 
              
              //super(_loadingService, _dialogService, _snackBarService, media, _actions);

              }

  ngOnInitClass() {

  }




  
}
