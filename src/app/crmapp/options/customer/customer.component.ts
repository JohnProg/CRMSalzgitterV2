import { Component, AfterViewInit, ViewChild, ContentChild } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { CatalogComponent } from '../../catalogs/catalog.component';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService, TdSearchBoxComponent } from '@covalent/core';


import { MenuClass } from '../../model/menuclass';


import { ActionsService } from '../../services/actions.services';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'crm-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {

  constructor() { }

}
