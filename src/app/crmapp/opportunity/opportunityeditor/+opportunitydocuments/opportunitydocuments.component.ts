import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import {TranslateService} from '@ngx-translate/core';

import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import {  OpportunityDocument  } from '../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';

@Component({
  selector: 'crm-opportunitydocuments',
  templateUrl: './opportunitydocuments.component.html',
  styleUrls: ['./opportunitydocuments.component.scss'],
  providers: [],  
})
export class OpportunitydocumentsComponent extends BaseComponent {

 @Input() idOpp: number = 0;
 sortBy: string = 'DocTypeName';
 itemEdit: OpportunityDocument;

  constructor(public _router: Router, public _route: ActivatedRoute, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone,
    public _http: Http, 
    public _tableService: TdDataTableService,
    public translate: TranslateService) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate);    this.catalogName = 'Opportunity Document';
    this._curService.setAPI('OpportunityDocument/', this.catalogName);
  }

 ngOnInitClass() {
    this.entList = <Observable<OpportunityDocument[]>>this._curService.entList;

    //this._route.params.subscribe((params: { id: number }) => {
      
      //this.idOpp = params.id;
      this.initData();
      // if ( this.idOpp > 0) {
      //   this.editEntity( this.idOpp);
      // } else {
      //   this.addEntity();
      // }

    //});

  }

 initData() {
    let pparams = new URLSearchParams();
    pparams.set('idopp', this.idOpp.toString());
    pparams.set('iddialog', '0');
    this._curService.loadCustomAll('OpportunityDocument/searchByOpp', pparams);

    this.initEntity();

  }

  addColumns() {
     this.columns.push({ name: 'DocTypeName', label: 'Doc. Type' });
     this.columns.push({ name: 'DateUploaded', label: 'Date Uploaded', tooltip: '' });
     this.columns.push({ name: 'DocName', label: 'Document Name' });
  }


  initEntity() {
    this.itemEdit = new  OpportunityDocument();
  }

}
