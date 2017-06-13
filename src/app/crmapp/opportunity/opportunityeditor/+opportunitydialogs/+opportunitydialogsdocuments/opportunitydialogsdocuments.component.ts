import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';
import {  Opportunity, TCRMEntity, OpportunityDocument } from '../../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../../components/abstractvalueaccessor';

import {  OpportunityService } from '../../../../services/oppservice.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'crm-opportunitydialogsdocuments',
  templateUrl: './opportunitydialogsdocuments.component.html',
  styleUrls: ['./opportunitydialogsdocuments.component.scss']
})
export class OpportunityDialogsDocumentsComponent extends BaseComponent {

  @Input() idDialog: number = 0;
  itemEdit: OpportunityDocument;
  currentOpp: Opportunity;
  files: any;
 constructor(public _router: Router, public _route: ActivatedRoute, 
    public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone, 
    public _http: Http, 
    public _tableService: TdDataTableService,
    public _oppservice: OpportunityService, public translate: TranslateService ) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate);
    this.setTitle = false;
    this.currentOpp = this._oppservice.currentOpp;
    this.catalogName = 'Dialog Document';
    this._curService.setAPI('OpportunityDocument', this.catalogName);
    this.itemEdit = new OpportunityDocument();
    this.setTitle = false;
  }

  ngOnInitClass() {
    this.entList = <Observable<OpportunityDocument[]>>this._curService.entList;
    this.initData();
  }

  initData() {
    this.refreshItems();

    this.initEntity();
  }

  afterViewInit(): void {
    this._actions.setEdit();
  }

  refreshItems() {
    let pparams: URLSearchParams = new URLSearchParams();
    pparams.set('iddialog', this.idDialog.toString());
    pparams.set('idopp', '0');
    this._curService.loadCustomAll('OpportunityDocument/searchByOpp', pparams);
  }

  addColumns() {
    this.columns.push({ name: 'DocTypeName', label: 'Doc. Type', tooltip: '' });
    this.columns.push({ name: 'DateUploaded', label: 'Date', numeric: false,  sortable: false });
    this.columns.push({ name: 'DocName', label: 'Doc. Name' });
    this.columns.push({ name: 'DNotes', label: 'Notes' });

  }

  initEntity() {
    this.itemEdit = new OpportunityDocument() ;
    this.itemEdit.IdOpportunityDialog  = this.idDialog;
  }


  confirmDelete(item: OpportunityDocument) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit(  { title: 'Document', objId: this.objId });
  }

  submitForm(form) {

    if (this.files ) {


      let reader: FileReader = new FileReader();
      let t: string;
      let tself = this;
      reader.onloadend = function () {
        t = reader.result;
        tself.itemEdit.DocName = tself.files.name;
        tself.itemEdit.AData64 = t;
        
        tself._curService.create(tself.itemEdit);
      };
      reader.readAsDataURL(this.files);

    }

  }


  afterCreate(item: any) {
    
    Object.assign(this.itemEdit, item);
    this.isEditing = false;
  }

  afterUpdate(item: any) {
    Object.assign(this.itemEdit, item);
    this.isEditing = false;
  }

}
