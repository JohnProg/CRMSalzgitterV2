import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActionsService } from '../../../services/actions.services';

import { CatalogService, IPChangeEventSorted } from '../../../services/catalog.service';
import { ConfigurationService } from '../../../services/configuration.service';
import { TCRMEntity, GetProductProperty } from '../../../model/allmodels';
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
  selector: 'app-producteditor',
  templateUrl: './producteditor.component.html',
  styleUrls: ['./producteditor.component.scss'],
  providers: [CatalogService, ConfigurationService],
})
export class ProducteditorComponent extends BaseComponent {


  families: TCRMEntity[] = new Array<TCRMEntity>();

  _catList = <BehaviorSubject<TCRMEntity[]>>new BehaviorSubject([]);
  propList: Observable<GetProductProperty[]>;

  propColumns: ITdDataTableColumn[] = [
  ];


  constructor(public _router: Router, public _route: ActivatedRoute, public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone) {
    super(_curService, _confs, _loadingService, _dialogService, _snackBarService, _actions, _mediaService, _ngZone);
    this.catalogName = 'Product';
    this._curService.setAPI('Product/', this.catalogName);

    this.propColumns.push({ name: 'Name', label: 'Name', tooltip: '' });
    this.propColumns.push({ name: 'Description', label: 'Description' });
    this.propColumns.push({ name: 'IsRequired', label: 'Required' });
    this.propColumns.push({ name: 'tActions', label: '' });


  }


  ngOnInitClass() {




    this.entList = <Observable<TCRMEntity[]>>this._curService.entList;

    this._curService.loadCatalog('Family', this.families, null);

    this._route.params.subscribe((params: { id: number }) => {

      let itemId: number = params.id;
      if (itemId > 0) {
        this.editEntity(itemId);
      } else {
        this.addEntity();
      }

    });



    //this.initData();

  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this._actions.showAdd(false);
    this._actions.showSearch(false);
    this._actions.showSave(true);

  }

  afterSave(item: TCRMEntity) {
    debugger
  }



  expandProperties() {


    if (this.propList == undefined) {
      
      this.propList = this._catList.asObservable();
      let cparams : TCRMEntity[] = new Array<TCRMEntity>();
      let p : TCRMEntity = new TCRMEntity();
      p.Name = 'prodId';
      p.Description = this.itemEdit.Id.toString();
      cparams.push(p);

      this._curService.loadCustomCatalogObs('Product/GetProperties', this.propList, cparams )
        .map((response) => response.json()).subscribe((data) => {
          this._catList.next(data);
        }, (error) => {
          this._loadingService.resolve('users.list');
          this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
        });
    }
  }


  getPropSorted(event) {

  }

}
