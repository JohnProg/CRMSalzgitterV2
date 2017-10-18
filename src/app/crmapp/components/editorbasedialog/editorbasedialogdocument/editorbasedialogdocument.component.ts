import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { NgForm } from '@angular/forms';
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


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';

import {  BaseDocument, Customer, DocType } from '../../../model/index';
import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types"

@Component({
  selector: 'crm-editorbasedialogdocument',
  templateUrl: './editorbasedialogdocument.component.html',
  styleUrls: ['./editorbasedialogdocument.component.scss']
})
export class EditorbasedialogdocumentComponent extends BaseComponent {

  @Input() idDialog: number = 0;
  @Input() baseApi: string;
  @Input() parentField: string;

  
  @ViewChild('docForm') form: NgForm;
  itemEdit: BaseDocument;
  
  files: any;
  @Input() customer: Customer;
  @Input() docType: DocType;
  @Input() idDoc: number;

  loadName: string = 'document.load';
  
  ngBeforeInit() {
    super.ngBeforeInit();
    this.subEditor = true;
    this.setTitle = false;
    this.catalogName = 'Dialog Document';   
  }


  ngOnInitClass() {
    this._curService.setAPI(this.baseApi, this.catalogName, this.loadName);
    this.entList = <Observable<BaseDocument[]>>this._curService.entList;
    this.initData();
  }


  afterViewInit(): void {
    this._actions.setEdit();
  }

  loadData() {
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


  addEntity() {
    if( this.checkOneDriveToken() == true) {
      super.addEntity();
    }
  }

  confirmDelete(item: BaseDocument) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit(  { title: 'Document', objId: this.objId });
  }

  submitForm(form) {
    
        if (this.files) {
          this._one.loadItem = this.loadName;
          let cname = this.removeSpeciaCharacters(this.customer.name);
          let parent = this._one.getRootFolderInfo(this.docType.rootFolder);
          this._one.GetChildFolderInfo(parent.id, cname,
            (item: MicrosoftGraph.DriveItem) => {

              this._one.GetChildFolderInfo(item.id, this.idDoc.toString(),  (fitem: MicrosoftGraph.DriveItem) => {

                  this._one.uploadFile(fitem.id, this.files,
                    (itemCreated: MicrosoftGraph.DriveItem) => {
                      
                      this.itemEdit.parentFolder = fitem['id'];
                      this.itemEdit.docId = itemCreated.id;
                      this.itemEdit.docName = itemCreated.name;
                      this._curService.create(this.itemEdit);
                    },
                    (itemCreated: MicrosoftGraph.DriveItem) => {
                      debugger
                    }
                  );
                });      
            });
        }
      }


  afterCreate(item: BaseDocument) {
    //Object.assign(this.itemEdit, item);
    this.isEditing = false;
  }

  afterUpdate(item: BaseDocument) {
    //Object.assign(this.itemEdit, item);
    this.isEditing = false;
  }

  afterDelete(item: BaseDocument) {
    super.afterDelete(item);
    let docid: string = this.itemEdit.docId;
    this._one.doDelete(docid).end((err, res) => {
      if (err) {
          console.error(err)
          return;
      }
    });
  }

  downLoad(item: BaseDocument) {
    if( this.checkOneDriveToken() == true) {
      this._one.downloadFile(item.docId, item.docName);
    }
  }
}
