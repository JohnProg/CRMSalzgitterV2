import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT, DECIMAL_FORMAT } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { PurchaseOrderDetail } from '../../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../../catalogs/base.component';
import {  EditordetailComponent } from '../../../components/index';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';
import {TranslateService} from '@ngx-translate/core';
import { IDeleteEventModel } from '../../../model/deleteeventmodel';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'crm-purchaseordereditordetail',
  templateUrl: './purchaseordereditordetail.component.html',
  styleUrls: ['./purchaseordereditordetail.component.scss']
})
export class PurchaseordereditordetailComponent  extends EditordetailComponent {

  itemEdit: PurchaseOrderDetail;
  baseApi: string = 'PurchaseOrderDetail';
  catalogName: string = 'Purchase Order';
  baseSearch: string = 'searchByPO';




  getLoadParams(): URLSearchParams {
    let pparams = new URLSearchParams();
    pparams.set('idpo', this.idOpp.toString());
    pparams.set('iddetail', '0');
    return pparams;
  }

  initEntity() {
    this.itemEdit = new PurchaseOrderDetail() ;
    this.itemEdit.idPurchaseOrder  = this.idOpp;
    this.itemEdit.idProduct = 0;
  }

}
