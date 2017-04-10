import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import { Title }  from '@angular/platform-browser';
import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ActionsService } from '../../services/actions.services';
import { ConfigurationService } from '../../services/configuration.service';

import { Product } from '../../model/allmodels';
import { BaseComponent } from '../../catalogs/base.component';
import { TCRMEntity, GeGetOpportunities } from '../../model/allmodels';


@Component({
  selector: 'crm-opportunityindex',
  templateUrl: './opportunityindex.component.html',
  styleUrls: ['./opportunityindex.component.scss'],
  providers: [CatalogService,  ActionsService, ConfigurationService]
})
export class OpportunityindexComponent extends BaseComponent  {


  constructor( public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone,
    private _router: Router) {
    super(_curService, _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone);
    this.sortBy = 'Id';
    this.catalogName = 'Opportunity';
    this._curService.setAPI('Opportunity/', this.catalogName);

  }





  ngOnInitClass() {
    this.entList = <Observable<GeGetOpportunities[]>>this._curService.entList;
    this.initData();
    //this.reloadPaged();
  }

  reloadPaged(sText: string = undefined) {
    this._curService.getPaged(this.getPageParams(sText));
  }


  editEntity(id: number) {

    this._router.navigate(['opportunity/edit/' + id]);
  }


  addColumns() {

    //super.addColumns();
    this.columns.push({ name: 'Id', label: 'Opportunity', tooltip: '' });
    this.columns.push({ name: 'CustomerName', label: 'Customer Name' });
    this.columns.push({ name: 'AsImporter', label: 'As Importer' });
    this.columns.push({ name: 'ResponsibleName', label: 'Responsible' });
    this.columns.push({ name: 'StatusName', label: 'Status' });
    this.columns.push({ name: 'LastUpdated', label: 'Last Update' });

  }

}
