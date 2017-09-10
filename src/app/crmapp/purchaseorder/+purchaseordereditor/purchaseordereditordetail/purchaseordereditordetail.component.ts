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
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { MdSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../../components/abstractvalueaccessor';
import {TranslateService} from '@ngx-translate/core';
import { IDeleteEventModel } from '../../../model/deleteeventmodel';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const productQl = gql`
  query {
    products { id name description }
  }
`;


@Component({
  selector: 'crm-purchaseordereditordetail',
  templateUrl: './purchaseordereditordetail.component.html',
  styleUrls: ['./purchaseordereditordetail.component.scss']
})
export class PurchaseordereditordetailComponent  extends BaseComponent {

  @Input() idPurchase: number = 0;
  itemEdit: PurchaseOrderDetail;
  sortBy: string = 'itemDescription';
  allowProduct: boolean = true;
  propSubscription: Subscription;


  ngBeforeInit() {
    super.ngBeforeInit();
    this.catalogName = 'Purchase Order';
    this._curService.setAPI('PurchaseOrderDetail', this.catalogName);
    this.itemEdit = new PurchaseOrderDetail();   
  }

  loadCatalogs() {
    this._curService.loadQl(productQl, undefined)
      .subscribe(({data}) => {
        this.catProduct = data['products'];

      }, (error: Error) => {
        this._loadingService.resolve('');
        debugger
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      }
      );   
  }


  ngOnInitClass() {
    this.entList = <Observable<PurchaseOrderDetail[]>>this._curService.entList;
    this.initData();
  }


  initData() {
    let pparams = new URLSearchParams();
    pparams.set('idpo', this.idPurchase.toString());
    pparams.set('iddetail', '0');
    this._curService.loadCustomAll('PurchaseOrderDetail/searchByPO', pparams);
    this.initEntity();
  }

  afterViewInit(): void {
    this._actions.updateTitle('Details for Purchase Order ' + this.idPurchase.toString());

  }

  onDestroy() {
    if (this.propSubscription !== undefined) { this.propSubscription.unsubscribe(); }
  }

  addColumns() {
    this.columns.push({ name: 'itemDescription', label: 'Item Description' });
    this.columns.push({ name: 'productDescription', label: 'Product', tooltip: '' });

    this.columns.push({ name: 'itemQuantity', label: 'Quantity' });
    this.columns.push({ name: 'itemPrice', label: 'Cost Price', numeric: true, format: CURRENCY_FORMAT, sortable: false });
    this.columns.push({ name: 'salePrice', label: 'Sales Price', numeric: true, format: CURRENCY_FORMAT, sortable: false });
    this.columns.push({ name: 'shipQty', label: 'Qtty shipped', numeric: true, format: DECIMAL_FORMAT, sortable: false });
  }

  initEntity() {
    this.itemEdit = new PurchaseOrderDetail() ;
    this.itemEdit.idPurchaseOrder  = this.idPurchase;
    this.itemEdit.idProduct = 0;
  }


  afterLoadItem(itm: PurchaseOrderDetail) {
    super.afterLoadItem(itm);
    this._actions.updateTitle('Edit item ' + this.idPurchase.toString());
  }


  confirmDelete(item:  PurchaseOrderDetail) {
    this.itemEdit = item;
    this._actions.deleteItem({ title: item.itemDescription, objId: this.objId});
  }

  afterCreate(item: PurchaseOrderDetail) {
    Object.assign(this.itemEdit, item);
  }

  afterUpdate(item: PurchaseOrderDetail) {
    Object.assign(this.itemEdit, item);
  }

  hasSumary(h: boolean) {
    this.allowProduct = h;
  }
}
