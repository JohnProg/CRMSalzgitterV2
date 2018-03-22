import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { ReactiveFormsModule, NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { Shipping, TCRMEntity, GetFieldForShipping_Result } from '../../../model/allmodels';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseOppComponent } from '../../../catalogs/index';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';


import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';



@Component({
  selector: 'crm-shippingeditorheader',
  templateUrl: './shippingeditorheader.component.html',
  styleUrls: ['./shippingeditorheader.component.scss']
})
export class ShippingeditorheaderComponent extends BaseOppComponent {

  itemEdit: Shipping;
  dta: Date;


  ngBeforeInit() {
    super.ngBeforeInit();
    this.itemEdit = new Shipping();
    this.catalogName = 'SHP';
    this.autoLoad = false;
    this._curService.setAPI('Shipping/', this.catalogName, this.loadName);
    this.singleEditor = true;  
  }




  initEntity() {
    this.itemEdit = new  Shipping();
    this.itemEdit.idStatus = 1;
  }

  afterLoadItem(item: Shipping) {
    super.afterLoadItem(item);
    this.loadCountryOrigin(item.idMill);
  }


  
  loadFromOpp(oid: number ) {
    
        let p: TCRMEntity[] = new Array<TCRMEntity>();
        let p1 = new TCRMEntity();
        p1.name = 'idquote'; p1.description = oid.toString();
    
        let p2 = new TCRMEntity();
        p2.name = 'twith'; p2.description = '';
       
        p.push(p1);
        p.push(p2);
        
        this._curService.loadCustomCatalogObs('Shipping/GetFieldsForShipping', p) 
          .map((response) => response.json())
            .subscribe( (data: GetFieldForShipping_Result) => {

            //this.itemEdit.idDocType = data.idDocType;
            this.itemEdit.idStatus = data.idStatus;
            this.itemEdit.idCustomer = data.idCustomer;
            this.itemEdit.idCurrency = data.idCurrency;
            //this.itemEdit.idUser = data.idUser;
            this.itemEdit.idPort = data.idPort;
            this.itemEdit.idIncoTerm = data.idIncoTerm;
            this.itemEdit.idLinerTerm = data.idLinerTerm;
            this.itemEdit.idDeliveryPoint = data.idDeliveryPoint;
            this.itemEdit.idMill = data.idMill;
            this.itemEdit.idCountryOrigin = data.idCountryOrigin;
            this.loadCountryOrigin(this.itemEdit.idMill);
          }, error => {
            this._snackBarService.open('Purchase Order does not exists', 'Ok');
          });
  }

  searchCurrency(e: any) {
    debugger
  }
}

