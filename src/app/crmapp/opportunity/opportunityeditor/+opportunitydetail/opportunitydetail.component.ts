import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { CatalogService, IPChangeEventSorted, CURRENCY_FORMAT, NUMBER_FORMAT } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { OpportunityDetail } from '../../../model/allmodels';
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
import { OpportunitydetailsumaryComponent } from './+opportunitydetailsumary/opportunitydetailsumary.component';
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
  selector: 'crm-opportunitydetail',
  templateUrl: './opportunitydetail.component.html',
  styleUrls: ['./opportunitydetail.component.scss'],
  providers: []
})
export class OpportunitydetailComponent extends BaseComponent {

  @Input() idOpp: number = 0;
  itemEdit: OpportunityDetail;
  sortBy: string = 'itemDescription';
  allowProduct: boolean = true;
  propSubscription: Subscription;

 constructor(public _router: Router, 
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
 
    this.catalogName = 'Opp Details';
    this._curService.setAPI('OpportunityDetail', this.catalogName);
    this.itemEdit = new OpportunityDetail();

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
    this.entList = <Observable<OpportunityDetail[]>>this._curService.entList;
    this.initData();
  }


  initData() {
    let pparams = new URLSearchParams();
    pparams.set('idopp', this.idOpp.toString());
    this._curService.loadCustomAll('OpportunityDetail/searchByOpp', pparams);
    this.initEntity();
  }

  afterViewInit(): void {
    this._actions.updateTitle('Details for opportunity ' + this.idOpp.toString());

  }

  onDestroy() {
    if (this.propSubscription !== undefined) { this.propSubscription.unsubscribe(); }
  }

  addColumns() {
    this.columns.push({ name: 'itemDescription', label: 'Item Description' });
    this.columns.push({ name: 'productDescription', label: 'Product', tooltip: '' });

    this.columns.push({ name: 'itemQuantity', label: 'Quantity' });
    this.columns.push({ name: 'itemPrice', label: 'Price', numeric: true, format: CURRENCY_FORMAT, sortable: false });
    this.columns.push({ name: 'itemExtended', label: 'Extended', numeric: true, format: CURRENCY_FORMAT, sortable: false });
  }

  initEntity() {
    this.itemEdit = new OpportunityDetail() ;
    this.itemEdit.idOpportunity  = this.idOpp;
    this.itemEdit.dateAdded = new Date();
    this.itemEdit.idProduct = 0;
  }


  afterLoadItem(itm: OpportunityDetail) {
    super.afterLoadItem(itm);
    this._actions.updateTitle('Edit item ' + this.idOpp.toString());
  }


  confirmDelete(item:  OpportunityDetail) {
    this.itemEdit = item;
    this._actions.deleteItem( { title: item.itemDescription, objId: this.objId });
  }

  afterCreate(item: OpportunityDetail) {
    Object.assign(this.itemEdit, item);
  }

  afterUpdate(item: OpportunityDetail) {
    Object.assign(this.itemEdit, item);
  }

  hasSumary(h: boolean) {
    this.allowProduct = h || this.itemEdit.id === 0;
  }
}
