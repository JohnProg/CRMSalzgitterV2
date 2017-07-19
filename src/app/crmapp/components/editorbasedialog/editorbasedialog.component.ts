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
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const catQl = gql`
  query 
  findActionOppByType($typeid: Int!, $idaction: Int!) {
    findActionOppByType(idtypedoc: $typeid, idactionopp: $idaction ) { id name  }
    responsibles { id name isActive }
    contacts { id name isActive }
  }
`;

@Component({
  selector: 'crm-editorbasedialog',
  templateUrl: './editorbasedialog.component.html',
  styleUrls: ['./editorbasedialog.component.scss']
})
export class EditorbasedialogComponent extends BaseComponent {



    @Input() idParent: number = 0;
    @Input() baseApi: string;
    @Input() parentField: string;
    @Input() catName: string;
    @Input() documentBaseApi: string;
    @Input() documentParentField: string;
    @Input() idCustomer: number;

    sortBy: string = 'actionName';
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
    public _router: Router,
    public route: ActivatedRoute,
    public apollo: Apollo) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, route, apollo);
 
    this.autoLoad = false;
    
  }

 ngOnInitClass() {
    this.catalogName = this.catName;
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
    this.itemEdit.emailSended = false;
  }

  afterViewInit(): void {
    this._actions.updateTitle( this.catalogName + ' ' + this.idParent.toString());
  }

  addColumns() {
     this.columns.push({ name: 'actionName', label: 'Action' });
     this.columns.push({ name: 'contactName', label: 'Contact', tooltip: '' });
     this.columns.push({ name: 'custContactName', label: 'Cust. Contact', tooltip: '' });
     this.columns.push({ name: 'responsibleName', label: 'Responsible' });
  }



  confirmDelete(item: any) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit( {title: item.actionName + ' to contact ' + ( item.contactName || item.custContactName), objId: this.objId });
  }

  afterLoadItem(itm: BaseOrderDialog) {
    super.afterLoadItem(itm);
    
    this.loadCustomerContact(this.idCustomer);
    setTimeout(() => {
    this._actions.showEmail(true);
    }, 500);
  }
 
 cancelEdit() {
   super.cancelEdit();
   setTimeout(() => {
    this._actions.showEmail(false);
    }, 1000);

 }

  afterCreate(item: any) {
    this.itemEdit.id = item.id;
    this.itemEdit.dateDialog = item.dateDialog;
    setTimeout(() => {
       this._actions.showEmail(true);
    }, 500);
  }

  afterUpdate(item: any) {
    
  }
 
  sendEmail() {
    this.showEMail = true;
    this._router.navigate([ '../../sendemail', this.itemEdit.id], { relativeTo: this.route });
  }

  loadCatalogs() {
    this._curService.loadQl(catQl, { typeid: 2, idaction: 0 })
      .subscribe(({data}) => {
        this.catResponsible = data['responsibles'];
        this.catActionsOpp = data['findActionOppByType'];
        this.catContact = data['contacts'];
      }, (error: Error) => {
        this._loadingService.resolve('');
        debugger
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      }
      );   
  }


}
