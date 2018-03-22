import { Component, AfterViewInit, ViewChild, ContentChild } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { CatalogComponent } from '../../catalogs/catalog.component';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn,
   } from '@covalent/core/data-table';

import { TdSearchBoxComponent } from '@covalent/core/search';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';
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
