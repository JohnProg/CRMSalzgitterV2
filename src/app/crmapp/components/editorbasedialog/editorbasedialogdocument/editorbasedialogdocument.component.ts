import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';

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

import {  BaseDocument } from '../../../model/index';
import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'crm-editorbasedialogdocument',
  templateUrl: './editorbasedialogdocument.component.html',
  styleUrls: ['./editorbasedialogdocument.component.scss']
})
export class EditorbasedialogdocumentComponent extends BaseComponent {

  @Input() idDialog: number = 0;
  @Input() baseApi: string;
  @Input() parentField: string;

  
  
  itemEdit: BaseDocument;
  
  files: any;
 constructor(
    public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone, 
    public _http: Http, 
    public _tableService: TdDataTableService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public apollo: Apollo) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, route, apollo);
 
    this.setTitle = false;
    this.catalogName = 'Dialog Document';
  }

  ngOnInitClass() {
    this._curService.setAPI(this.baseApi, this.catalogName);
    this.entList = <Observable<BaseDocument[]>>this._curService.entList;
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
    pparams.set('idparent', '0');
    this._curService.loadCustomAll( this.baseApi + '/searchBy', pparams);
  }

  addColumns() {
    this.columns.push({ name: 'docTypeName', label: 'Doc. Type', tooltip: '' });
    this.columns.push({ name: 'dateUploaded', label: 'Date', numeric: false,  sortable: false });
    this.columns.push({ name: 'docName', label: 'Doc. Name' });
    this.columns.push({ name: 'dNotes', label: 'Notes' });
  }

  initEntity() {
    this.itemEdit = new BaseDocument() ;
    this.itemEdit[this.parentField]  = this.idDialog;
  }



  confirmDelete(item: BaseDocument) {
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
        tself.itemEdit.docName = tself.files.name;
        tself.itemEdit.aData64 = t;
        tself._curService.create(tself.itemEdit);
      };
      reader.readAsDataURL(this.files);


    }

  }


  afterCreate(item: BaseDocument) {
    Object.assign(this.itemEdit, item);
    this.isEditing = false;
  }

  afterUpdate(item: BaseDocument) {
    Object.assign(this.itemEdit, item);
    this.isEditing = false;
  }

}
