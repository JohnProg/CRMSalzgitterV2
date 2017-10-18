import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import {  DocTypeStatu, EstatusOpportunity } from '../../../model/index';
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

import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { IDeleteEventModel } from '../../../model/deleteeventmodel';

export const dtypeQl = gql`
  query {
    estatusOpportunities { id name description }
  }
`;

@Component({
  selector: 'crm-opptypestatus',
  templateUrl: './opptypestatus.component.html',
  styleUrls: ['./opptypestatus.component.css']
})
export class OpptypestatusComponent extends BaseComponent   {
  
    @Input() idtype: number;
 
    itemEdit: DocTypeStatu;
    loadName: string = 'doctype.load';
    allStatus: EstatusOpportunity[];
    ngBeforeInit() {
      super.ngBeforeInit();
      this.setTitle = false;
      this.subEditor = true;
      this.catalogName = 'Status';
      this._curService.setAPI( 'DocTypeStatus/', this.catalogName, this.loadName);    
    }
  
  
  
    loadCatalogs() {
      let t = this;
      this._curService.loadQl(dtypeQl, undefined)
        .subscribe(({data}) => {
          this.allStatus = data['estatusOpportunities'];
        }, (error: Error) => {
          this._loadingService.resolve('');
          debugger
          this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
        }
        );     
    }
  
    loadData() {
      let pparams = new URLSearchParams();
      pparams.set('iddoctype', this.idtype.toString());
      pparams.set('aid', '0');
      this._curService.loadCustomAll('DocTypeStatus/searchBy', pparams);
    }
  
    addColumns  () {
      
      this.columns.push({ name: 'name', label: 'Name', tooltip: '' });
      this.columns.push({ name: 'description', label: 'Description' });
      this.columns.push({ name: 'allowChild', label: 'Allow Child' });
      this.columns.push({ name: 'isEditable', label: 'Is Editable' });
      
      //this.columns.push({ name: 'tActions', label: '' });
    }
  
    initEntity() {
      this.itemEdit = new  DocTypeStatu();
      this.itemEdit.idDocType = this.idtype;
    }
  
    afterCreate(item: any) {
      this.isEditing = false;
    }
  
    afterUpdate(item: any) {
      this.isEditing = false;
    }

    deleteConfirmed(e: IDeleteEventModel) {
      if( e.objId === this.objId) {
        this.deleteEntity(this.itemEdit['idDStatus']);
      }
    }
  }
  