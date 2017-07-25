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

import { MdSnackBar } from '@angular/material';
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

  shipping: Shipping;

  constructor(
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _mediaService: TdMediaService,
    public _actions: ActionsService,
    public _ngZone: NgZone,
    public _router: Router, public _route: ActivatedRoute,
    translate: TranslateService) {
    super(_loadingService, _dialogService, _snackBarService, _mediaService, _actions);

    this._route.params.subscribe((params: { id: number }) => {
       this.idShipping = params.id;
      });
  }


  doOnItemCreated(itm: Shipping) {
    this.idShipping = itm.id;
    this.shipping = itm;
  }

  linkClick(scr: number ) : boolean {
    this.scrId = scr;
    return true;
  }


  onItemLoaded(itm: Shipping) {
    
    this.shipping = itm;
  }
}




// @Component({
//   selector: 'crm-purchaseordereditorfromopp',
//   templateUrl: './quotationtocustomereditor.component.html',
//   styleUrls: ['./quotationtocustomereditor.component.scss'],
//   providers: [],
// })
// export class PurchaseordereditorFromComponent extends PurchaseordereditorComponent {


//   constructor(
//     public _loadingService: TdLoadingService,
//     public _dialogService: TdDialogService,
//     public _snackBarService: MdSnackBar,
//     public _mediaService: TdMediaService,
//     public _actions: ActionsService,
//     public _ngZone: NgZone,
//     public _router: Router, public _route: ActivatedRoute,
//     translate: TranslateService) {
//     super(_loadingService, _dialogService, _snackBarService, _mediaService, _actions, _ngZone, _router, _route, translate);

//     this._route.params.subscribe((params: { id: number, bytype: number }) => {
//       this.byType = params.bytype;
//       switch(params.bytype) {
//         case EnumDocType.Opportunity:
//              this.idOpp = params.id;
//              break;
//         case EnumDocType.QuotationFromSupplier:
//              this.idQFS = params.id;
//              break;
//         case EnumDocType.QuotationToCustomer:
//              this.idQTC = params.id;
//              break;
//         default:
//              break;
//       }
//     });

//   }


//   afterInit() {
//     super.afterInit();
//     this.headercomp.loadFromOpp(this.idOpp);
//   }
// }

