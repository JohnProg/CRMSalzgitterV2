import { Component, AfterViewInit, OnInit, Input, ViewChild, ContentChild, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { MdSnackBar } from '@angular/material';
import { ActionsService } from '../../services/actions.services';
import { Subscription } from 'rxjs/Subscription';
import { IDeleteEventModel } from '../../model/deleteeventmodel';
@Component({
  selector: 'crm-gactions',
  templateUrl: './gactions.component.html',
  styleUrls: ['./gactions.component.scss']
})
export class GenericActionsComponent implements OnInit, AfterViewInit, OnDestroy {


  @Input() inpuParam1: any = '';;
  // private addEvent;
  // private searchEvent;
  // private saveEvent;editItemEvent
  private editItemEvent: Subscription;
  private setEditEvent: Subscription;
  private cancelEditEvent: Subscription;
  private deleteItemEvent: Subscription;

  private screenSizeChangeEvent: Subscription;
  private updateTitleEvent: Subscription;
  private showSearchEvent: Subscription;
  private showAddEvent: Subscription;
  private showSaveEvent: Subscription;
  private showCancelEvent: Subscription;
  private showSideNavEvent: Subscription;
 

  private showEmailEvent: Subscription;


  
  catalogTitle: string;
  deleteDescription: string;
  showSearch: boolean = true;
  showAdd: boolean = true;
  showCancel: boolean = true;
  showSave: boolean = false;
  showSideNav: boolean = true;
  showCancelEdit: boolean = true;
  showEMail: boolean = false;
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

    this.setEditEvent = this._actions.setEditEvent
      .subscribe((e: any) => {
        this.setEdit(e);
      });

    this.deleteItemEvent = this._actions.deleteItemEvent
      .subscribe((e: IDeleteEventModel) => {
        
        this.deleteItem(e);
      });




    this.showEmailEvent = this._actions.showEmailEvent
      .subscribe((e: boolean) => {
        this.showEMail = e;
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
    if (this.editItemEvent !== undefined) { this.editItemEvent.unsubscribe(); }
    if (this.deleteItemEvent !== undefined) { this.deleteItemEvent.unsubscribe(); }
    if (this.setEditEvent !== undefined) { this.setEditEvent.unsubscribe(); }

  }



  private saveItem() {
    this._actions.saveItemEvent.emit();
  }

  private addItem() {
    this.showSave = true;
    this.showAdd = false;
    this.showSearch = false;
    this.showCancel = true;
    this._actions.addItemEvent.emit();
  }

  private setEdit(e: any) {
    
    this.showSave = true;
    this.showAdd = false;
    this.showSearch = false;
    if( e == undefined || ( e.isChild != undefined && e.isChild == false) ) {
       this.showCancel = true;
    }
  }

  private search(atext: string): void {
    
    this._actions.search(atext);
  }

  private deleteItem(e: IDeleteEventModel): void {
    
    this._dialogService
      .openConfirm({ message: 'Are you sure you want to delete ' + e.title + '?' })
      .afterClosed().subscribe((confirm: boolean) => {
        if (confirm) {
          this._loadingService.register('users.list');
          this.deleteConfirmed(e);
        }
      });
  }

  private deleteConfirmed(e: IDeleteEventModel) {
    this._actions.deleteItemConfirmedEvent.emit(e);
  }

  private cancelEdit() {
    this._actions.cancelEditEvent.emit();
    this.cancelEdition();
  }

  private cancelEdition() {
    this.showSave = false;
    this.showAdd = true;
    this.showSearch = true;;
    this.showCancel = false;
  }


  private screenSizeChange(e: any) {

  }

  private sendEmail() {
    this._actions.sendEMail();
  }



}
