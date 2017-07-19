import { Injectable, EventEmitter } from '@angular/core';

import { Response, Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { RESTService, HttpInterceptorService } from '@covalent/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ConfigurationService } from './configuration.service';

import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { MdSnackBar } from '@angular/material';

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  TCRMEntity, ReturnSaveRequest, QueryResponse } from '../model/index';

export interface IPChangeEventSorted extends IPageChangeEvent {
  sortBy: string;
  sortType: string;
  sText: string;
}

export const NUMBER_FORMAT: any = (v: number) => v;
export const DECIMAL_FORMAT: any = (v: number) => v.toFixed(2);
export const CURRENCY_FORMAT: any = (v: number ) =>  '$' + (v || 0).toLocaleString();
export const DATE_FORMAT: any = (v: number ) =>  v !== undefined ? v.toLocaleString() : '';

@Injectable()
export class CRMRestService extends RESTService<TCRMEntity>  {

  _headers: Headers = new Headers();
  _path: string;
  constructor(private _http: Http, private _confs: ConfigurationService) {
    super(_http, {
      baseUrl: _confs.serverWithApiUrl,
      path:  '',
      //headers: new Headers(),
      dynamicHeaders: () => { return this._confs.getHeaders(); },
      transform: (res: Response): any => res.json(),
    });
  }

  public setPath(dpath: string) {
    this._path = dpath;
  }


  public custommQuery(action: string, sparams: any) {
    return this._http.get(this._base + '/' + this._path + '/' + action, sparams);
  }


}




@Injectable()
export class CatalogService {

  private headers: Headers;
  private options: RequestOptions;
  private dataStore: {
    entities: TCRMEntity[]
  };

  _entList: BehaviorSubject<TCRMEntity[]>;
  entList: Observable<TCRMEntity[]>

  capi: string;
  fullapi: string;
  catalogName: string;
  itemEdit: TCRMEntity;

  _totalItems: BehaviorSubject<number> = new BehaviorSubject(0);
  totalItems: Observable<number> = this._totalItems.asObservable();

  apiCustom: string;

  afterLoadEmitter: EventEmitter<TCRMEntity> = new EventEmitter<TCRMEntity>();
  afterUpdateEmitter: EventEmitter<any> = new EventEmitter<any>();
  afterCreateEmitter: EventEmitter<any> = new EventEmitter<any>();
  afterDeleteEmitter: EventEmitter<any> = new EventEmitter<any>();
  afterLoadAllEvent: EventEmitter<TCRMEntity[]> = new EventEmitter<TCRMEntity[]>();
  _rest: CRMRestService;

  constructor(public _http: Http, 
    public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    public _tableService: TdDataTableService,
    public apollo: Apollo
  ) {

    this.headers = this._confs.getHeaders();
    this.options = new RequestOptions({ headers: this.headers });

    this.dataStore = { entities: [] };
    this._entList = <BehaviorSubject<TCRMEntity[]>>new BehaviorSubject([]);
    this.entList = this._entList.asObservable();
    this.itemEdit = <TCRMEntity>{  };



    this._rest = new CRMRestService(_http, _confs);
    this.apiCustom = _confs.serverWithApiCustomUrl;
  }

  setAPI(tapi: string, cName: string) {
    this.capi = tapi;
    this._rest.setPath(this.capi);
    this.fullapi = this._confs.serverWithApiUrl + this.capi;
    this.catalogName = cName;
  }

  changeTotal(total: number) {
      this._totalItems.next(total);
  }

  loadAll(cparams: IPChangeEventSorted, customHandle: boolean = false) {
    this._loadingService.register('');
    this._rest.query().subscribe((datas: TCRMEntity[]) => {
      this.dataStore.entities = datas;
      let t = this._tableService.pageData(this.dataStore.entities, 1, cparams.pageSize);
      this._entList.next(t);
      this.changeTotal(this.dataStore.entities.length);
      this.afterLoadAllEvent.next(this.dataStore.entities);
      this._loadingService.resolve('');
    }, (error: Error) => {
      this._loadingService.resolve('');
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    });
  }


  loadCustomAll( url: string,  cparams: URLSearchParams, pageSize: number = 0, customHandle: boolean = false) {
    this._http.get(this._confs.serverWithApiCustomUrl + url, { search: cparams, headers: this.headers })
      .map((response) => response.json()).subscribe((result) => {
        this.dataStore.entities = result;
        
        this.changeTotal(this.dataStore.entities.length);
        let t: TCRMEntity[]; // = new Array<TCRMEntity>();
        if ( pageSize > 0) {
          t = this._tableService.pageData(this.dataStore.entities, 1, pageSize);
        } else {
          t = Object.assign({},  this.dataStore).entities;
        }
        if( customHandle === false ) {
          this._entList.next(t);
          this.afterLoadAllEvent.next(t);
        } else {
           this.afterLoadAllEvent.next(this.dataStore.entities);
        }
      }, (error) => {
        this._loadingService.resolve('users.list');
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      });
  }


  loadCustomAllObs( url: string,  cparams: URLSearchParams, customHandle: boolean = false) {
    return this._http.get(this._confs.serverWithApiCustomUrl + url, { search: cparams, headers: this.headers })
      .map((response) => response.json());
  }

  customQuery(pfunc: string, cparams: TCRMEntity[]) {
    let pparams = new URLSearchParams();
    cparams.forEach( (element) => {
      pparams.set(element.name, element.description);
    });
    return this._http.get(this.fullapi + pfunc, { search: pparams, headers: this.headers })
      .map( (response) => response.json());
  }

  getPaged(p: IPChangeEventSorted) {
    let pparams = new URLSearchParams();
    pparams.set('page', p.page.toString());
    pparams.set('pageSize', p.pageSize.toString());
    if (p.sortBy === undefined) { p.sortBy = 'name'; }
    if (p.sortType === undefined) { p.sortType = 'ASC'; }
    pparams.set('sortBy', p.sortBy);
    pparams.set('sortType', p.sortType);
    pparams.set('sText', p.sText);
    let index = (p.page * p.pageSize) + 1;
    let t = this._tableService.pageData(this.dataStore.entities, index , --index + p.pageSize) ;
    this._entList.next(t);
    //this.afterLoadAllEvent.next(this.dataStore.entities);
  }

  refreshPaged(p: IPChangeEventSorted, items: TCRMEntity[]) {
    let pparams = new URLSearchParams();
    pparams.set('page', p.page.toString());
    pparams.set('pageSize', p.pageSize.toString());
    if (p.sortBy === undefined) { p.sortBy = 'name'; }
    if (p.sortType === undefined) { p.sortType = 'ASC'; }
    pparams.set('sortBy', p.sortBy);
    pparams.set('sortType', p.sortType);
    pparams.set('sText', p.sText);
    let index = (p.page * p.pageSize) + 1;
    let t = this._tableService.pageData(this.dataStore.entities, index , --index + p.pageSize) ;
    this._entList.next(t);
  }

  getCustomPaged(p: IPChangeEventSorted, action: string = 'GetPaged', cparams: TCRMEntity[]) {
    let pparams = new URLSearchParams();
    pparams.set('page', p.page.toString());
    pparams.set('pageSize', p.pageSize.toString());

    if (p.sortBy === undefined) { p.sortBy = "name";}
    if (p.sortType === undefined) { p.sortType = "ASC"; }
    pparams.set("sortBy", p.sortBy);
    pparams.set("sortType", p.sortType);
    pparams.set("sText", p.sText);
    if( cparams != undefined) {
      cparams.forEach( (element) => {
        pparams.set(element.name, element.description);
      });
    }

    return this._http.get(this._confs.serverWithApiCustomUrl + action, { search: pparams, headers: this.headers })
      .map((response) => response.json()).subscribe((result) => {
        this.dataStore.entities = result.Data;
        this._entList.next(Object.assign({}, this.dataStore).entities);
        this.changeTotal(result.Total);
        this.afterLoadAllEvent.next(this.dataStore.entities);
      }, (error) => {
        this._loadingService.resolve('users.list');
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      });
  }


  load(id: number | string) {
    // return this._http.get( this.fullapi + id).map(response => response.json());
    this._rest.get(id).subscribe( (data: TCRMEntity) => {
      Object.assign(this.itemEdit, data);
      this.afterLoadEmmiterEvent(this.itemEdit);
    }, error => {
      this._loadingService.resolve('users.list');
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    });
  }

  loadFromUrl(url: string) {
    // return this._http.get( this.fullapi + id).map(response => response.json());
     this._http.get(this._confs.serverWithApiCustomUrl + url, this.options)
      .map((response) => response.json())
      .subscribe( (data: TCRMEntity) => {
      Object.assign(this.itemEdit, data);
      this.afterLoadEmmiterEvent(this.itemEdit);
    }, error => {
      this._loadingService.resolve('users.list');
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    });
  }
  
  create(entity: any, customHandle: boolean = false) {

    this._rest.create( entity)
      .map((response) => response.json())
      .subscribe( (data: ReturnSaveRequest) => {
        if(customHandle === false ) {
          this.dataStore.entities.push(data.data);
          this._entList.next(Object.assign({}, this.dataStore).entities);
          this.afterCreateEmitter.emit(  data.data);
          this.itemEdit.id = data.data.id;
          this._snackBarService.open( this.catalogName + ' ' + data.message, 'Ok');
        } else {
           this.dataStore.entities.push(data.data);
           this.afterCreateEmitter.emit( this.dataStore.entities);
        }
      }, (error) => {
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      });
  }


  uploadFile(url: string, entity: any, fileToUpload: any, customHandle: boolean = false) {
    debugger
    let hd = new Headers();
    //hd.append('Accept', '');
    //hd.append('Content-Type', 'multipart/form-data');

    // let input = new FormData();
    // input.append('value', JSON.stringify(entity));
    // input.append('file', fileToUpload, fileToUpload.name);

    // let reader: FileReader = new FileReader();
    // reader.onloadend = function () {
    //   entity..src = reader.result;
    // }


    this._http.post(this.apiCustom + url, JSON.stringify(fileToUpload), this.options)
      .map((response) => response.json())
      .subscribe( (data: ReturnSaveRequest) => {
        
        if(customHandle === false ) {
          this.dataStore.entities.push(data.data);
          this._entList.next(Object.assign({}, this.dataStore).entities);
          this.afterCreateEmitter.emit(  data.data);
          this.itemEdit.id = data.data.id;
          this._snackBarService.open( this.catalogName + ' ' + data.message, 'Ok');
        } else {
           this.dataStore.entities.push(data.data);
           this.afterCreateEmitter.emit( this.dataStore.entities);
        }
      }, (error) => {
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      });
  }

  assignList(items: TCRMEntity[]) {
     this._entList.next(Object.assign({}, this.dataStore).entities);
  }

  update(entity: any, customHandle: boolean = false) {

    this._rest.update(entity.id, entity)
   // .map((response) => response.json())
      .subscribe( (data: ReturnSaveRequest) => {
        this.dataStore.entities.forEach((t, i) => {
          if (t.id === data.data.id) {
             this.dataStore.entities[i] = data.data;  
          }
        });
        if( customHandle === false) {
          this._entList.next(Object.assign({}, this.dataStore).entities);
          this.afterUpdateEmitter.emit(data.data);
        } else {
          this.afterUpdateEmitter.emit(this.dataStore.entities);
        }
        this._snackBarService.open(this.catalogName + data.message, 'Ok');
      }, (error) => {
        this._snackBarService.open(error.Message, 'Ok');
      });
  }



  remove(entId: number, customHandle: boolean = false ) {

    this._rest.delete(entId).subscribe( (response) => {

      this.dataStore.entities.forEach((t, i) => {
        if (t.id === entId) { this.dataStore.entities.splice(i, 1); }
      });

      if( customHandle === false) {
        this._entList.next(Object.assign({}, this.dataStore).entities);
      }
      this.afterDeleteEmitter.emit(this.dataStore.entities);
      this._snackBarService.open(response, 'Ok');

    }, (error) => {
      this._snackBarService.open(error.Message, 'Ok');
    });
  }

  loadCatalog(catalog: string, catList: TCRMEntity[], cparams: TCRMEntity[]) {

    let pparams = new URLSearchParams();
    if (cparams != undefined) {
      cparams.forEach((element) => {
        pparams.set(element.name, element.description);
      });
    }
    this._http.get(this._confs.serverWithApiUrl + catalog, { search: pparams, headers: this.headers })
      .map((response) => response.json()).subscribe((data) => {
        Object.assign(catList, <TCRMEntity[]>data);
      }, (error) => {
        this._loadingService.resolve('users.list');
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      });
  }

  loadCustomCatalog(catalog: string, catList: TCRMEntity[], cparams: TCRMEntity[]) {

    let pparams = new URLSearchParams();
    if (cparams != undefined) {
      cparams.forEach((element) => {
        pparams.set(element.name, element.description);
      });
    }
    this._http.get(this._confs.serverWithApiCustomUrl + catalog, { search: pparams, headers: this.headers })
      .map((response) => response.json()).subscribe((data) => {
        Object.assign(catList, <TCRMEntity[]>data);
      }, (error) => {
        this._loadingService.resolve('users.list');
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      });
  }

  loadCatalogObs(catalog: string, catList: Observable<TCRMEntity[]>, cparams: TCRMEntity[]) : any {
    let pparams: URLSearchParams = new URLSearchParams();


    if (cparams !== undefined) {
      cparams.forEach((element) => {
        pparams.set(element.name, element.description);
      });
    }
    return this._http.get(this._confs.serverWithApiUrl + catalog, { search: pparams, headers: this.headers });
  }

  loadCustomCatalogObs(catalog: string, cparams: TCRMEntity[]) : any {
    let pparams = new URLSearchParams();


    if (cparams !== undefined) {
      cparams.forEach((element) => {
        pparams.set(element.name, element.description);
      });
    }
    
    return this._http.get(this._confs.serverWithApiCustomUrl + catalog, { search: pparams, headers: this.headers });
  }

  afterLoadEmmiterEvent(itm: TCRMEntity) {
    this.afterLoadEmitter.next(itm);
  }

  getAfterLoadEmitter() {
    return this.afterLoadEmitter;
  }

  public customUpdate(url: string, cparams: any) {
    return this._http.put(this.apiCustom  + url, cparams, this.options);
  }

  public customDelete(url: string, cparams: any) {
    return this._http.delete(this.apiCustom  + url, cparams);
  }
 
  public customPost(url: string, cparams: any) {
    return this._http.post(this.apiCustom  + url, cparams, this.options);
  }


  public catalogPost(url: string, cparams: any) {
    return this._http.post(this._confs.serverWithApiUrl  + url, cparams, this.options);
  }

  public catalogDelete(url: string, cparams: any) {
    return this._http.delete(this._confs.serverWithApiUrl  + url, this.options);
  }



  loadItemObs(catalog: string, id: number) : any {
    return this._http.get(this._confs.serverWithApiUrl + catalog + '/' + id.toString(), this.options);
  }








// GraphQL
   gResponse: any;
   getAllQl( query, gvars, pname, cparams: IPChangeEventSorted, customHandle: boolean = false ) {
    
    this.apollo.watchQuery<QueryResponse>({
      query: query,
      variables: gvars
    }).subscribe(({data}) => {
      
      this.dataStore.entities = <Array<TCRMEntity>>data[pname];
      let t = this._tableService.pageData(this.dataStore.entities, 1, cparams.pageSize);
      this._entList.next(t);
      this.changeTotal(this.dataStore.entities.length);
      this.afterLoadAllEvent.next(this.dataStore.entities);
      this._loadingService.resolve('');
    }, (error: Error) => {
      this._loadingService.resolve('');
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    }
    );

   }

  loadQl(query: any, gvars: any) { //, pname: string[],  catList: TCRMEntity[]) {
    // return this._http.get( this.fullapi + id).map(response => response.json());

    return this.apollo.watchQuery<QueryResponse>({
      query: query,
      variables: gvars
    });
    
    // .subscribe(({data}) => {
    //   let idx: number = 0;
    //   pname.forEach(element => {
    //      Object.assign(catList[idx], data[element]);  
    //      idx++;
    //   });
    // }, (error: Error) => {
    //   this._loadingService.resolve('');
    //   debugger
    //   this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    // }
    // );

  }

}


