import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';


import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import {  QuotationFromSupplierDialog, QuotationFromSupplier  } from '../../../model/allmodels';
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
import { Subscription } from 'rxjs/Subscription';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'crm-quotationfromsupplierdialogs',
  templateUrl: './quotationfromsupplierdialogs.component.html',
  styleUrls: ['./quotationfromsupplierdialogs.component.scss']
})
export class QuotationfromsupplierdialogsComponent extends BaseComponent {



 @Input() idQuotation: number = 0;
 sortBy: string = 'ActionName';
 itemEdit: QuotationFromSupplierDialog;
 showEMail: boolean = false;
  constructor(public _router: Router, public _route: ActivatedRoute, public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone,
    public _http: Http, 
    public _tableService: TdDataTableService,
    public translate: TranslateService  ) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate);
    this.catalogName = 'Quotation from Supplier Dialogs';
    this._curService.setAPI('QuotationFromSupplierDialog', this.catalogName);
    this.autoLoad = false;
  }

 ngOnInitClass() {

    this.entList = <Observable<QuotationFromSupplierDialog[]>>this._curService.entList;
    this.initData();
  }

 initData() {
    super.initData();
    this.loadData();
  }




  loadData() {
    if ( this.isLoading === false ) {
      if ( this.dataLoaded === true ) {
        this.reloadPaged();
      } else {
        let pparams = new URLSearchParams();
        pparams.set('idquote', this.idQuotation.toString());
        this._curService.loadCustomAll('QuotationFromSupplierDialog/searchByQuote', pparams, this.pageSize);
        this.dataLoaded = true;
      }
    }
  }

  afterViewInit(): void {
    this._actions.updateTitle('Dialogs for Quotation from supplier ' + this.idQuotation.toString());
    
  }

  addColumns() {
     this.columns.push({ name: 'ActionName', label: 'Action' });
     this.columns.push({ name: 'Contact', label: 'Contact', tooltip: '' });
     this.columns.push({ name: 'ResponsibleName', label: 'Responsible' });
  }

  initEntity() {
    this.itemEdit = new  QuotationFromSupplierDialog();
    this.itemEdit.IdQuotationFromSupplier = this.idQuotation;
    this.itemEdit.EmailSended = false;
  }

  confirmDelete(item: any) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit(item.ActionName + ' to contact ' + ( item.ContactName || item.CustContactName));
  }

  afterLoadItem(itm: QuotationFromSupplierDialog) {
    super.afterLoadItem(itm);
    setTimeout(() => {
    this._actions.showEmail(true);
    }, 1000);
  }
 
 cancelEdit() {
   super.cancelEdit();
   setTimeout(() => {
    this._actions.showEmail(false);
    }, 1000);

 }

  afterCreate(item: any) {
    this.itemEdit.Id = item.Id;
    this.itemEdit.DateDialog = item.DateDialog;
    setTimeout(() => {
    this._actions.showEmail(true);
    }, 1000);
  }

  afterUpdate(item: any) {
    
  }
 
  sendEmail() {
    this.showEMail = true;
    this._router.navigate([ '../../sendemail', this.itemEdit.Id], { relativeTo: this._route });
  }
}
