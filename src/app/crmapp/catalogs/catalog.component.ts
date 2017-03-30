import { Component, AfterViewInit, OnInit, ViewChild, ContentChild } from '@angular/core';
import { Title } from '@angular/platform-browser';


import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import { ActionsService } from '../services/actions.services';
import { CurrencyComponent } from './currency/currency.component';

import { MenuClass } from '../model/menuclass';



@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [ActionsService]
})
export class CatalogComponent implements OnInit, AfterViewInit {

  catalogTitle: string;
  deleteDescription: string;
  showSearch: boolean = true;
  showAdd: boolean = true;
  showCancel: boolean = true;
  showSave: boolean = false;
  showSideNav: boolean = true;
  


  catalogs : MenuClass[] =  [
     
  ];


  constructor(
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public media: TdMediaService,
    public _actions: ActionsService) {


  }

  ngOnInit() {
  }


  ngAfterViewInit(): void {

    this.media.broadcast();
    this._actions.updateTitleEvent
      .subscribe((res) => {
        this.catalogTitle = res;
      });
    this._actions.deleteItemEvent
      .subscribe((res) => {
        this.deleteItem(res);
      });


    this._actions.showSearchEvent
      .subscribe((res) => {
        this.showSearch = res;
      });

    this._actions.showAddEvent
      .subscribe((res) => {
        
        this.showAdd = res;
      });
    this._actions.showSaveEvent
      .subscribe((res) => {
        this.showSave = res;
      });

    this._actions.showCancelEvent
      .subscribe((res) => {
        this.showCancel = res;
      });

    this._actions.showSideNavEvent
      .subscribe((res) => {
        this.showSideNav = res;
      });


  }

  saveItem() {
    this._actions.saveItem().emit() 
  }
  addItem() {
    this._actions.addItem().emit();
  }

  editItem() {
    this._actions.editItem().emit();
  }

  search(atext) {
    this._actions.search(atext);
  }

  deleteItem(deleteDesc) {

    this._dialogService
      .openConfirm({ message: 'Are you sure you want to delete ' + deleteDesc + '?' })
      .afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          this._loadingService.register('users.list');
          this.deleteConfirmed();
        }
      });

  }

  deleteConfirmed() {
    this._actions.deleteItemConfirmedEvent.emit();
  }




}
