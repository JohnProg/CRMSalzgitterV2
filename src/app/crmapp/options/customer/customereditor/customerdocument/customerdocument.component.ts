import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT, DATE_FORMAT } from '../../../../services/catalog.service';
import { ConfigurationService } from '../../../../services/configuration.service';

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


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../../components/abstractvalueaccessor';

import { GetCustomerDocuments_Result,  CustomerDocument, Customer } from '../../../../model/index';
import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AuthHelper } from '../../../../authHelper/authHelper';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"
import * as request from 'superagent';
import { environment } from '../../../../../../environments/environment';


@Component({
  selector: 'crm-customerdocument',
  templateUrl: './customerdocument.component.html',
  styleUrls: ['./customerdocument.component.scss']
})
export class CustomerdocumentComponent extends BaseComponent {

  @Input() idCustomer: number = 0; 
  @Input() customer: Customer;
  itemEdit: CustomerDocument;
  sortBy: 'docName';
  files: any;
  oneBase: string = environment.oneDriveBase;
  ngBeforeInit() {
    super.ngBeforeInit();
    this.catalogName = 'Customer Document';
    this._curService.setAPI('CustomerDocument', this.catalogName, this.loadName);    
    //this._auth = auth;
  }

      

  ngOnInitClass() {

    this.entList = <Observable<GetCustomerDocuments_Result[]>>this._curService.entList;
    this.initData();
  }


  loadData() {
    let pparams: URLSearchParams = new URLSearchParams();
    pparams.set('idcust', this.idCustomer.toString());
    this._curService.loadCustomAll( 'CustomerDocument/searchByCustomer', pparams);
  }

  addColumns() {
    this.columns.push({ name: 'docTypeName', label: 'Doc. Type', tooltip: '' });
    this.columns.push({ name: 'dateUploaded', label: 'Date', numeric: false, format: DATE_FORMAT });
    this.columns.push({ name: 'docName', label: 'Doc. Name' });

  }

  initEntity() {
    this.itemEdit = new CustomerDocument() ;
    this.itemEdit.idCustomer  = this.idCustomer;
    this.itemEdit.parentFolder = 'test';
    this.itemEdit.docId = 'testid';
  }

  addEntity() {
    if( this.checkOneDriveToken() == true) {
      super.addEntity();
    }
  }

  deleteEntity() {

  }
  confirmDelete(item: CustomerDocument) {
    if( this.checkOneDriveToken() == true) {
      this.itemEdit = item;
      this._actions.deleteItemEvent.emit(  { title: 'Document', objId: this.objId });     
    }

  }

  afterDelete(item: CustomerDocument) {
    super.afterDelete(item);
    let docid: string = this.itemEdit.docId;
    this._one.doDelete(docid).end((err, res) => {
      if (err) {
          console.error(err)
          return;
      }
    });
  }


  submitForm(form) {

    if (this.files) {

      let parent = this._one.getRootFolderInfo(environment.oneDriveRootCustomer);
      let cname = this.removeSpeciaCharacters(this.customer.name);
      this._one.GetChildFolderInfo(parent.id, cname,
        (item: MicrosoftGraph.DriveItem) => {
          this._one.uploadFile(item.id, this.files,
            (itemCreated: MicrosoftGraph.DriveItem) => {
              
              this.itemEdit.parentFolder = parent['id'];
              this.itemEdit.docId = itemCreated.id;
              this.itemEdit.docName = itemCreated.name;
              this._curService.create(this.itemEdit);
            },
            (itemCreated: MicrosoftGraph.DriveItem) => {
              debugger
            }
          );
        });

    }

  }

  
    downLoad(item: CustomerDocument) {
      if( this.checkOneDriveToken() == true) {
        this._one.downloadFile(item.docId, item.docName);
      }
    }

  // afterCreate(item: CustomerDocument) {
  //   Object.assign(this.itemEdit, item);
  //   this.isEditing = false;
  // }

  // afterUpdate(item: CustomerDocument) {
  //   Object.assign(this.itemEdit, item);
  //   this.isEditing = false;
  // }

}
