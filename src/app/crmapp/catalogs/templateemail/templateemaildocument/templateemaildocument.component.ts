import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent,  } from '../../../catalogs/base.component';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn,
   } from '@covalent/core/data-table';

import { TdSearchBoxComponent } from '@covalent/core/search';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Router, ActivatedRoute } from '@angular/router';



import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  GetTemplateMailDocuments_Result, TemplateMailDocument, TCRMEntity  } from '../../../model/allmodels';



const documentstQl = gql`
  query {
    documentTypes { id name description }
  }
`;



@Component({
  selector: 'crm-templateemaildocument',
  templateUrl: './templateemaildocument.component.html',
  styleUrls: ['./templateemaildocument.component.scss']
})
export class TemplateemaildocumentComponent  extends BaseComponent {

  @Input() idTemplate: number;
  itemEdit: GetTemplateMailDocuments_Result;
  loadName: string = 'templatemaildocument.load';
  
  ngBeforeInit() {
    super.ngBeforeInit();
    this.subEditor = true;
    this.catalogName = 'Mail Documents';
    this.setTitle = false;
    //this.autoLoad = false;
    this._curService.setAPI('TemplateMailDocument/', this.catalogName, this.loadName);   
  }

  loadDocuments(id: number) {
   this.idTemplate = id;
   this.loadData();
  }

  loadData() {
    
    if ( this.isLoading === false ) {

      if ( this.dataLoaded === true ) {
        this.reloadPaged();
      } else {
        if( this.idTemplate > 0 ) {
          let pparams = new URLSearchParams();
          pparams.set('idtemplate', this.idTemplate.toString());
          this._curService.loadCustomAll( 'TemplateMailDocument/searchByTemplate', pparams);
          this.dataLoaded = true;
        }
      }
    }
  }

  initEntity() {
    this.itemEdit = new GetTemplateMailDocuments_Result();
    this.itemEdit.id = 0;
    this.itemEdit.idTemplate = this.idTemplate;
    this.itemEdit.idDocumentType = 0;
  }


  loadCatalogs() {

    this._curService.loadQl(documentstQl, undefined)
    .subscribe(({data}) => {
      this.catDocumentType = data['documentTypes'];
    }, (error: Error) => {
      this._loadingService.resolve('');
      
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    }
    );   
  }

  afterCreate(item: any) {
    Object.assign(this.itemEdit, item.item);
    if(this.singleEditor === false) {
      this.isEditing = false;
      //this._actions.cancelEdit();

    }
     this.onItemCreated.emit(item);
  }


  submitForm(form) {
    if ( form.valid &&  this.beforeSave() === true) {
      if (this.itemEdit.id > 0) {
        this._curService.update(this.itemEdit);
      } else {
        this._curService.create( {iddialog: this.itemEdit.id, mail: this.itemEdit});
      }
    } else {
      this._snackBarService.open('There are some errors, please review data ', 'Ok');
    }
  }
}
