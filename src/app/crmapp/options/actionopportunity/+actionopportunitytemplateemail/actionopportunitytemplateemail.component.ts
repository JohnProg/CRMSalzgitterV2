import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';

import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { TCRMEntity, GetActionDoctType_Result, ActionOpportunityDocType, ReturnSaveRequest } from '../../../model/allmodels';
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




@Component({
  selector: 'crm-actionopportunitytemplateemail',
  templateUrl: './actionopportunitytemplateemail.component.html',
  styleUrls: ['./actionopportunitytemplateemail.component.scss']
})
export class ActionopportunitytemplateemailComponent  {

 @Input() idaction: number;

  isEdit: boolean = false;

  _catList = <BehaviorSubject<GetActionDoctType_Result[]>>new BehaviorSubject([]);

  emailList: Observable<GetActionDoctType_Result[]>;
  _emails: GetActionDoctType_Result[] = new Array<GetActionDoctType_Result>();
  dataStore: { emails: GetActionDoctType_Result[] };

  emailEdit: ActionOpportunityDocType;
  itemEdit: GetActionDoctType_Result;
  propColumns: ITdDataTableColumn[] = [
  ];
  catalogName: string;

constructor(public _router: Router, public _route: ActivatedRoute, public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone) {
    this.dataStore = { emails: [] };

    this.propColumns.push({ name: 'DocTypeName', label: 'Document Type', tooltip: '' });
    this.propColumns.push({ name: 'Name', label: 'Template Name', tooltip: '' });
    this.propColumns.push({ name: 'tActions', label: '' });
    this.emailEdit = new ActionOpportunityDocType();
    this.catalogName = 'Mail Template';

    this._curService.loadCatalog('Property', this._emails, undefined);
  }


  loadTemplates() {
    if( this.emailList === undefined) {
      this.emailList = this._catList.asObservable();
      let cparams: TCRMEntity[] = new Array<TCRMEntity>();
      let p: TCRMEntity = new TCRMEntity();
      p.Name = 'id';
      p.Description = '0';
      cparams.push(p);

      let prop: TCRMEntity = new TCRMEntity();
      prop.Name = 'idaction';
      prop.Description = this.idaction.toString();
      cparams.push(prop);
      this._loadingService.register('items.load');
      this._curService.loadCustomCatalogObs('ActionOpportunityDocType/searchByAction', cparams)
        .map((response) => response.json()).subscribe((data) => {
          this.dataStore.emails = data;
          this._catList.next(Object.assign({}, this.dataStore).emails);
          this._loadingService.resolve('items.load');
        }, (error) => {
          this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
          this._loadingService.resolve('items.load');
        });
    }
  }

  initEntity() {
    this.itemEdit = new  GetActionDoctType_Result();
  }

  editProperty(item: GetActionDoctType_Result) {
    this.itemEdit = item;
    this.emailEdit = new ActionOpportunityDocType();
    this.emailEdit.IdActionOpportunity = this.idaction;
    this.emailEdit.IdDocType = item.IdDocType;
    this.emailEdit.Id = item.Id;
    this.emailEdit.IdTemplateEmail = item.IdTemplateEmail;
    this.isEdit = true;
  }

  addProperty() {
    this.emailEdit = new ActionOpportunityDocType();
    this.emailEdit.Id = 0;
    this.emailEdit.IdActionOpportunity = this.idaction;
    this.isEdit = true;
  }

  cancelEditProp() {
    this.isEdit = false;
  }

  saveProp(item) {
    this._loadingService.register();
    this._curService.catalogPost('ActionOpportunityDocType', item)
        .map((response) => response.json()).subscribe((data ) => {
          this.isEdit = false;
          if (item.Id > 0) {
            this.dataStore.emails.forEach((t, i) => {
                if (t.Id === data.Data.Id) { this.dataStore.emails[i] = data.Data; }
              });
          } else {
             this.dataStore.emails.push(data.Data);
          }
          this._catList.next(Object.assign({}, this.dataStore).emails);
          this._snackBarService.open(data.Message, 'Ok');
          this._loadingService.resolve();
        }, (error) => {
          this._loadingService.resolve();
          this._snackBarService.open(error.Message, 'Ok');
        });
  }

  deleteProperty(item: TCRMEntity) {
    this._loadingService.register();
    let cparams: TCRMEntity[] = [];
    this._curService.catalogDelete('ActionOpportunityDocType/' + item.Id.toString(), cparams)
      .map((response) => response.text()).subscribe((data) => {

        this._snackBarService.open(data, 'Ok');
        let index = this.dataStore.emails.findIndex((o) => o.Id === item.Id);
        this.dataStore.emails.splice(index, 1);
        this._catList.next(Object.assign({}, this.dataStore).emails);
        this._loadingService.resolve();
      }, (error) => {
        this._loadingService.resolve('');
        this._snackBarService.open(error.Message, 'Ok');
        this._loadingService.resolve();
      });
  }

  submitProperty(form: any) {

  }

}
