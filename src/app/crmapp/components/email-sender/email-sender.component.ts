import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import { BaseComponent } from '../../catalogs/base.component';
import { Subscription } from 'rxjs/Subscription';
import {  EMailTemplate, AttachDocument, TCRMEntity, GenericList } from '../../model/allmodels';

import {TranslateService} from '@ngx-translate/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'crm-email-sender',
  templateUrl: './email-sender.component.html',
  styleUrls: ['./email-sender.component.scss']
})
export class EmailSenderComponent extends BaseComponent {

     userName: string;
   userEmail: string;
  scrId: number;
  loadUrl: string;
  itemEdit: EMailTemplate;
  idDialog: number = 0;
  allContacts: TCRMEntity[];
  optionsModel: number[];
  mainField: string;
  baseApi: string;


  ngBeforeInit() {
    super.ngBeforeInit();
    this.autoLoad = false;
    this.singleEditor = true;
    this.route.params.subscribe((params: { id: number, scrid: number }) => {
      this.idDialog = params.id;
      this.scrId = params.scrid;
    });  
  }

  ngOnInitClass() {
    super.ngOnInitClass();
    this._curService.setAPI(this.baseApi + '/', this.catalogName);
    this.loadUrl = this.baseApi + '/getEMailData?iddialog=';
      this.setUserInfo();   
  }


  setUserInfo() {
        if( this._confs.userInfo ) {
          this.userName = this._confs.userInfo.name;
          this.userEmail = this._confs.userInfo.eMail;
        }
  }


 afterViewInit(): void {
    this._actions.showAdd(false);
    this._actions.showSearch(false);
    this._actions.showSave(false);
    this._actions.showCancel(true);
    this._actions.showEmail(true);
    this._actions.updateTitle( this.catalogName +  ' Send EMail ' );

    setTimeout(() => {
       if (this.idDialog > 0) {
        this.editEntity(this.idDialog);
      }
    }, 1000);

  }

  initEntity() {
    this.itemEdit = new  EMailTemplate();
  }


  editEntity(iddialog: number) {
    this._curService.loadFromUrl(this.loadUrl + iddialog);
  }


  afterLoadAll(itms: EMailTemplate[]) {
    debugger

  }

  afterLoadItem(item: EMailTemplate) {
    //super.afterLoadItem(item);
    this.itemEdit = item;
    
    this.allContacts = Array<TCRMEntity>();

    this._curService.loadCustomCatalog(this.baseApi + '/getAllContacts?idcustomer=' + this.itemEdit.idCustomer, this.allContacts, undefined);
  }


  cancelEdit(): void {
     this._router.navigate([ '../../edit', this.itemEdit[this.mainField]], { relativeTo: this.route });
  }


  sendEmail() {
    this._curService.customPost(this.baseApi + '/sendEmail', this.itemEdit).subscribe((t: any) => {
      this.cancelEdit();
    });
  }


  onContactChange(name: string) {

    let d = this.itemEdit.eMailTo.filter( (t: any) => {
      return t.description === name;
    })[0];
    if( d === undefined) {
      let a = this.allContacts.filter( (t: any) => {
        return t.eMail === name;
      })[0];
      let c: GenericList = new GenericList();
      c.name = a.name;
      c.description = a['EMail'];
      this.itemEdit.eMailTo.push(c);
    }
  }

  deleteContact(idex: any) {
     this.itemEdit.eMailTo.splice(idex, 1);

  }
}
