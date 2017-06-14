import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../components/abstractvalueaccessor';
import { TranslateService } from '@ngx-translate/core';
import { BaseOrderDialog  } from '../../model/allmodels';


@Component({
  selector: 'crm-editorbasedialog',
  templateUrl: './editorbasedialog.component.html',
  styleUrls: ['./editorbasedialog.component.scss']
})
export class EditorbasedialogComponent extends BaseComponent {



    @Input() idParent: number = 0;
    @Input() baseApi: string;
    @Input() parentField: string;

    @Input() documentBaseApi: string;
    @Input() documentParentField: string;


    sortBy: string = 'ActionName';
    itemEdit: BaseOrderDialog;
    showEMail: boolean = false;
    searchByUrl: string;
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
    public _router: Router) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, route);
    this.autoLoad = false;
  }

 ngOnInitClass() {
    this._curService.setAPI(this.baseApi, this.catalogName);
    this.entList = <Observable<BaseOrderDialog[]>>this._curService.entList;
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
        this.loadByUrl();
      }
    }
  }

  loadByUrl() {
        let pparams = new URLSearchParams();
        pparams.set('iddialog', '0');
        pparams.set('idparent', this.idParent.toString());
        this._curService.loadCustomAll(this.baseApi + '/searchBy', pparams, this.pageSize);
        this.dataLoaded = true;
  }

  initEntity() {
    this.itemEdit = new  BaseOrderDialog();
    this.itemEdit[this.parentField] = this.idParent;
    this.itemEdit.EmailSended = false;
  }

  afterViewInit(): void {
    this._actions.updateTitle('Dialogs for ' + this.catalogName + ' ' + this.idParent.toString());
  }

  addColumns() {
     this.columns.push({ name: 'ActionName', label: 'Action' });
     this.columns.push({ name: 'Contact', label: 'Contact', tooltip: '' });
     this.columns.push({ name: 'ResponsibleName', label: 'Responsible' });
  }



  confirmDelete(item: any) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit( {title: item.ActionName + ' to contact ' + ( item.ContactName || item.CustContactName), objId: this.objId });
  }

  afterLoadItem(itm: BaseOrderDialog) {
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
    this._router.navigate([ '../../sendemail', this.itemEdit.Id], { relativeTo: this.route });
  }
}
