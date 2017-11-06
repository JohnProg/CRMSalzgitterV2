import { Component, OnInit, AfterViewInit, EventEmitter, Output, ViewChild, ContentChild, NgZone, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { NgForm } from '@angular/forms';
import { CatalogService, IPChangeEventSorted, OnedrivegraphService } from '../services/index';
import { ConfigurationService } from '../services/configuration.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { MatSnackBar } from '@angular/material';
import {TranslateService} from '@ngx-translate/core';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { TCRMEntity, Colony, Customer, GetStatusByDocType_Result, findActionOppByType_Result } from '../model/allmodels';
import { IDeleteEventModel } from '../model/deleteeventmodel';
import { ActionsService } from '../services/actions.services';

import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { AuthHelper } from '../authHelper/authHelper';
import * as moment from 'moment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export const cCurrencyMask = createNumberMask({
      allowDecimal: true
    });

  // Allow float greather o equal to 0
export const cFloatPosMask = createNumberMask({
      prefix: '',
      suffix: '', // This will put the dollar sign at the end, with a space.
      allowDecimal: true
    });


const findCustCatalogsQl = gql`
  query 
        findCustCatalogs($custid: Int!) {
            findCustomerContacts(custid: $custid) { id name isActive  } 
            findDeliveryPoint(custid: $custid) { id cDPName isActive  } 
        }
`;

const findCountryByMill = gql`
  query 
        findCountryByMill($idmill: Int!) {
            findCountryByMill(idmill: $idmill) { id name description idCountry } 
        }
`;

@Component({
  selector: 'crm-component',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  providers: [],
})
export class BaseComponent implements OnInit, AfterViewInit, OnDestroy {
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
  @ViewChild('editform') form: NgForm;

  loadName: string = 'item.load';
  pageChange: Subscription;
  isEditing: boolean = false;
  singleEditor: boolean = false;
  setTitle: boolean = true;
  isSmallScreen: boolean = false;

  currencyMask = cCurrencyMask;
  floatPosMask = cFloatPosMask;
  subEditor: boolean = false;
  columns: ITdDataTableColumn[] = [
  ];


  entList: Observable< TCRMEntity[]>;
  itemEdit:  TCRMEntity;
  curIndex: number;
  totalItems: number;
  _totalItems: any;

  @Input() catalogName: string;

  filteredData: any[];
  filteredTotal: number = 0;
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 0;
  dataLoaded: boolean = false;

  pageSize: number = 5;

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
   _curService: CatalogService;
  handleScreenChange: boolean = true;


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
    public translate: TranslateService,
    public route: ActivatedRoute,
    public apollo: Apollo,
    public _router: Router,
    public _auth: AuthHelper,
    public _one: OnedrivegraphService
    ) {
    this._curService = new CatalogService(_http, _confs, _loadingService, 
                       _dialogService,
                       _snackBarService, _tableService, apollo);
                       

    this.objId = this._actions.newGuid();
  }

  ngOnInit() {
    this.ngBeforeInit();
    
    if( this.route.snapshot.data['catName'] !== undefined) {
      let catName = this.route.snapshot.data['catName'];
      this.catalogName = catName;
   }
   
    if( this.route.snapshot.data['baseapi'] !== undefined ) {
      let baseapi = this.route.snapshot.data['baseapi'];
      this._curService.setAPI(baseapi + '/', this.catalogName, this.loadName);
    }
    



    if ( this.handleScreenChange === true) {
      this.screenSizeChangeEvent = this._actions.screenSizeChangeEvent.subscribe( (e: IPageChangeEvent) => {
         // this.screenChange(e);
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
    this.entList = <Observable<TCRMEntity[]>>this._curService.entList;
    this.addColumns();
    this.addActionColumn();
    this.initData();
  }

  loadCatalogs() {

  }
  ngAfterViewInit(): void {


    this.pageSize = this._confs.pageSize;
    // broadcast to all listener observables when loading the page
    this._mediaService.broadcast();

    this.deleteConfEvent = this._actions.deleteItemConfirmedEvent
      .subscribe((e: IDeleteEventModel) => {
        this.deleteConfirmed(e);
      },
      err => console.log(err),   //removed dot
      () => console.log('recived data') //removed dot
      );



      // Service events
    this.afterLoadEvent = this._curService.afterLoadEmitter.subscribe(item => this.afterLoadItem(item));
    this.afterCreateEvent = this._curService.afterCreateEmitter.subscribe(item => this.afterCreate(item));
    this.afterUpdateEvent = this._curService.afterUpdateEmitter.subscribe(item => this.afterUpdate(item));
    this.afterLoadAllEvent = this._curService.afterLoadAllEvent.subscribe(item => this.afterLoadAll(item));
    this.afterDeleteEvent = this._curService.afterDeleteEmitter.subscribe(item => this.afterDelete(item));


    this.onCreateErrorEvent = this._curService.onCreateErrorEmitter.subscribe(item => this.onCreateError(item));
    this.onUpdateErrorEvent = this._curService.onUpdateErrorEmitter.subscribe(item => this.onUpdateError(item));
    this.onDeleteErrorEvent = this._curService.onDeleteErrorEmitter.subscribe(item => this.onDeleteError(item));

    
    if (this.setTitle === true) {
      setTimeout( () => {
        
        this._actions.updateTitle(this.catalogName);       
      }, 50);

    }

    if( this.subEditor == false) {
      this._actions.showAdd(true);
      this._actions.showSearch(true);
      this._actions.showSave(false);
      this._actions.showCancel(false);
      this._actions.showEmail(false);

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


    if (this.onCreateErrorEvent !== undefined) { this.onCreateErrorEvent.unsubscribe(); }
    if (this.onUpdateErrorEvent !== undefined) { this.onUpdateErrorEvent.unsubscribe(); }
    if (this.onDeleteErrorEvent !== undefined) { this.onDeleteErrorEvent.unsubscribe(); }


    if (this._totalItems !== undefined) { this._totalItems.unsubscribe(); }
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
    this.itemEdit = new TCRMEntity();
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
    this.itemEdit.id = 0;
    this.isEditing = true;
    this._actions.setEdit({ isChild: this.singleEditor });
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
      if (this.itemEdit.id > 0) {
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

  afterDelete(item: any) {
    this.reloadPaged(undefined);
    
  }


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
    
    this._actions.deleteItemEvent.emit( { title: item.description || item.name || item[this.fieldDelete], objId: this.objId } );
  }

  deleteConfirmed(e: IDeleteEventModel) {
    if( e.objId === this.objId) {
      this.deleteEntity(this.itemEdit.id);
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
     this._actions.setEdit({ isChild: this.singleEditor });
     this.onItemLoaded.emit(itm);
     
  }

  screenChange(e: IPageChangeEvent) {
    if (e !== undefined) {
      if ( e.pageSize !== this.pageSize ) {

        this.pageSize = e.pageSize;
      }
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
   this._curService.loadQl(findCustCatalogsQl, { custid: idcust })
    .subscribe(({data}) => {
      this.catCustomerContact = data['findCustomerContacts'];
      this.catDeliveryPoint = data['findDeliveryPoint'];
      this.afterLoadCustomerContact();
    }, (error: Error) => {
      debugger
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    }
    );
  }

  afterLoadCustomerContact() {

  }
  loadCountryOrigin(idmill: number) {
   this._curService.loadQl(findCountryByMill, { idmill: idmill })
    .subscribe(({data}) => {
      this.catCountry = data['findCountryByMill'];
    }, (error: Error) => {
      debugger
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    }
    );
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
}
