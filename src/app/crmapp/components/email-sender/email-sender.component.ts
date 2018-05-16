import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';


import { Observable ,  BehaviorSubject ,  Subscription } from 'rxjs';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';

import { TdDialogService } from '@covalent/core/dialogs';
import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';
import { DialogOverviewResponsiblePswDialog } from '../responsiblepsw/responsiblepsw.component';

import { BaseComponent } from '../../catalogs/base.component';
import {  EMailTemplate, AttachDocument, TCRMEntity, GenericList } from '../../model/allmodels';


import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {saveAs as importedSaveAs} from "file-saver";
import { debug } from 'util';



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
    this._curService.setAPI(this.baseApi + '/', this.catalogName, this.loadName);
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
    this._actions.updateTitle( { action: 'Send E-Mail', title: this.catalogName , tparam: this.titleParam} );

    setTimeout(() => {
       if (this.idDialog > 0) {
        this.editEntity(this.idDialog);
      }
    }, 500);

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

  userPsw: string = '';
  savepsw: boolean = false;
  sendEmail() {
    if( this._confs.responsiblePassword == '') {
      let dialogRef = this._dialogService.open(DialogOverviewResponsiblePswDialog, {
        //width: '250px',
        data: { rsppsw: this.userPsw, savepsw: this.savepsw }
      });
      dialogRef.afterClosed().subscribe(result => {
        
        this.userPsw = result.rsppsw;
        this.savepsw = result.savepsw;
        if( this.userPsw != '' && this.userPsw != undefined) {
          this.itemEdit.responsiblePassword = this.userPsw;
          if( this.savepsw == true ) {
            this._confs.responsiblePassword = this.userPsw;
          }
          this.setAttachments( () => {
            this.performSendEMail();
          });
        }
      });
    } else {
      this.itemEdit.responsiblePassword = this._confs.responsiblePassword;
      this.setAttachments( () => {
        this.performSendEMail();
      });
    }
  }

  performSendEMail( ) {

   
    this._loadingService.register(this.loadName);
    this._curService.customUpdate(this.baseApi + '/sendEmail',    this.itemEdit )
    //.map((response) => response.json())
    .subscribe((response) => {
      var resp = response.json();
      this._loadingService.resolve(this.loadName);
      this._confs.responsiblePassword = this.userPsw;
      this.cancelEdit();
    }, (error) => {
      var resp = error.json();
      this._loadingService.resolve(this.loadName);
      this._confs.responsiblePassword = '';
      this._snackBarService.open(resp.message, 'Ok');
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

  setAttachments(fnc) {

    
      if( this.checkOneDriveToken() == true) {
        if( this.itemEdit.emailAttachments.length > 0) {
          this.itemEdit.emailAttachments.forEach( item => {
            if( item.fromOneDrive == true ) {
              this._one.downloadFileForEmail(this.itemEdit , item, fnc);
            }
          });
        } else {
          this.performSendEMail();
        }
        
        
      }
  }

  downloadAttachment(doc) {

    if( doc.fromOneDrive == true ) {
      alert('Downloading from OneDrive'); 
    } else if(doc.docData.length > 0) 
    {
       let bl = this._curService.converBase64toBlob(doc.docData, doc.mimmeType)
       importedSaveAs( bl, doc.docName);
    }
  }




}
