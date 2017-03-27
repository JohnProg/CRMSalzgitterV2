import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone } from '@angular/core';
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
  providers: [CatalogService, ConfigurationService, ActionsService],
})
export class BaseComponent implements OnInit, AfterViewInit {


  private addEvent;
  private searchEvent;
  private deleteConfEvent;
  private saveEvent;
  protected _querySubscriptionxs: Subscription;
  protected _querySubscriptionsm: Subscription;
  protected _querySubscriptionmd: Subscription;
  protected _querySubscriptionlg: Subscription;

  isSmallScreen: boolean = false;


  columns: ITdDataTableColumn[] = [
  ];


  entList: Observable<TCRMEntity[]>;
  itemEdit: TCRMEntity;
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
  currentPage: number = 1;
  pageSize: number = this._confs.pageSize;
  sortBy: string = 'Name';
  sortType: string = "ASC"
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  pagesArray: number[] = [5, 8, 10, 13, 20, 50, 100];

  emailTo: TCRMEntity[] = <TCRMEntity[]>[
    { Id: 1, Name: 'Internal' },
    { Id: 2, Name: 'Customer' },
    { Id: 3, Name: 'Both' }
  ];
  autoLoad: boolean = true;

  private afterLoadEvent;
  private afterCreateEvent;
  private afterUpdateEvent;

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

    //this._actions.addItemEvent.unsubscribe()
    //this._actions.searchEvent.unsubscribe();
    //this._actions.deleteItemEvent.unsubscribe();
    if (this._querySubscriptionxs !== undefined) { this._querySubscriptionxs.unsubscribe(); }
    if (this._querySubscriptionsm !== undefined) { this._querySubscriptionsm.unsubscribe(); }
    if (this._querySubscriptionmd !== undefined) { this._querySubscriptionmd.unsubscribe(); }
    if (this._querySubscriptionlg !== undefined) { this._querySubscriptionlg.unsubscribe(); }


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
      //this.reloadPaged();
    }

    this.itemEdit = new TCRMEntity();
    this.isEditing$ = this._curService.isEditing$.subscribe(status => {
      this.isEditing = status;
    });

    this.totalItems$ = this._curService.totalItems$.subscribe(total => {
      this.totalItems = total;
    });
        this.watchScreen();
  }


  editEntity(id: number) {

    this._actions.updateTitle('Edit ' + this.catalogName);
    this.itemEdit = <TCRMEntity>this._curService.itemEdit;
    this._curService.load(id);
  }

  addEntity() {

    this._actions.updateTitle('Add ' + this.catalogName);
    this.itemEdit = new TCRMEntity();
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

  afterCreate(item: TCRMEntity) {
debugger
  }

  afterUpdate(item: TCRMEntity) {
debugger
  }

  change(event: IPChangeEventSorted): void {
    
    if (event !== undefined) {
      this.currentPage = event.page;
      this.pageSize = event.pageSize;
    }

      this.reloadPaged();
      //this._curService.getPaged(event);
    
  }


  confirmDelete(item: TCRMEntity) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit(item.Description);
  }

  deleteConfirmed() {

    this.deleteEntity(this.itemEdit.Id);
  }




  getSorted(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.sortType = this.sortOrder.toString();
    this.reloadPaged();
  }


  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.currentPage = 1;
    this.reloadPaged(this.searchTerm);
  }

  page(pagingEvent: IPChangeEventSorted): void {

    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    //this.pageSize = pagingEvent.pageSize;
    this.reloadPaged();
  }

  reloadPaged(sText: string = undefined) {

    let p = {
      page: this.currentPage, pageSize: this.pageSize, sortBy: this.sortBy,
      sortType: this.sortType, sText: sText, maxPage: 0, total: 0, fromRow: 0, toRow: 0
    } as IPChangeEventSorted;
    this.addParams(p);
    this._curService.getPaged(p);

  }

  addParams(p: IPChangeEventSorted) {
  }

  afterLoadItem(itm: TCRMEntity) {

  }


  checkScreen(): void {

    this._ngZone.run(() => {

      this.isSmallScreen = this._mediaService.query('sm'); // or '(min-width: 960px) and (max-width: 1279px)'
    });
  }

  watchScreen(): void {

    this._querySubscriptionxs = this._mediaService.registerQuery('xs').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isSmallScreen = matches;

        if (matches == true) {

          this.pageSize = 8;
          this.currentPage = 1;
          // this.change(undefined);
        }
      });
    });

    this._querySubscriptionsm = this._mediaService.registerQuery('sm').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isSmallScreen = matches;

        if (matches == true) {

          this.pageSize = 13;
          this.currentPage = 1;
          // this.change(undefined);
        }

      });
    });

    this._querySubscriptionmd = this._mediaService.registerQuery('md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isSmallScreen = matches;

        if (matches == true) {

          this.pageSize = 10;
          this.currentPage = 1;
          //this.change(undefined);
        }

      });
    });


    this._querySubscriptionlg = this._mediaService.registerQuery('gt-md').subscribe((matches: boolean) => {
      this._ngZone.run(() => {
        this.isSmallScreen = matches;

        if (matches == true) {

          this.pageSize = 13;
          this.currentPage = 1;
          //this.change(undefined);
        }

      });
    });


  }



}
