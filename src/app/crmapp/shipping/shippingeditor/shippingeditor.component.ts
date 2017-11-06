import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { CatalogService, IPChangeEventSorted } from '../../services/catalog.service';
import { ConfigurationService } from '../../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { BaseComponent } from '../../catalogs/base.component';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService, TdLayoutManageListComponent 
} from '@covalent/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {TranslateService} from '@ngx-translate/core';

import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractValueAccessor } from '../../components/abstractvalueaccessor';
import { CatalogComponent } from '../../catalogs/catalog.component';

import {   Shipping } from '../../model/index';
import { EnumDocType } from '../../constants/index';
import { ShippingeditorheaderComponent } from './shippingeditorheader/shippingeditorheader.component';

@Component({
  selector: 'crm-shippingeditor',
  templateUrl: './shippingeditor.component.html',
  styleUrls: ['./shippingeditor.component.scss']
})
export class ShippingeditorComponent extends CatalogComponent {


  idShipping: number;
  scrId: number = 1;
  @ViewChild(ShippingeditorheaderComponent) headercomp: ShippingeditorheaderComponent;
  byType: number = 0;
  shipping: Shipping;
  idPO: number;
  itemRoute: string = 'shipping';
  constructor(
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MatSnackBar,
    public _mediaService: TdMediaService,
    public _actions: ActionsService,
    public _ngZone: NgZone,
    public _router: Router, public _route: ActivatedRoute,
    translate: TranslateService) {
    super(_loadingService, _dialogService, _snackBarService, _mediaService, _actions, _router, _route);
    this.quoteType = EnumDocType.Shipping;
    
  }

  checkParams() {
    this._route.params.subscribe((params: any) => {
      
      if( params != undefined) {
      this.idShipping = params.id;
      
      if( params['parentRoute'] != undefined) this.parentRoute = params.parentRoute;
      if( params['scrId'] != undefined)  this.parentScr = params.scrId;
      if( params['moveToScr'] != undefined)  this.moveToScr = params.moveToScr == "true";
      }
    });
  }

  doOnItemCreated(itm: Shipping) {
    
    this.idShipping = itm.id;
    this.shipping = itm;
    this.idCustomer = this.shipping.idCustomer;
  }

  linkClick(scr: number ) : boolean {
    this.scrId = scr;
    return true;
  }


  onItemLoaded(itm: Shipping) {
    this.idShipping = itm.id;
    this.shipping = itm;
    this.idCustomer = this.shipping.idCustomer;
  }

  
  goToPO() {
    this._router.navigate(['/purchaseorder/edit', this.idPO]);
 }

 goToInex() {
//   if( this.parentRoute != undefined && this.parentScr != undefined) {
//     this._router.navigate([ '/' + this.parentRoute + '/edit/' + this.idPO, {  parentRoute: this.parentRoute, scrId: this.parentScr, moveToScr: true  }]);
//  }else {
   this._router.navigate([ '/' + this.itemRoute]);
 //}
}
}




@Component({
  selector: 'crm-shippingeditor',
  templateUrl: './shippingeditor.component.html',
  styleUrls: ['./shippingeditor.component.scss'],
  providers: [],
})
export class ShippingeditorFromPOComponent extends ShippingeditorComponent {


  constructor(
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MatSnackBar,
    public _mediaService: TdMediaService,
    public _actions: ActionsService,
    public _ngZone: NgZone,
    public _router: Router, public _route: ActivatedRoute,
    translate: TranslateService) {
    super(_loadingService, _dialogService, _snackBarService, _mediaService, _actions, _ngZone, _router, _route, translate);

    this._route.params.subscribe((params: { id: number, bytype: number }) => {
      this.idShipping = 0;
      this.byType = params.bytype;
      this.idPO = params.id;
    });

  }



  afterInit() {
    super.afterInit();
    this.headercomp.loadFromOpp(this.idPO);
  }
}

