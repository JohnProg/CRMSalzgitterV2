import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CatalogService, IPChangeEventSorted } from '../services/catalog.service';
import { ConfigurationService } from '../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
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
  providers: [CatalogService, ConfigurationService],
})
export class BaseComponent implements OnInit, AfterViewInit, OnDestroy {


  private addEvent;
  private searchEvent;
  private deleteConfEvent;
  private saveEvent;

  private afterLoadEvent;
  private afterCreateEvent;
  private afterUpdateEvent;




  isSmallScreen: boolean = false;


  columns: ITdDataTableColumn[] = [
  ];


  entList: Observable< TCRMEntity[]>;
  itemEdit:  TCRMEntity;
  curIndex: number;
  isEditing: boolean;
  isEditing$: any;
  totalItems: number;
  totalItems$: any;
  catalogName: string;

  filteredData: any[];
  filteredTotal: number = 0;
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 0;
  pageSize: number = this._confs.pageSize;
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


    this.afterLoadEvent = this._curService.getAfterLoadEmitter().subscribe(item => this.afterLoadItem(item));
    this.afterCreateEvent = this._curService.afterCreateEmitter.subscribe(item => this.afterCreate(item));
    this.afterUpdateEvent = this._curService.afterUpdateEmitter.subscribe(item => this.afterUpdate(item));
    this.addColumns();
    this.addActionColumn();
    this.pageSize = this._confs.pageSize;

  }

  ngOnInit() {
    this.ngOnInitClass();
  }

  ngOnInitClass() {
    this.entList = <Observable<TCRMEntity[]>>this._curService.entList;
    
    this.initData();
  }


  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this._mediaService.broadcast();

    this.saveEvent = this._actions.saveItem().subscribe( (save) => {
       this.saveEntity();
    });

    this.addEvent = this._actions.addItem()
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


    this._actions.updateTitle(this.catalogName);
    this._actions.showAdd(true);
    this._actions.showSearch(true);
    this._actions.showSave(false);
    this._actions.showCancel(true);

  }

  ngOnDestroy() {

    if (this.addEvent !== undefined) { this.addEvent.unsubscribe(); }
    if (this.searchEvent !== undefined) { this.searchEvent.unsubscribe(); }
    if (this.deleteConfEvent !== undefined) { this.deleteConfEvent.unsubscribe(); }
    if (this.saveEvent !== undefined) { this.saveEvent.unsubscribe(); }

    if (this.afterLoadEvent !== undefined) { this.afterLoadEvent.unsubscribe(); }
    if (this.afterCreateEvent !== undefined) { this.afterCreateEvent.unsubscribe(); }
    if (this.afterUpdateEvent !== undefined) { this.afterUpdateEvent.unsubscribe(); }

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
    this.isEditing$ = this._curService.isEditing$.subscribe(status => {
      this.isEditing = status;
      this.reloadPaged('');
    });

    this.totalItems$ = this._curService.totalItems$.subscribe(total => {
      this.totalItems = total;
      
      this.isLoading = false;
    });

  }


  initEntity() {
    this.itemEdit = new  TCRMEntity();
  }

  submitForm(form) {

  }


  editEntity(id: number) {
    this._actions.updateTitle('Edit ' + this.catalogName);
    this.itemEdit = < TCRMEntity>this._curService.itemEdit;
    this._curService.load(id);
  }

  addEntity() {

    this._actions.updateTitle('Add ' + this.catalogName);
    this.initEntity();
    this.itemEdit.Id = 0;
    this._curService.changeState(true);
  }

  deleteEntity(id: number) {
    this._curService.remove(id);
  }

  cancelEdit(): void {
    this._actions.updateTitle(this.catalogName);
    this._curService.changeState(false);
  }


  saveEntity() {
    if (this.itemEdit.Id > 0) {
      this._curService.update(this.itemEdit);
    } else {
      this._curService.create(this.itemEdit);
    }
  }

  afterCreate(item: any) {

  }

  afterUpdate(item: any) {

    Object.assign(this.itemEdit, item.Data);
  }

  change(event: IPChangeEventSorted): void {
    
    if (event !== undefined) {
      this.currentPage = event.page - 1;
      this.pageSize = event.pageSize;
    }

      this.reloadPaged();
      //this._curService.getPaged(event);
    
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
      page: this.currentPage, pageSize: this.pageSize, sortBy: this.sortBy,
      sortType: this.sortType, sText: sText, maxPage: 0, total: 0, fromRow: 0, toRow: 0
    } as IPChangeEventSorted;
  }

  getSorted(sortEvent: ITdDataTableSortChangeEvent): void {
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
        page: this.currentPage, pageSize: this.pageSize, sortBy: this.sortBy,
        sortType: this.sortType, sText: sText, maxPage: 0, total: 0, fromRow: 0, toRow: 0
      } as IPChangeEventSorted;
      this.addParams(p);
      this._curService.getPaged(p);
    }
  }

  addParams(p: IPChangeEventSorted) {
  }

  afterLoadItem(itm:  TCRMEntity) {

  }






}
