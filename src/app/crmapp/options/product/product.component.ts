import { Component, OnInit, AfterViewInit, Input  } from '@angular/core';
import { CatalogService } from '../../services/catalog.service';
import { Title }     from '@angular/platform-browser';
import { ActionsService } from '../../services/actions.services';

import { ConfigurationService } from '../../services/configuration.service';
import { IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder, 
         ITdDataTableSortChangeEvent, ITdDataTableColumn, 
         TdLoadingService, TdDialogService, TdMediaService } from '@covalent/core';
import { MdSnackBar } from '@angular/material';

import { Product, ProductProperty } from '../../model/allmodels';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BaseComponent } from '../../catalogs/base.component';
import { CbxfamilyComponent } from '../../components/cbxfamily/cbxfamily.component';



@Component({
  selector: 'crm-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [CatalogService, ConfigurationService ]
})
export class ProductComponent extends BaseComponent {

pTitle: string;

  
familyList: any[] ;
propColumns: ITdDataTableColumn[] = [];
deleteCaption: string;
deleteText: string;
currentProp: ProductProperty;


  constructor(public _curService: CatalogService, public _confs: ConfigurationService, 
              public _loadingService: TdLoadingService,
              public _dialogService: TdDialogService,
              public _snackBarService: MdSnackBar,
              public _actions: ActionsService) {
     super(_curService, _confs, _loadingService, _dialogService, _snackBarService, _actions);
    this.catalogName = 'Product';
    this._curService.setAPI('Product', this.catalogName);
  }

  ngOnInit() {
    this.familyList = new Array<any>();
    this.pTitle = '';

    this._curService.loadCatalog('Family/', this.familyList, undefined);

    this.initData();
    this.entList = <Observable<Product[]>> this._curService.entList;

    this.addPropColumns();
  }

  addPropColumns() {
    this.propColumns.push({ name: 'POrder', label: 'Order' });
    this.propColumns.push({ name: 'Property.name', label: 'Name' });
    this.propColumns.push({ name: 'Property.description', label: 'Description' });
    this.propColumns.push({ name: 'IsRequired', label: 'Required' });
    this.propColumns.push({ name: 'tActions', label: '' });
  }

  deleteProperty(confirm: any) {
      //this(this.currentProp.id);
      //confirm.close();
  }


  confirmDeleteProperty(confirm: any, item: ProductProperty) {
      this.currentProp = item;
      this.deleteCaption = "Property";
      this.deleteText = item.Property.Name;
      confirm.show();
    }
}
