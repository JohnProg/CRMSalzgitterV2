import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';

import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { TCRMEntity, GetProductProperty, ProductProperty, ReturnSaveRequest } from '../../../model/allmodels';
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



@Component({
  selector: 'crm-productproperty',
  templateUrl: './productproperty.component.html',
  styleUrls: ['./productproperty.component.scss'],
  providers: [CatalogService, ConfigurationService],
})
export class ProductpropertyComponent   {
  @Input() idprop: number;

  isEditProp: boolean = false;

  _catList = <BehaviorSubject<GetProductProperty[]>>new BehaviorSubject([]);

  propList: Observable<GetProductProperty[]>;
  _props: GetProductProperty[] = new Array<GetProductProperty>();
  dataStore: { properties: GetProductProperty[] };

  propEdit: ProductProperty;
  itemEdit: GetProductProperty;
  propColumns: ITdDataTableColumn[] = [
  ];
  catalogName: string;

constructor(public _router: Router, public _route: ActivatedRoute, public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone) {
    this.dataStore = { properties: [] };

    this.propColumns.push({ name: 'POrder', label: 'Order', tooltip: '' });
    this.propColumns.push({ name: 'Name', label: 'Name', tooltip: '' });
    this.propColumns.push({ name: 'Description', label: 'Description' });
    this.propColumns.push({ name: 'IsRequired', label: 'Required' });
    this.propColumns.push({ name: 'tActions', label: '' });
    this.propEdit = new ProductProperty();
    this.catalogName = 'Product Properties';
  }


  loadProperties() {
     if (this.propList == undefined) {

      this.propList = this._catList.asObservable();
      let cparams: TCRMEntity[] = new Array<TCRMEntity>();
      let p: TCRMEntity = new TCRMEntity();
      p.Name = 'prodId';
      p.Description = this.idprop.toString();
      cparams.push(p);

      let prop: TCRMEntity = new TCRMEntity();
      prop.Name = 'idprop';
      prop.Description = '0';
      cparams.push(prop);


      this._curService.loadCustomCatalogObs('Product/GetProperties', cparams)
        .map((response) => response.json()).subscribe((data) => {
          this.dataStore.properties = data;
          this._catList.next(Object.assign({}, this.dataStore).properties);
        }, (error) => {
          this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
        });

      this._curService.loadCatalog('Property', this._props, undefined);
    }
  }

  initEntity() {
    this.itemEdit = new  ProductProperty();
  }

  editProperty(item: GetProductProperty) {
    this.itemEdit = item;

    this.propEdit = new ProductProperty();
    this.propEdit.IdProduct = this.idprop;
    this.propEdit.IdProperty = item.IdProperty;
    this.propEdit.Id = item.Id;
    this.propEdit.POrder = item.POrder;
    this.isEditProp = true;
  }

  addProperty() {
    this.propEdit = new ProductProperty();
    this.propEdit.Id = 0;
    this.propEdit.IdProduct = this.idprop;
    this.isEditProp = true;
  }

  cancelEditProp() {
    this.isEditProp = false;
  }

  saveProp(item) {

    if (item.Id == 0) {
      this._curService.customPost('Product/SaveProperty', item)
        .map((response) => response.json()).subscribe((data) => {
          this.isEditProp = false;
          this.dataStore.properties.push(data.Data);
          this._catList.next(Object.assign({}, this.dataStore).properties);
          this._snackBarService.open(data.Message, 'Ok');
        }, (error) => {
          this._loadingService.resolve('users.list');
          this._snackBarService.open(error.Message, 'Ok');
        });
    } else {
      this._curService.customPost('Product/UpdateProperty', item)
        .map((response) => response.json()).subscribe((data ) => {
          this.isEditProp = false;
          this.dataStore.properties.forEach((t, i) => {
              if (t.Id === data.Data.Id) { this.dataStore.properties[i] = data.Data; }
            });
          this._catList.next(Object.assign({}, this.dataStore).properties);
          this._snackBarService.open(data.Message, 'Ok');
        }, (error) => {
          this._loadingService.resolve('users.list');
          this._snackBarService.open(error.Message, 'Ok');
        });
    }
  }

  deleteProperty(item: TCRMEntity) {

    let cparams: TCRMEntity[] = [];
    this._curService.customDelete('Product/DeleteProperty?idprop=' + item.Id.toString(), cparams)
      .map((response) => response.text()).subscribe((data) => {

        this._snackBarService.open(data, 'Ok');
        let index = this.dataStore.properties.findIndex((o) => o.Id === item.Id);
        this.dataStore.properties.splice(index, 1);
        this._catList.next(Object.assign({}, this.dataStore).properties);

      }, (error) => {
        this._loadingService.resolve('users.list');
        this._snackBarService.open(error, 'Ok');
      });
  }

  submitProperty(form: any) {

  }

}
