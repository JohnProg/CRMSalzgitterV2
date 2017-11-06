import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';

import { CatalogService, IPChangeEventSorted, EMAILTO_FORMAT } from '../../services/catalog.service';
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


import { Router, ActivatedRoute } from '@angular/router';
import { CrmcustomdialogComponent, DialogResponse } from '../../components/crmcustomdialog/crmcustomdialog.component';
import { TranslateService } from '@ngx-translate/core';
import { BaseOrderDialog, Customer, DocType, findActionOppByType_Result  } from '../../model/allmodels';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { EnumDocType } from '../../constants/index';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

const catQl = gql`
  query 
  findActionOppByType($typeid: Int!, $idaction: Int!, $custid: Int!) {
    findActionOppByType(idtypedoc: $typeid, idactionopp: $idaction ) { id name eMailTo   }
    responsibles { id name isActive }
    contacts { id name isActive }
    findCustomerContacts(custid: $custid) { id name isActive  } 
    customer(sid: $custid) { id name }
    docType(sid: $typeid) { id name description rootFolder }
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
    @Input() quoteType: EnumDocType;
   
    //@ViewChild('confirmstatus') confirmDialog: Md2Dialog;

    sortBy: string = 'actionName';
    itemEdit: BaseOrderDialog;
    showEMail: boolean = false;
    searchByUrl: string;
    customer: Customer;
    docType: DocType;
    
  ngBeforeInit() {
    super.ngBeforeInit();
    this.autoLoad = false;  
    this.catalogName = this.catName;
    this._curService.setAPI(this.baseApi, this.catalogName, this.loadName); 
    this.setTitle = false;
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


  addColumns() {
     this.columns.push({ name: 'actionName', label: 'Action' });
     this.columns.push({ name: 'toContact', label: 'EMail to', numeric: false, format: EMAILTO_FORMAT  });
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
    
    //this.loadCustomerContact(this.idCustomer);
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
    this._curService.loadQl(catQl, { typeid: this.quoteType, idaction: 0, custid:this.idCustomer })
      .subscribe(({data}) => {
        this.catResponsible = data['responsibles'];
        this.catActionsOpp = data['findActionOppByType'];
        this.catContact = data['contacts'];
        this.catCustomerContact = data['findCustomerContacts'];
        this.customer = data['customer'];
        this.docType = data['docType'];
      }, (error: Error) => {
        this._loadingService.resolve('');
        debugger
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      }
      );  
     // this.loadCustomerContact(this.idCustomer); 
  }

  actionChange(event) {
    let act =  <findActionOppByType_Result>(this.catActionsOpp.filter( i => i.id === this.itemEdit.idAction)[0]);
    if(act != null ) {
      this.itemEdit.toContact = act.eMailTo;
    }
  }

  submitForm(form) {
    if ( form.valid &&  this.beforeSave() === true) {
      if (this.itemEdit.id > 0) {
        this.confirmUpdateStatus();
      } else {
        this._curService.create(this.itemEdit);
      }     
    } else {
      this._snackBarService.open('There are some errors, please review data ', 'Ok');
    }
  }


  confirmUpdateStatus() {

    let dialogRef = this._dialogService.open(CrmcustomdialogComponent, {
      data: {      
        title: 'Confirm Status Change',
        body: 'Would you like to change the status?'
      }
    });
    dialogRef.afterClosed().subscribe( (result: DialogResponse) => {
      if( result == DialogResponse.No ) {
          this.itemEdit.updateStatus = false;
          this._curService.update(this.itemEdit);
      } else if( result == DialogResponse.Yes ) {
          
          this.itemEdit.updateStatus = true;
          this._curService.update(this.itemEdit);        
      }
    });

    //DialogResponse
  }

  updateConfirm() {

  }

  noConfirm() {

  }

}
