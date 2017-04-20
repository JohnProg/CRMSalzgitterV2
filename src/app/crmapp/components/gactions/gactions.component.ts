import { Component, AfterViewInit, OnInit, ViewChild, ContentChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';


import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import { ActionsService } from '../../services/actions.services';

import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'crm-gactions',
  templateUrl: './gactions.component.html',
  styleUrls: ['./gactions.component.scss']
})
export class GenericActionsComponent implements OnInit, AfterViewInit, OnDestroy {


  // private addEvent;
  // private searchEvent;
  // private saveEvent;
  
  private cancelEditEvent: Subscription;

  private screenSizeChangeEvent: Subscription;
  private updateTitleEvent: Subscription;
  private showSearchEvent: Subscription;
  private showAddEvent: Subscription;
  private showSaveEvent: Subscription;
  private showCancelEvent: Subscription;
  private showSideNavEvent: Subscription;


  catalogTitle: string;
  deleteDescription: string;
  showSearch: boolean = true;
  showAdd: boolean = true;
  showCancel: boolean = true;
  showSave: boolean = false;
  showSideNav: boolean = true;


  constructor(    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public media: TdMediaService,
    public _actions: ActionsService) { }


  ngOnInit() : void {

    this.updateTitleEvent = this._actions.updateTitleEvent
      .subscribe((res) => {
        this.catalogTitle = res;
      });


    this.showSearchEvent = this._actions.showSearchEvent
      .subscribe((res) => {
        this.showSearch = res;
      });

    this.showAddEvent = this._actions.showAddEvent
      .subscribe((res) => {
        this.showAdd = res;
      });
    this.showSaveEvent = this._actions.showSaveEvent
      .subscribe((res) => {
        this.showSave = res;
      });

    this.showCancelEvent = this._actions.showCancelEvent
      .subscribe((res) => {
        this.showCancel = res;
      });

    this.showSideNavEvent = this._actions.showSideNavEvent
      .subscribe((res) => {
        this.showSideNav = res;
      });

    this.screenSizeChangeEvent = this._actions.screenSizeChangeEvent
      .subscribe((e: any) => {
        this.screenSizeChange(e);
      });

    this.cancelEditEvent = this._actions.cancelEditEvent
      .subscribe((e: any) => {
        this.cancelEdition();
      });


    this.afterInit();
  }

  afterInit(): void {}

  ngAfterViewInit(): void {
    this.media.broadcast();
  }

  ngOnDestroy(): void {
    if (this.updateTitleEvent !== undefined) { this.updateTitleEvent.unsubscribe(); }
    if (this.showSearchEvent !== undefined) { this.showSearchEvent.unsubscribe(); }
    if (this.showAddEvent !== undefined) { this.showAddEvent.unsubscribe(); }
    if (this.showSaveEvent !== undefined) { this.showSaveEvent.unsubscribe(); }
    if (this.showCancelEvent !== undefined) { this.showCancelEvent.unsubscribe(); }
    if (this.showSideNavEvent !== undefined) { this.showSideNavEvent.unsubscribe(); }
    if (this.screenSizeChangeEvent !== undefined) { this.screenSizeChangeEvent.unsubscribe(); }
    if (this.cancelEditEvent !== undefined) { this.cancelEditEvent.unsubscribe(); }
  }



  saveItem() {
    this._actions.saveItemEvent.emit();
  }
  addItem() {
    this.showSave = true;
    this.showAdd = false;
    this.showSearch = false;
    this._actions.addItemEvent.emit();
  }

  editItem() {
    this._actions.editItemEvent.emit();
  }

  search(atext: string) {
    this._actions.search(atext);
  }

  deleteItem(deleteDesc: string) {

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

  cancelEdit() {
    this._actions.cancelEditEvent.emit();
    this.cancelEdition();
  }

  cancelEdition() {
    this.showSave = false;
    this.showAdd = true;
    this.showSearch = true;;
  }


  screenSizeChange(e: any) {

  }
}
