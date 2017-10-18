import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, EMAILTO_FORMAT } from '../../../services/catalog.service';
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


import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';


export const actionQl = gql`
query 
{
  estatusOpportunities { id name description  }
  docTypes { id name description  }
  templateEMails { id name }
}
`;

export const statusQl = gql`
query 
findStatusByDocType($iddoc: Int!)
{
  findStatusByDocType(iddoc: $iddoc) { id name description allowChild isEditable idDocType }
}
`;

@Component({
  selector: 'crm-actionopportunitytemplateemail',
  templateUrl: './actionopportunitytemplateemail.component.html',
  styleUrls: ['./actionopportunitytemplateemail.component.scss']
})
export class ActionopportunitytemplateemailComponent extends BaseComponent {

  @Input() idaction: number;
  itemEdit: ActionOpportunityDocType;
  loadName: string = 'actopptemplate.load';

  ngBeforeInit() {
    super.ngBeforeInit();
    this.subEditor = true;
    this.setTitle = false;
    this.sortBy = 'docTypeName';
    this.catalogName = 'Action Opportunity DocType';
    this._curService.setAPI('ActionOpportunityDocType/', this.catalogName, this.loadName);    
  }

  loadCatalogs() {
    this._curService.loadQl(actionQl, undefined)
    .subscribe(({data}) => {
      
      this.catDocType = data['docTypes'];
      this.catStatus = data['estatusOpportunities'];
      this.catEMail = data['templateEMails'];
    }, (error: Error) => {
      this._loadingService.resolve('');
      
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    }
    );   
  }

  loadData() {
    let pparams: URLSearchParams = new URLSearchParams();
    pparams.set('id', '0');
    pparams.set('idaction', this.idaction.toString());
    this._curService.loadCustomAll('ActionOpportunityDocType/searchByAction', pparams);

  }

  initEntity() {
    this.itemEdit = new ActionOpportunityDocType() ;
    this.itemEdit.idActionOpportunity  = this.idaction;
  }


  addColumns() {
    this.columns.push({ name: 'docTypeName', label: 'Doc Type', tooltip: '' });
    this.columns.push({ name: 'templateName', label: 'E-Mail Template' });
    this.columns.push({ name: 'statusName', label: 'Status' });
    this.columns.push({ name: 'eMailTo', label: 'EMail to', numeric: false, format: EMAILTO_FORMAT  });
  }

  confirmDelete(item:  GetActionDoctType_Result) {
    this._actions.deleteItemEvent.emit( { title: item.docTypeName, objId: this.objId } );
  }

  afterCreate(item: any) {
    Object.assign(this.itemEdit, item.item);
    if(this.singleEditor === false) {
      this.isEditing = false;
      //this._actions.cancelEdit();

    }
     this.onItemCreated.emit(item);
  }

  afterUpdate(item: any) {

    Object.assign(this.itemEdit, item.item);
    if( this.singleEditor === false) {
        this.isEditing = false;        
    }
    //this._curService.assignList(item.items);
  }

  afterLoadItem(itm:  ActionOpportunityDocType) {
    super.afterLoadItem(itm);
    this.loadStatusCat();
 } 
 
 loadStatusCat() {
  this._curService.loadQl(statusQl, { iddoc: this.itemEdit.idDocType })
  .subscribe(({data}) => {
    this.catStatus = data['findStatusByDocType'];
  }, (error: Error) => {
    this._loadingService.resolve('');
    this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
  }
  ); 
 }

 onDocTypeChange(event: any) {
  this.loadStatusCat();

 }
}
