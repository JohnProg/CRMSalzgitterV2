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


export class MenuClass {
       name: string;
       tooltip: string;
       active: boolean;
       routerlink: string;
       icon: string;
       displayName: string;
}


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
  showSave: boolean = true;
  showSideNav: boolean = true;



  catalogs : MenuClass[] =  [
     {
       name: 'currency',
       tooltip: 'Create edit Currencies',
       active: true,
       routerlink: 'currency',
       icon: 'euro_symbol',
       displayName: 'Currency',
     },
     {
       name: 'colonytype',
       tooltip: 'Create edit Colonies Type',
       active: true,
       routerlink: 'colonytype',
       icon: 'euro_symbol',
       displayName: 'Colony Type',
     },
     {
       name: 'country',
       tooltip: 'Create edit Countries',
       active: true,
       routerlink: 'country',
       icon: 'euro_symbol',
       displayName: 'Countries',
     },
     {
       name: 'department',
       tooltip: 'Create edit Departments',
       active: true,
       routerlink: 'department',
       icon: 'euro_symbol',
       displayName: 'Departments',
     },
     {
       name: 'documenttype',
       tooltip: 'Create edit Document Type',
       active: true,
       routerlink: 'documenttype',
       icon: 'euro_symbol',
       displayName: 'Document Type',
     },
     {
       name: 'family',
       tooltip: 'Create edit Families',
       active: true,
       routerlink: 'family',
       icon: 'euro_symbol',
       displayName: 'Families',
     }, 
     {
       name: 'linerterm',
       tooltip: 'Create edit Liner Term',
       active: true,
       routerlink: 'linerterm',
       icon: 'euro_symbol',
       displayName: 'Liner Term',
     }, 
     {
       name: 'market',
       tooltip: 'Create edit Market',
       active: true,
       routerlink: 'market',
       icon: 'euro_symbol',
       displayName: 'Market',
     },   
     {
       name: 'mill',
       tooltip: 'Create edit Mills',
       active: true,
       routerlink: 'mill',
       icon: 'euro_symbol',
       displayName: 'Mills',
     }, 
     {
       name: 'organization',
       tooltip: 'Create edit Organization',
       active: true,
       routerlink: 'organization',
       icon: 'euro_symbol',
       displayName: 'Organization',
     }, 
     {
       name: 'paymentterm',
       tooltip: 'Create edit Payment Term',
       active: true,
       routerlink: 'paymentterm',
       icon: 'euro_symbol',
       displayName: 'Payment Term',
     }, 
     {
       name: 'port',
       tooltip: 'Create edit Port',
       active: true,
       routerlink: 'port',
       icon: 'euro_symbol',
       displayName: 'Port',
     }, 
     {
       name: 'position',
       tooltip: 'Create edit Position',
       active: true,
       routerlink: 'position',
       icon: 'euro_symbol',
       displayName: 'Position',
     }, 
     {
       name: 'sector',
       tooltip: 'Create edit Sector',
       active: true,
       routerlink: 'sector',
       icon: 'euro_symbol',
       displayName: 'Sector',
     }, 
     {
       name: 'tender',
       tooltip: 'Create edit Tender',
       active: true,
       routerlink: 'tender',
       icon: 'euro_symbol',
       displayName: 'Tender',
     },      
     {
       name: 'tender',
       tooltip: 'Create edit Tender',
       active: true,
       routerlink: 'tender',
       icon: 'euro_symbol',
       displayName: 'Tender',
     }, 
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
