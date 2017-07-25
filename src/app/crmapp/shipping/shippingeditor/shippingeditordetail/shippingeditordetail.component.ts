import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT, DECIMAL_FORMAT } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';

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
import { Shipping, ShippingDetail, GetShippingDetails_Result, 
  TCRMEntity, GetPODetailForShipping_Result, ShipPODetailModel } from '../../../model/allmodels';


const productQl = gql`
  query {
    products { id name description }
  }
`;

@Component({
  selector: 'crm-shippingeditordetail',
  templateUrl: './shippingeditordetail.component.html',
  styleUrls: ['./shippingeditordetail.component.scss']
})
export class ShippingeditordetailComponent extends BaseComponent {


  @Input() idShipping: number = 0;
  itemEdit: GetShippingDetails_Result;
  @Input() shipData: Shipping;
  sortBy: string = 'itemDescription';
  allowProduct: boolean = true;
  propSubscription: Subscription;
  

  poDetails: ShipPODetailModel[]; 

 constructor(public _router: Router, public _route: ActivatedRoute, 
    public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone,
    public _http: Http,
    public _tableService: TdDataTableService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public apollo: Apollo) {
    super( _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone, _http, _tableService, translate, route, apollo);
 
    this.catalogName = 'Shipping Detail';
    this._curService.setAPI('ShippingDetail', this.catalogName);
    this.itemEdit = new GetShippingDetails_Result();
  }



  ngOnInitClass() {
    this.entList = <Observable<GetShippingDetails_Result[]>>this._curService.entList;
    this.initData();
  }


  loadData() {
      if ( this.isLoading === false ) {

        if ( this.dataLoaded === true ) {
          this.reloadPaged();
        } else {
          let pparams = new URLSearchParams();
          pparams.set('idship', this.idShipping.toString());
          pparams.set('iddetail', '0');
          pparams.set('idpodetail', '0');
          pparams.set('idpo', '0');
          pparams.set('idposum', '0');
          this._curService.loadCustomAll('ShippingDetail/searchBy', pparams);
          this.dataLoaded = true;
        }
      }
  }


  afterViewInit(): void {
    this._actions.updateTitle('Details for Shipping ' + this.idShipping.toString());
  }

  onDestroy() {
    if (this.propSubscription !== undefined) { this.propSubscription.unsubscribe(); }
  }

  addColumns() {
    this.columns.push({ name: 'itemDescription', label: 'Item Description' });
    this.columns.push({ name: 'sumaryDescription', label: 'Product', tooltip: '' });

    this.columns.push({ name: 'shipQty', label: 'Quantity', numeric: true, format: NUMBER_FORMAT, });
    this.columns.push({ name: 'shipPrice', label: 'Price', numeric: true, format: CURRENCY_FORMAT, sortable: false });
    this.columns.push({ name: 'extended', label: 'Amount', numeric: true, format: CURRENCY_FORMAT, sortable: false });
  }



  initEntity() {
    this.itemEdit = new GetShippingDetails_Result() ;
    this.itemEdit.idShipping  = this.idShipping;
    this.itemEdit.id = 0;
  }


  addEntity() {
    super.addEntity();
    this.getPODetailForShipping();
  }


  getPODetailForShipping() {
    let pparams: TCRMEntity[] = new Array<TCRMEntity>();
    pparams.push( (<TCRMEntity>{ name: 'idcust', description: this.shipData.idCustomer.toString()}) );
    pparams.push( (<TCRMEntity>{ name: 'idport', description: this.shipData.idPort.toString()}) );
    pparams.push( (<TCRMEntity>{ name: 'idmill', description: this.shipData.idMill.toString()}) );
    pparams.push( (<TCRMEntity>{ name: 'idcountry', description: this.shipData.idCountryOrigin.toString()}) );
    pparams.push( (<TCRMEntity>{ name: 'iddelivery', description: this.shipData.idDeliveryPoint.toString()}) );


    this._curService.loadCustomCatalogObs('ShippingDetail/getPODetailForShipping', pparams)
    .map((response) => response.json())
    .subscribe( (m: ShipPODetailModel[]) => {
         this.poDetails = m;
    });

  }
  afterLoadItem(itm: GetShippingDetails_Result) {
    super.afterLoadItem(itm);
    this._actions.updateTitle('Edit item ' + this.idShipping.toString());
  }

  saveEntity() {
    
    let itms: ShippingDetail[] = new Array<ShippingDetail>();
    let tself = this;
    //let req =  <IncoTerm>(this.catIncoTerm.filter( i => i.id === this.itemEdit['idIncoTerm'])[0]);
    this.poDetails.forEach(function(v, idex) {
      //let t = v.items.filter( i => i.qtyInShipping > 0);
      v.items.forEach(function(i, idx) {
        if( i.qtyInShipping > 0) {
            let d = new ShippingDetail();
            d.id = 0;
            d.idShipping = tself.shipData.id;
            d.idPurchaseOrder = i.id;
            d.idPurchaseOrderDetail = i.idDetail;
            d.idPurchaseOrderDetailSumary = i.idDetailSum;
            d.shipQty = i.qtyInShipping;
            d.shipPrice = i.priceSum;
            d.extended  = d.shipQty * d.shipPrice;
            itms.push(d);
        }
      });
      
    });
    if( itms.length > 0) {
        this._curService.createArray(itms);
    }
  }
  confirmDelete(item:  GetShippingDetails_Result) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit( (<IDeleteEventModel>{ title: item.sumaryDescription, objId: this.objId }) );
  }

  hasSumary(h: boolean) {
    this.allowProduct = h;
  }
}
