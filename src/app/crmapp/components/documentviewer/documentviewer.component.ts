import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';


import { Observable ,  Observer ,  BehaviorSubject } from 'rxjs';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';

import { Router, ActivatedRoute } from '@angular/router';


import { ActionsService } from '../../services/actions.services';
import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

import { BaseComponent } from '../../catalogs/base.component';
import {  BaseDocument, IDeleteEventModel  } from '../../model/index';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-documentviewer',
  templateUrl: './documentviewer.component.html',
  styleUrls: ['./documentviewer.component.scss']
})
export class DocumentviewerComponent extends BaseComponent {

 @Input() idParent: number = 0;
 @Input() baseApi: string;
 @Input() catName: string = "Documents";
 sortBy: string = 'docTypeName';
 itemEdit: BaseDocument;
 loadName: string = 'docview.load';
 
 setTitle: boolean = false;

 loadData() {
    let pparams = new URLSearchParams();
    pparams.set('iddialog', '0');
    pparams.set('idparent', this.idParent.toString());
    this._curService.loadCustomAll( this.baseApi + '/searchBy', pparams);
    this.initEntity();
  }


  addColumns() {
     this.columns.push({ name: 'docTypeName', label: 'Doc. Type' });
     this.columns.push({ name: 'dateUploaded', label: 'Date Uploaded', tooltip: '' });
     this.columns.push({ name: 'docName', label: 'Document Name' });
  }

  downLoad(item: BaseDocument) {
    if( this.checkOneDriveToken() == true) {
      this._one.loadItem = this.loadName;
      this._one.downloadFile(item.docId, item.docName);
    }
  }
  
  initEntity() {
    this.itemEdit = new  BaseDocument();
  }

  confirmDelete(item:  BaseDocument) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit( (<IDeleteEventModel>{ title: item.docName, objId: this.objId }) );
  }

  afterLoadAll(itms: BaseDocument[]) {
    super.afterLoadAll(itms);
    this._actions.showAdd(false);

  }

}
