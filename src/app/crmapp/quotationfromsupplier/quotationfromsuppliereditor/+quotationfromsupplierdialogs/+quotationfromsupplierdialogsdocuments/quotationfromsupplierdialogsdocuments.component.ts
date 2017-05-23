import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';
import {   TCRMEntity, QuotationFromSupplierDocument } from '../../../../model/allmodels';
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


import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'crm-quotationfromsupplierdialogsdocuments',
  templateUrl: './quotationfromsupplierdialogsdocuments.component.html',
  styleUrls: ['./quotationfromsupplierdialogsdocuments.component.scss']
})
export class QuotationfromsupplierdialogsdocumentsComponent extends BaseComponent {

  @Input() idDialog: number = 0;
  itemEdit: QuotationFromSupplierDocument;
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
    public translate: TranslateService ) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate);
    this.setTitle = false;
    this.catalogName = 'Dialog Document';
    this._curService.setAPI('QuotationFromSupplierDocument', this.catalogName);
    this.itemEdit = new QuotationFromSupplierDocument();
    this.setTitle = false;
  }

  ngOnInitClass() {
    this.entList = <Observable<QuotationFromSupplierDocument[]>>this._curService.entList;
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
    pparams.set('idquote', '0');
    this._curService.loadCustomAll('QuotationFromSupplierDocument/searchByQuote', pparams);
  }

  addColumns() {
    this.columns.push({ name: 'DocTypeName', label: 'Doc. Type', tooltip: '' });
    this.columns.push({ name: 'DateUploaded', label: 'Date', numeric: false,  sortable: false });
    this.columns.push({ name: 'DocName', label: 'Doc. Name' });
    this.columns.push({ name: 'DNotes', label: 'Notes' });

  }

  initEntity() {
    this.itemEdit = new QuotationFromSupplierDocument() ;
    this.itemEdit.IdQuotationFromSupplierDialog  = this.idDialog;
  }


  confirmDelete(item: QuotationFromSupplierDocument) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit(' Document');
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
        debugger
        tself._curService.create(tself.itemEdit);
      };
      reader.readAsDataURL(this.files);

    }

  }


  afterCreate(item: any) {
    
    Object.assign(this.itemEdit, item.item);
    this.isEditing = false;
  }

  afterUpdate(item: any) {
    
    Object.assign(this.itemEdit, item.item);
    this.isEditing = false;
  }

}
