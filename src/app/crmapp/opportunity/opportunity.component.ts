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
  selector: 'crm-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.scss']
})
export class OpportunityComponent   {




}
