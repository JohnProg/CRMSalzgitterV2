import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CatalogService, IPChangeEventSorted } from '../services/catalog.service';
import { ConfigurationService } from '../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { MdSnackBar } from '@angular/material';



import { TCRMEntity } from '../model/allmodels';
import { ActionsService } from '../services/actions.services';

@Component({
  selector: 'base-component',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [],
})
export class BaseComponent implements OnInit, AfterViewInit, OnDestroy {


  private addEvent;
  private searchEvent;
  private deleteConfEvent;
  private saveEvent;
  private editItemEvent;
  private screenSizeChangeEvent: Subscription;
  private cancelEditEvent;

  private afterLoadEvent;
  private afterCreateEvent;
  private afterUpdateEvent;
  

  pageChange: Subscription;
  isEditing: boolean;
  singleEditor: boolean = false;

  isSmallScreen: boolean = false;


  columns: ITdDataTableColumn[] = [
  ];


  entList: Observable< TCRMEntity[]>;
  itemEdit:  TCRMEntity;
  curIndex: number;
  totalItems: number;
  _totalItems: any;

  catalogName: string;

  filteredData: any[];
  filteredTotal: number = 0;
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 0;

  _pageSize: BehaviorSubject<number> = <BehaviorSubject<number>>new BehaviorSubject(this._confs.pageSize);
  pageSize: Observable<number> = this._pageSize.asObservable();
  __pageSize: Subscription;
  currentPageSize: number = 5;

  sortBy: string = 'Name';
  sortType: string = "ASC"
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  pagesArray: number[] = [5, 8, 10, 13, 20, 50, 100];

  emailTo: TCRMEntity[] =  [
    <TCRMEntity>{ Id: 1, Name: 'Internal' },
    <TCRMEntity>{ Id: 2, Name: 'Customer' },
    <TCRMEntity>{ Id: 3, Name: 'Both' }
  ];
  autoLoad: boolean = true;
  isLoading: boolean = false;

  constructor(public _curService: CatalogService, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone) {


    this.addColumns();
    this.addActionColumn();
    ;

  }

  ngOnInit() {
    this.screenSizeChangeEvent = this._actions.screenSizeChangeEvent.subscribe( (e: IPageChangeEvent) => {
        this.sreenChange(e);
    });

    this.__pageSize = this.pageSize.subscribe( (p: number) => {
         this.currentPageSize = p;
         this.reloadPaged();
    });
    this.ngOnInitClass();
  }

  ngOnInitClass() {
    this.entList = <Observable<TCRMEntity[]>>this._curService.entList;
    this.initData();
  }


  ngAfterViewInit(): void {
    
    // broadcast to all listener observables when loading the page
    //this._mediaService.broadcast();

    this.saveEvent = this._actions.saveItemEvent.subscribe( (save) => {
       this.saveEntity();
    });
    this.addEvent = this._actions.addItemEvent
      .subscribe((res) => {

        this.addEntity();
      },
      err => console.log(err),   //removed dot
      () => console.log('recived data') //removed dot                    
      );

    this.searchEvent = this._actions.searchEvent
      .subscribe((res) => {

        this.search(res);
      },
      err => console.log(err),   //removed dot
      () => console.log('recived data') //removed dot                    
      );

    this.deleteConfEvent = this._actions.deleteItemConfirmedEvent
      .subscribe((res) => {

        this.deleteConfirmed();
      },
      err => console.log(err),   //removed dot
      () => console.log('recived data') //removed dot
      );

    this.editItemEvent = this._actions.editItemEvent.subscribe( (id: number) => {
      this.editEntity(id);
    } )

    this.cancelEditEvent = this._actions.cancelEditEvent.subscribe( () => {
      this.cancelEdit();
    } );

      // Service events
    this.afterLoadEvent = this._curService.getAfterLoadEmitter().subscribe(item => this.afterLoadItem(item));
    this.afterCreateEvent = this._curService.afterCreateEmitter.subscribe(item => this.afterCreate(item));
    this.afterUpdateEvent = this._curService.afterUpdateEmitter.subscribe(item => this.afterUpdate(item));

    this._actions.updateTitle(this.catalogName);
    this._actions.showAdd(true);
    this._actions.showSearch(true);
    this._actions.showSave(false);
    this._actions.showCancel(false);



    this.afterViewInit();
  }


  afterViewInit() {}

  ngOnDestroy() {

    if (this.addEvent !== undefined) { this.addEvent.unsubscribe(); }
    if (this.searchEvent !== undefined) { this.searchEvent.unsubscribe(); }
    if (this.deleteConfEvent !== undefined) { this.deleteConfEvent.unsubscribe(); }
    if (this.saveEvent !== undefined) { this.saveEvent.unsubscribe(); }
    if (this.editItemEvent !== undefined) { this.editItemEvent.unsubscribe(); }
    if (this.screenSizeChangeEvent !== undefined) { this.screenSizeChangeEvent.unsubscribe(); }
    if (this.cancelEditEvent !== undefined) { this.cancelEditEvent.unsubscribe(); }
    if (this.afterLoadEvent !== undefined) { this.afterLoadEvent.unsubscribe(); }
    if (this.afterCreateEvent !== undefined) { this.afterCreateEvent.unsubscribe(); }
    if (this.afterUpdateEvent !== undefined) { this.afterUpdateEvent.unsubscribe(); }
    this._pageSize.unsubscribe();
    this.__pageSize.unsubscribe();
  }




  addColumns() {
    this.columns.push({ name: 'Name', label: 'Name', tooltip: '' });
    this.columns.push({ name: 'Description', label: 'Description' })
  }

  addActionColumn() {
    this.columns.push({ name: 'tActions', label: '' })
  }

  initData() {
    if (this.autoLoad === true) {
        this._curService.loadAll(this.getPageParams(''));
    }

    this.initEntity();
    this._totalItems = this._curService.totalItems.subscribe((total: number) => {
      this.totalItems = total;
      //this.isLoading = false;
    });

  }

  initEntity() {
    this.itemEdit = new  TCRMEntity();
  }

  submitForm(form) {}


  editEntity(id: number) {
    this._actions.updateTitle('Edit ' + this.catalogName);
    this.itemEdit = < TCRMEntity>this._curService.itemEdit;
    this._curService.load(id);
  }

  addEntity() {
    this._actions.updateTitle('Add ' + this.catalogName);
    this.initEntity();
    this.itemEdit.Id = 0;
    this.isEditing = true;
  }

  deleteEntity(id: number) {
    this._curService.remove(id);
  }

  cancelEdit(): void {
    this._actions.updateTitle(this.catalogName);
    this.isEditing = false;
  }


  saveEntity() {
    if (this.itemEdit.Id > 0) {
      this._curService.update(this.itemEdit);
    } else {
      this._curService.create(this.itemEdit);
    }
  }

  afterCreate(item: any) {
     this._actions.cancelEditEvent.emit();

     if( this.singleEditor === false) {
        this.isEditing = false;
        this._actions.cancelEdit();
     }
  }

  afterUpdate(item: any) {

    Object.assign(this.itemEdit, item.Data);
    if( this.singleEditor === false) {
        this.isEditing = false;
        this._actions.cancelEdit();
    }
  }

  change(event: IPChangeEventSorted): void {
    
    if (event !== undefined) {
      this.currentPage = event.page - 1;
      this._pageSize.next(event.pageSize);
      //this.reloadPaged();
    }


  }


  confirmDelete(item:  TCRMEntity) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit(item.Description);
  }

  deleteConfirmed() {

    this.deleteEntity(this.itemEdit.Id);
  }


  getPageParams(sText: string) : IPChangeEventSorted {
    return {
      page: this.currentPage, pageSize: this.currentPageSize, sortBy: this.sortBy,
      sortType: this.sortType, sText: sText, maxPage: 0, total: 0, fromRow: 0, toRow: 0
    } as IPChangeEventSorted;
  }

  getSorted(sortEvent: ITdDataTableSortChangeEvent): void {
    debugger
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.sortType = this.sortOrder.toString();
    
    this.reloadPaged();
  }


  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.currentPage = 0;
    
    this.reloadPaged(this.searchTerm);
  }

  page(pagingEvent: IPChangeEventSorted): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page - 1;
    //this.pageSize = pagingEvent.pageSize;
    this.reloadPaged();
  }

  reloadPaged(sText: string = undefined) {
    if( this.isLoading === false) {
      this.isLoading = true;
      let p = {
        page: this.currentPage, pageSize: this.currentPageSize, sortBy: this.sortBy,
        sortType: this.sortType, sText: sText, maxPage: 0, total: 0, fromRow: 0, toRow: 0
      } as IPChangeEventSorted;
      this.addParams(p);
      this._curService.getPaged(p);
    }
  }

  addParams(p: IPChangeEventSorted) {}

  afterLoadItem(itm:  TCRMEntity) {
     this.isEditing = true;
     this._actions.setEditItem();
  }

  sreenChange(e: IPageChangeEvent) {
    if (e !== undefined) {
      if( e.pageSize !== this.currentPageSize ) {
        this.isLoading = false;
        this.currentPage = e.page - 1;
        this._pageSize.next(e.pageSize);
      }
    }

  }


}
