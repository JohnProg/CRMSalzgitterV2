import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, OnDestroy, Input } from '@angular/core';
import { Subscription ,  Observable ,  BehaviorSubject } from 'rxjs';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { NgForm } from '@angular/forms';
import { CatalogService, CRMQLQueries, IPChangeEventSorted, OnedrivegraphService, SharedataService } from '../services/index';
import { ConfigurationService } from '../services/configuration.service';
import {  IPageChangeEvent } from '@covalent/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';


import { TdLoadingService } from '@covalent/core/loading';
import { TdMediaService } from '@covalent/core/media';


import { MatSnackBar } from '@angular/material';

import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { TCRMEntity, Colony, Customer, MarketInputQL, GetStatusByDocType_Result, findActionOppByType_Result } from '../model';
import { IDeleteEventModel } from '../model/deleteeventmodel';
import { ActionsService } from '../services/actions.services';

import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AuthHelper } from '../authHelper/authHelper';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ICRMPageChangeEvent } from '../extensions';
import 'rxjs/add/operator/map';





@Component({
  selector: 'crm-component',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [],
})
export class BaseComponentQL implements OnInit, AfterViewInit, OnDestroy {

   

  optql: any;

  gQuery: any;
  private addEvent;
  private searchEvent;
  private deleteEvent;
  private deleteConfEvent;
  private saveEvent;
  private editItemEvent;
  private screenSizeChangeEvent: Subscription;
  private cancelEditEvent;
  private sendEmailEvent: Subscription;
  
  private showFilterPanelSubs: Subscription;

  private afterLoadEvent: Subscription;
  private afterCreateEvent: Subscription;
  private afterUpdateEvent: Subscription;
  private afterLoadAllEvent: Subscription;
  private afterDeleteEvent: Subscription;

  private onCreateErrorEvent: Subscription;
  private onUpdateErrorEvent: Subscription;
  private onDeleteErrorEvent: Subscription;

  onItemCreated: EventEmitter<TCRMEntity> = new EventEmitter<TCRMEntity>();
  onItemLoaded: EventEmitter<TCRMEntity> = new EventEmitter<TCRMEntity>();
  onItemUpdated: EventEmitter<TCRMEntity> = new EventEmitter<TCRMEntity>();
  onCancelEdit: EventEmitter<TCRMEntity> = new EventEmitter<any>();



  @ViewChild('editform') form: NgForm;

  screenSize: string;
  isXS: boolean = false;
  loadName: string = 'item.load';
  pageChange: Subscription;
  isEditing: boolean = false;
  singleEditor: boolean = false;
  setTitle: boolean = true;
  isSmallScreen: boolean = false;

  // currencyMask = cCurrencyMask;
  // floatPosMask = cFloatPosMask;
  subEditor: boolean = false;



  public dataStore: {
    entities: TCRMEntity[]
  };
  itemEdit: TCRMEntity;

  _entList: BehaviorSubject<TCRMEntity[]>;
  entList: Observable<any>;
   

  curIndex: number;
  showFilter: boolean = false;
  
  _totalItems: BehaviorSubject<number> = new BehaviorSubject(0);
  totalItems: Observable<number> = this._totalItems.asObservable();



  columns: ITdDataTableColumn[] = [
  ];


  @Input() catalogName: string;
  @Input() titleParam: string;
  filteredData: any[];
  filteredTotal: number = 0;
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 0;
  dataLoaded: boolean = false;


  tPageSize: number;
  pageSize: Observable<number>;

  sortBy: string = 'name';
  sortType: string = "ASC"
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  pagesArray: number[] = [5, 8, 10, 13, 20, 50, 100];

  fieldDelete: string = 'id';
  emailTo: TCRMEntity[] =  [
    <TCRMEntity>{ id: 1, name: 'Internal' },
    <TCRMEntity>{ id: 2, name: 'Customer' },
    <TCRMEntity>{ id: 3, name: 'Both' }
  ];
  autoLoad: boolean = true;
  isLoading: boolean = false;
  objId: string;
  handleScreenChange: boolean = true;
  autoHideFilterPanel: boolean = true;
  
  catCompanies: TCRMEntity[];
  catDocType: TCRMEntity[];
  catStatus: GetStatusByDocType_Result[];
  catResponsible: TCRMEntity[];
  catCustomer: Customer[];
  catCustomerContact: TCRMEntity[];
  catCurrencies: TCRMEntity[];
  catContact: TCRMEntity[];
  catUser: TCRMEntity[];
  catPort: TCRMEntity[];
  catIncoTerm: TCRMEntity[];
  catLinerTerm: TCRMEntity[];
  catMarket: TCRMEntity[];
  catSector: TCRMEntity[];
  catTransactionFlow: TCRMEntity[];
  catTypeOpp: TCRMEntity[];
  catMill: TCRMEntity[];
  catCountry: TCRMEntity[];
  catDocumentType: TCRMEntity[];
  catProduct: TCRMEntity[];
  catActionsOpp: findActionOppByType_Result[];
  catDeliveryPoint: TCRMEntity[];
  catOEM: TCRMEntity[];
  catPosition: TCRMEntity[];
  catColony: Colony[];
  catProperties: TCRMEntity[];

  catEMail: TCRMEntity[];
  constructor( public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: MatDialog,
    public _snackBarService: MatSnackBar,
    public _actions: ActionsService,
    public _mediaService: TdMediaService,
    public _ngZone: NgZone,
    public _http: Http, 
    public _tableService: TdDataTableService,
    public route: ActivatedRoute,
    public apollo: Apollo,
    public _router: Router,
    public _auth: AuthHelper,
    public _one: OnedrivegraphService,
    public _shared: SharedataService,
    public _crmqueries: CRMQLQueries
    ) {
    this.objId = this._actions.newGuid();
    this.dataStore = { entities: [] };
    this._entList = <BehaviorSubject<TCRMEntity[]>>new BehaviorSubject([]);
    this.entList =  this._entList.asObservable();
    
  }

  ngOnInit() {
    this.ngBeforeInit();
    this.pageSize = this._confs.pageSize;
    this.pageSize.subscribe( res => {
         this.tPageSize = res;
    });

    if( this.route.snapshot.data['catName'] !== undefined) {
      let catName = this.route.snapshot.data['catName'];
      this.catalogName = catName;
   }
   
   if( this.route.snapshot.data['optql'] !== undefined) {
     
    let cql = this.route.snapshot.data['optql'];
    this.optql = this._crmqueries[cql];
    }
   
    if ( this.handleScreenChange === true) {
      this.screenSizeChangeEvent = this._actions.screenSizeChangeEvent.subscribe( (e: ICRMPageChangeEvent) => {
          this.screenChange(e);
      });
    }

    //this.catalogName = 'Colony Type';
    //this._curService.setAPI('ColonyType/', this.catalogName);
    this.ngOnInitClass();
    this.loadCatalogs();
  }

  ngBeforeInit() {

  }

  ngOnInitClass() {
    this.addColumns();
    this.addActionColumn();
    this.initData();
  }

  loadCatalogs() {

  }
  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this._mediaService.broadcast();

    this.deleteConfEvent = this._actions.deleteItemConfirmedEvent
      .subscribe((e: IDeleteEventModel) => {
        this.deleteConfirmed(e);
      },
      err => console.log(err),   //removed dot
      () => console.log('recived data') //removed dot
      );

 
    this.updateTitle();


    if( this.subEditor == false) {
      this._actions.showAdd(true);
      this._actions.showSearch(true);
      this._actions.showSave(false);
      this._actions.showCancel(false);
      this._actions.showEmail(false);
      this._actions.showFilterButton(false);
          this.editItemEvent = this._actions.editItemEvent.subscribe( (id: number) => {
          this.editEntity(id);
        } )

        this.cancelEditEvent = this._actions.cancelEditEvent.subscribe( () => {
          this.cancelEdit();
        } );


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

    this.showFilterPanelSubs = this._actions.showFilterPanelEvent.subscribe( () => {
        this.showFilterPanel();
    });
    this.searchEvent = this._actions.searchEvent
      .subscribe((res) => {
        this.search(res);
      },
      err => console.log(err),   //removed dot
      () => console.log('recived data') //removed dot                    
      );

    }
    this.sendEmailEvent = this._actions.sendEmailEvent
    .subscribe((e: any) => {
      this.sendEmail();
    });

    this.afterViewInit();
  }

  updateTitle() {
    
    if (this.setTitle === true) {
      setTimeout( () => { 
        this._actions.updateTitle( { action: undefined, title: this.catalogName , tparam: this.titleParam}  );       
      }, 50);

    }
  }
  afterViewInit() {}

  ngOnDestroy() {

    if (this.addEvent !== undefined) { this.addEvent.unsubscribe(); }
    if (this.searchEvent !== undefined) { this.searchEvent.unsubscribe(); }
    if (this.deleteConfEvent !== undefined) { this.deleteConfEvent.unsubscribe(); }
    if (this.saveEvent !== undefined) { this.saveEvent.unsubscribe(); }
    if (this.editItemEvent !== undefined) { this.editItemEvent.unsubscribe(); }

    if (this.cancelEditEvent !== undefined) { this.cancelEditEvent.unsubscribe(); }

    if (this.sendEmailEvent !== undefined) { this.sendEmailEvent.unsubscribe(); }

    if (this.showFilterPanelSubs !== undefined) { this.showFilterPanelSubs.unsubscribe(); }
    
    if ( this.handleScreenChange === true) {
        if (this.screenSizeChangeEvent !== undefined) { this.screenSizeChangeEvent.unsubscribe(); }
    }

    this.onDestroy();
  }

  onDestroy() {}


  addColumns() {
    
    this.columns.push({ name: 'name', label: 'Name', tooltip: '' });
    this.columns.push({ name: 'description', label: 'Description' });
  }

  addActionColumn() {
    this.columns.push({ name: 'tActions', label: '', width: 120 });
  }


  initData() {
    if (this.autoLoad === true) {
        this.loadData();
    }
    this.initEntity();
  }

  loadData() {
    
      if ( this.isLoading === false ) {
        
        if ( this.dataLoaded === true ) {
          this.reloadPaged();
        } else {
          this.isLoading = true;
          this.loadFromServer();
          this.dataLoaded = true;
        }
      }
  }


  loadFromServer() {


   this.apollo.query({
        query: this.optql.loadql,
        variables: this.getLoadParams()
    })    .subscribe(({data}) => {
      
      this.dataStore.entities = data[this.optql.listName];
      //this._entList.next(this.dataStore.entities);

      this._totalItems.next(this.dataStore.entities.length);
      this.afterLoadAll(this.dataStore.entities);
      this.isLoading = false;
      
      this.reloadPaged();
    });

    
  }

  getLoadParams() : any {
     return {};
  }
   
  initEntity() {
    this.itemEdit = new TCRMEntity();
  }




  editEntity(id: number) {
    if(this.setTitle === true) {

        this._actions.updateTitle( { action: 'Edit', title: this.catalogName, tparam: this.titleParam} );

    }
    this.apollo.query({
      query: this.optql.loadentity,
      variables: { sid: id }
      })
      .subscribe(({data}) => {
        this.afterLoadItem(data[this.optql.singleName]);
      });
  }

  addEntity() {
    
    if (this.setTitle === true) {
        this._actions.updateTitle( { action: 'Add', title: this.catalogName , tparam: this.titleParam} );
    }
    this.initEntity();
    this.itemEdit.id = 0;
    this.isEditing = true;
    this._actions.setEdit({ isChild: this.singleEditor });
  }

  deleteEntity(id: number) {
    //this._curService.remove(id);
    
if( id > 0) {
    this.apollo.mutate({
      mutation: this.optql.delete,
      variables: { evalue: id },
      //update: (store,  { data: { savemarket } }) => {
      update: (store, { data: deletemdata }  ) => {
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: this.optql.loadql });
        let mdata = data[this.optql.listName];
        // Add our comment from the mutation to the end.
          let t = mdata.findIndex( o => o.id == deletemdata[this.optql.deleteName].id);
          if( t >= 0) {
             mdata.splice(t, 1);
          }

        this.dataStore.entities = mdata;
        this._entList.next(this.dataStore.entities);
        // Write our data back to the cache.
        store.writeQuery({ query: this.optql.loadql, data });
        this.afterDelete(null);
      }
      })
      .subscribe();
    }
  }

  cancelEdit(): void {
    if(this.setTitle === true) {
      this._actions.updateTitle({ action: undefined, title: this.catalogName , tparam: this.titleParam});
    }
    this.isEditing = false;
    this.onCancelEdit.emit(undefined);
  }

  submitForm(form) {

    if ( form.valid &&  this.beforeSave() === true) {
      this.performSave(this.itemEdit);

    } else {
      this._snackBarService.open('There are some errors, please review data ', 'Ok');
    }
  }

  performSave(item: any) {
    
    this.apollo.mutate({
      mutation: this.optql.mutation,
      variables: { evalue: item },
      //update: (store,  { data: { savemarket } }) => {
      update: (store, { data: savemdata }  ) => {
        debugger
        // Read the data from our cache for this query.
        const data = store.readQuery({ query: this.optql.loadql });
        let mdata = data[this.optql.listName];
        // Add our comment from the mutation to the end.
        

        if( item.id > 0) {
          let t = mdata.filter( o => o.id == savemdata[this.optql.saveName].id)[0];
          Object.assign(t, item);
        } else {
          this.itemEdit  =  savemdata[this.optql.saveName];
          mdata.push(this.itemEdit);
        }
        this.dataStore.entities = mdata;
        this._entList.next(this.dataStore.entities);
        // Write our data back to the cache.
        store.writeQuery({ query: this.optql.loadql, data });
        if( item.id > 0 ) {
          this.afterUpdate(data);
        } else {
          this.afterCreate(data);
        }

      }
      })
      .subscribe();

  }

  beforeSave(): boolean {
    return true;
  }

  saveEntity() {
    
    this.form.ngSubmit.emit(this.form);
  }

  afterCreate(item: any) {
    
    this.itemEdit.id = item['createmarket']['id'];
    
    if(this.singleEditor === false) {
      this._actions.cancelEditEvent.emit();
      this.isEditing = false;
      this._actions.cancelEdit();
    }

     this.onItemCreated.emit(this.itemEdit);
    //this._curService.assignList(item.items);
  }

  afterUpdate(item: any) {

    if( this.singleEditor === false) {
        this.isEditing = false;
        this._actions.cancelEdit();
    }
    this.onItemUpdated.emit(this.itemEdit);
  }

  afterDelete(item: any) {
  //  this.reloadPaged(undefined);
    
  }


  change(event: IPChangeEventSorted): void {
    if (event !== undefined  ) {
      
      this.currentPage = event.page - 1;
      //this.pageSize = event.pageSize;
      //this._confs._pageSize.next(5); //= this.pageSize;
      this.loadData();
    }
  }
  


  confirmDelete(item:  TCRMEntity) {
    this.itemEdit = item;
    this._actions.deleteItemEvent.emit( { title: item.description || item.name || item[this.fieldDelete], objId: this.objId } );
  }

  deleteConfirmed(e: IDeleteEventModel) {
    if( e.objId === this.objId) {
      this.deleteEntity(this.itemEdit.id);
    }
  }


  getPageParams(sText: string) : IPChangeEventSorted {
    return {
      page: this.currentPage, pageSize: this.tPageSize, sortBy: this.sortBy,
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
        page: this.currentPage, pageSize: this.tPageSize, sortBy: this.sortBy,
        sortType: this.sortType, sText: sText, maxPage: 0, total: 0, fromRow: 0, toRow: 0
      } as IPChangeEventSorted;
      this.addParams(p);
      this.getPaged(p);
    }
  }


  getPaged(p: IPChangeEventSorted) {

    let index = (p.page * p.pageSize) + 1;
    let t = this.dataStore.entities;
    if( p.sText != undefined && p.sText.length > 0 ) {
       t = this._tableService.filterData(t, p.sText, true); 
    }
    t = this._tableService.sortData(t, p.sortBy, p.sortType == 'ASC' ? TdDataTableSortingOrder.Ascending : TdDataTableSortingOrder.Descending );
    t = this._tableService.pageData(t, index , --index + p.pageSize);    
    this._entList.next(t);

  }
  addParams(p: IPChangeEventSorted) {}

  afterLoadItem(itm:  TCRMEntity) {
     this.isEditing = true;
     Object.assign(this.itemEdit, itm);
     delete this.itemEdit['__typename'];
     this._actions.setEdit({ isChild: this.singleEditor });
     this.onItemLoaded.emit(itm);
     
  }

  screenChange(e: ICRMPageChangeEvent) {
    if (e !== undefined) {
      this.screenSize = e.screenSize;
      this.isXS = this.screenSize == 'xs';
      // if ( e.pageSize !== this.pageSize ) {
      //   this.pageSize = e.pageSize;
      // }
    }

  }

  onCreateError(error) {
    this._snackBarService.open(' Could not create ' + this.catalogName + ', error: ' + error.message, 'Ok');
  }
  
  onUpdateError(error) {
    this._snackBarService.open(' Could not update ' + this.catalogName + ', error: ' + error.message, 'Ok');
  }

  onDeleteError(error) {
    this._snackBarService.open(' Could not delete ' + this.catalogName + ', error: ' + error.message, 'Ok');
  }


  afterLoadAll(itms: TCRMEntity[]) {
    this.isLoading = false;
  }

  sendEmail() {
    
  }

  loadCustomerContact(idcust: number) {
   this.apollo.query( {
     query: this._crmqueries.findCustCatalogsQl, 
     variables: { custid: idcust }
   })
    .subscribe(({data}) => {
      this.catCustomerContact = data['findCustomerContacts'];
      this.catDeliveryPoint = data['findDeliveryPoint'];
     
      this.afterLoadCustomerContact(data);
    }, (error: Error) => {
      debugger
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    }
    );
  }

  afterLoadCustomerContact(data: any) {

  }
  loadCountryOrigin(idmill: number) {
   this.apollo.query( {
        query: this._crmqueries['country'].loadql,
        variables: { idmill: idmill }
   })
    .subscribe(({data}) => {
      
      this.catCountry = data[this._crmqueries['country'].listName];
      this.afterLoadCountry();
    }, (error: Error) => {
      debugger
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    }
    );
  }

  afterLoadCountry() {

  }

  cleanMaskModel(val) {
    let t = val.replace('$', '');
    t = t.replace('%', '');
    t = t.replace(',', '');
    return t;
  }

  checkOneDriveToken() {
    let t = this._confs.oneDriveToken;
    let today = moment();
    if( t == undefined ) {
      this._auth.login();
      return false;
    } else if(  today >= moment(t['expire_date'])  ) {
      this._auth.login();
      return false;
    }
    return true;
  }

  removeSpeciaCharacters(t: string) {
    if( t != '' && t != undefined) {
       return t.replace(/[^A-Z0-9]+/ig, "");
    }
    return '';
  }

  getTax() {
    let tax : number = 0;
    if( this.catCompanies != undefined && this.catCompanies.length > 0) {
      tax = this.catCompanies[0]['taxAmount'];
    }
    return tax;
  }

  showFilterPanel() {
    
    this.showFilter = !this.showFilter;
  }
}
