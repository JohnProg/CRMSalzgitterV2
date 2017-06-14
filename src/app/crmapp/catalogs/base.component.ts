import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { NgForm } from '@angular/forms';
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
import {TranslateService} from '@ngx-translate/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { TCRMEntity } from '../model/index';
import { IDeleteEventModel } from '../model/deleteeventmodel';
import { ActionsService } from '../services/actions.services';

import createNumberMask from 'text-mask-addons/dist/createNumberMask'


export const cCurrencyMask = createNumberMask({
      allowDecimal: true
    });

  // Allow float greather o equal to 0
export const cFloatPosMask = createNumberMask({
      prefix: '',
      suffix: '', // This will put the dollar sign at the end, with a space.
      allowDecimal: true
    });




@Component({
  selector: 'crm-component',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [],
})
export class BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  
  private addEvent;
  private searchEvent;
  private deleteEvent;
  private deleteConfEvent;
  private saveEvent;
  private editItemEvent;
  private screenSizeChangeEvent: Subscription;
  private cancelEditEvent;
  private sendEmailEvent: Subscription;

  private afterLoadEvent: Subscription;
  private afterCreateEvent: Subscription;
  private afterUpdateEvent: Subscription;
  private afterLoadAllEvent: Subscription;
  private afterDeleteEvent: Subscription;

  onItemCreated: EventEmitter<TCRMEntity> = new EventEmitter<TCRMEntity>();
  @ViewChild('editform') form: NgForm;

  pageChange: Subscription;
  isEditing: boolean = false;
  singleEditor: boolean = false;
  setTitle: boolean = true;
  isSmallScreen: boolean = false;

  currencyMask = cCurrencyMask;
  floatPosMask = cFloatPosMask;
  
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
  dataLoaded: boolean = false;

  pageSize: number = 5;

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
  objId: string;
   _curService: CatalogService;
  handleScreenChange: boolean = true;
  constructor( public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone,
    public _http: Http, 
    public _tableService: TdDataTableService,
    public translate: TranslateService,
    public route: ActivatedRoute
    ) {
    this._curService = new CatalogService(_http, _confs, _loadingService, 
                       _dialogService,_snackBarService, _tableService);
    this.addColumns();
    this.addActionColumn();
    this.pageSize = this._confs.pageSize;
    this.objId = this._actions.newGuid();
  }

  ngOnInit() {

    if( this.route.snapshot.data['baseapi'] !== undefined ) {
      let baseapi = this.route.snapshot.data['baseapi'];
      this._curService.setAPI(baseapi + '/', this.catalogName);
    }
    if( this.route.snapshot.data['catName'] !== undefined) {
       let catName = this.route.snapshot.data['catName'];
       this.catalogName = catName;
    }


    if ( this.handleScreenChange === true) {
      this.screenSizeChangeEvent = this._actions.screenSizeChangeEvent.subscribe( (e: IPageChangeEvent) => {
         // this.screenChange(e);
      });
    }

    //this.catalogName = 'Colony Type';
    //this._curService.setAPI('ColonyType/', this.catalogName);
    this.ngOnInitClass();
  }

  ngOnInitClass() {
    this.entList = <Observable<TCRMEntity[]>>this._curService.entList;
    this.initData();
  }


  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this._mediaService.broadcast();

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
      .subscribe((res: string) => {
        this.deleteConfirmed(res);
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
    this.afterLoadAllEvent = this._curService.afterLoadAllEvent.subscribe(item => this.afterLoadAll(item));
    this.afterDeleteEvent = this._curService.afterDeleteEmitter.subscribe(item => this.afterDelete(item));

    if (this.setTitle === true) {
       this._actions.updateTitle(this.catalogName);
    }
    this._actions.showAdd(true);
    this._actions.showSearch(true);
    this._actions.showSave(false);
    this._actions.showCancel(false);
    this._actions.showEmail(false);
    this.sendEmailEvent = this._actions.sendEmailEvent
    .subscribe((e: any) => {
      this.sendEmail();
    });

    this.afterViewInit();
  }

  afterViewInit() {}

  ngOnDestroy() {

    if (this.addEvent !== undefined) { this.addEvent.unsubscribe(); }
    if (this.searchEvent !== undefined) { this.searchEvent.unsubscribe(); }
    if (this.deleteConfEvent !== undefined) { this.deleteConfEvent.unsubscribe(); }
    if (this.saveEvent !== undefined) { this.saveEvent.unsubscribe(); }
    if (this.editItemEvent !== undefined) { this.editItemEvent.unsubscribe(); }

    if (this.cancelEditEvent !== undefined) { this.cancelEditEvent.unsubscribe(); }
    if (this.afterLoadEvent !== undefined) { this.afterLoadEvent.unsubscribe(); }
    if (this.afterCreateEvent !== undefined) { this.afterCreateEvent.unsubscribe(); }
    if (this.afterUpdateEvent !== undefined) { this.afterUpdateEvent.unsubscribe(); }
    if (this.afterLoadAllEvent !== undefined) { this.afterLoadAllEvent.unsubscribe(); }
    if (this.sendEmailEvent !== undefined) { this.sendEmailEvent.unsubscribe(); }
    if (this.afterDeleteEvent !== undefined) { this.afterDeleteEvent.unsubscribe(); }



    if (this._totalItems !== undefined) { this._totalItems.unsubscribe(); }
    if ( this.handleScreenChange === true) {
        if (this.screenSizeChangeEvent !== undefined) { this.screenSizeChangeEvent.unsubscribe(); }
    }

    this.onDestroy();
  }

  onDestroy() {}


  addColumns() {
    this.columns.push({ name: 'Name', label: 'Name', tooltip: '' });
    this.columns.push({ name: 'Description', label: 'Description' });
  }

  addActionColumn() {
    this.columns.push({ name: 'tActions', label: '' });
  }

  initData() {
    if (this.autoLoad === true) {
        this.loadData();
    }
    this._totalItems = this._curService.totalItems.subscribe((total: number) => {
      this.totalItems = total;
    });
    this.initEntity();

  }

  loadData() {
      if ( this.isLoading === false ) {

        if ( this.dataLoaded === true ) {
          this.reloadPaged();
        } else {
          this._curService.loadAll(this.getPageParams(''));
          this.dataLoaded = true;
        }
      }
  }

  initEntity() {
    this.itemEdit = new  TCRMEntity();
  }




  editEntity(id: number) {
    if(this.setTitle === true) {
      this.translate.get('EDITCAT', {value: this.catalogName}).subscribe( (str: string) => {
        this._actions.updateTitle( str );
      });
    }
    
    this._curService.load(id);
  }

  addEntity() {
    if (this.setTitle === true) {

     this.translate.get('ADDCAT', {value: this.catalogName}).subscribe( (str: string) => {
        this._actions.updateTitle( str );
      });
    }
    this.initEntity();
    this.itemEdit.Id = 0;
    this.isEditing = true;
    this._actions.setEdit();
  }

  deleteEntity(id: number) {
    this._curService.remove(id);
  }

  cancelEdit(): void {
    if(this.setTitle === true) {
      this._actions.updateTitle(this.catalogName);
    }
    this.isEditing = false;
  }

  submitForm(form) {
    if ( form.valid &&  this.beforeSave() === true) {
      if (this.itemEdit.Id > 0) {
        this._curService.update(this.itemEdit);
      } else {
        this._curService.create(this.itemEdit);
      }
    } else {
      this._snackBarService.open('There are some errors, please review data ', 'Ok');
    }
  }

  beforeSave(): boolean {
    return true;
  }

  saveEntity() {
    this.form.ngSubmit.emit(this.form);
  }

  afterCreate(item: any) {
    Object.assign(this.itemEdit, item.item);
    if(this.singleEditor === false) {
      this._actions.cancelEditEvent.emit();
      this.isEditing = false;
      this._actions.cancelEdit();

    }
     this.onItemCreated.emit(item);
    //this._curService.assignList(item.items);
  }

  afterUpdate(item: any) {

    Object.assign(this.itemEdit, item.item);
    if( this.singleEditor === false) {
        this.isEditing = false;
        this._actions.cancelEdit();
    }
    //this._curService.assignList(item.items);
  }

  afterDelete(item: any) {}


  change(event: IPChangeEventSorted): void {
    if (event !== undefined  ) {
      this.currentPage = event.page - 1;
      this.pageSize = event.pageSize;
      this._confs.pageSize = this.pageSize;
      this.loadData();
    }
  }

  confirmDelete(item:  TCRMEntity) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit( (<IDeleteEventModel>{ title: item.Description || item.Name, objId: this.objId }) );
  }

  deleteConfirmed(res: string) {
    if( res === this.objId) {
      this.deleteEntity(this.itemEdit.Id);
    }
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
    if( this.isLoading === false && this.singleEditor === false) {
      //this.isLoading = true;
      let p = {
        page: this.currentPage, pageSize: this.pageSize, sortBy: this.sortBy,
        sortType: this.sortType, sText: sText, maxPage: 0, total: 0, fromRow: 0, toRow: 0
      } as IPChangeEventSorted;
      this.addParams(p);
      this._curService.getPaged(p);
    }
  }

  addParams(p: IPChangeEventSorted) {}

  afterLoadItem(itm:  TCRMEntity) {
     this.isEditing = true;
     this.itemEdit = itm;
     this._actions.setEdit();
  }

  screenChange(e: IPageChangeEvent) {
    if (e !== undefined) {
      if ( e.pageSize !== this.pageSize ) {

        this.pageSize = e.pageSize;
      }
    }

  }

  afterLoadAll(itms: TCRMEntity[]) {
    this.isLoading = false;

  }

  sendEmail() {
    
  }


  cleanMaskModel(val) {
    let t = val.replace('$', '');
    t = t.replace('%', '');
    t = t.replace(',', '');
    return t;
  }

}
