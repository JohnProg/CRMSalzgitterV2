import { Injectable, EventEmitter } from '@angular/core';

import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { RESTService, HttpInterceptorService } from '@covalent/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ConfigurationService } from './configuration.service';
import {  TCRMEntity } from '../model/allmodels';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService
} from '@covalent/core';
import { MdSnackBar } from '@angular/material';

export interface IPChangeEventSorted extends IPageChangeEvent {
  sortBy: string,
  sortType: string,
  sText: string
}

export const NUMBER_FORMAT: any = (v: number) => v;
export const DECIMAL_FORMAT: any = (v: number) => v.toFixed(2);
export const CURRENCY_FORMAT: any = (v: number ) =>  '$' + v.toLocaleString();


@Injectable()
export class CRMRestService extends RESTService<TCRMEntity>  {

  constructor(private _http: Http, private _confs: ConfigurationService) {
    super(_http, {
      baseUrl: _confs.serverWithApiUrl,
      path: '',
      //headers: new Headers(),
      dynamicHeaders: () => new Headers(),
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
  private dataStore: {
    entities: TCRMEntity[]
  };

  private _entList: BehaviorSubject<TCRMEntity[]>;
  entList: Observable<TCRMEntity[]>

  capi: string;
  fullapi: string;
  catalogName: string;
  itemEdit: TCRMEntity;

  isEditing$: Observable<boolean>;
  isEditing: Observer<boolean>;

  totalItems$: Observable<number>;
  totalItems: Observer<number>;

  apiCustom: string;

  afterLoadEmitter: EventEmitter<TCRMEntity> = new EventEmitter<TCRMEntity>();
  afterUpdateEmitter: EventEmitter<TCRMEntity> = new EventEmitter<TCRMEntity>();
  afterCreateEmitter: EventEmitter<TCRMEntity> = new EventEmitter<TCRMEntity>();
  _rest: CRMRestService;

  constructor(public _http: Http, public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: TdDialogService,
    public _snackBarService: MdSnackBar,
    private _tableService: TdDataTableService
  ) {
    this.headers = new Headers();
    this.headers.append('Accept', '');
    this.headers.append('Content-Type', '');

    this.dataStore = { entities: [] };
    this._entList = <BehaviorSubject<TCRMEntity[]>>new BehaviorSubject([]);
    this.entList = this._entList.asObservable();



    this.itemEdit = <TCRMEntity>{  };

    this.isEditing$ = new Observable<boolean>( (observer) => this.isEditing = observer).share();

    this.totalItems$ = new Observable<number>( (tobserver) => this.totalItems = tobserver);
    this._rest = new CRMRestService(_http, _confs);
    this.apiCustom = _confs.serverWithApiCustomUrl;
  }

  setAPI(tapi: string, cName: string) {
    this.capi = tapi;
    this._rest.setPath(this.capi);
    this.fullapi = this._confs.serverWithApiUrl + this.capi;
    this.catalogName = cName;
  }


  changeState(newState: boolean) {
    if (this.isEditing !== undefined) {
      this.isEditing.next(newState);
    }
  }

  changeTotal(total: number) {
    if (this.totalItems !== undefined) {
      this.totalItems.next(total);
    }
  }

  loadAll(cparams: IPChangeEventSorted) {
    this._rest.query().subscribe((datas: TCRMEntity[]) => {
      this.dataStore.entities = datas;
      let t = this._tableService.pageData(this.dataStore.entities, 1, cparams.pageSize);
      this._entList.next(t);
      this.changeTotal(this.dataStore.entities.length);
    }, (error: Error) => {
      this._loadingService.resolve('users.list');
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    });
  }

  loadCustomAll( url: string,  cparams: URLSearchParams) {
    this._http.get(this._confs.serverWithApiCustomUrl + url, { search: cparams })
      .map((response) => response.json()).subscribe((result) => {
        this.dataStore.entities = result;
        this._entList.next(Object.assign({}, this.dataStore).entities);
      }, (error) => {
        this._loadingService.resolve('users.list');
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      });
  }

  customQuery(pfunc: string, cparams: TCRMEntity[]) {
    let pparams = new URLSearchParams();
    cparams.forEach( (element) => {
      pparams.set(element.Name, element.Description);
    });
    return this._http.get(this.fullapi + pfunc, { search: pparams })
      .map( (response) => response.json());
  }

  getPaged(p: IPChangeEventSorted) {
    let pparams = new URLSearchParams();
    pparams.set('page', p.page.toString());
    pparams.set('pageSize', p.pageSize.toString());
    if (p.sortBy === undefined) { p.sortBy = 'Name'; }
    if (p.sortType === undefined) { p.sortType = 'ASC'; }
    pparams.set('sortBy', p.sortBy);
    pparams.set('sortType', p.sortType);
    pparams.set('sText', p.sText);
    let index = (p.page * p.pageSize) + 1;

    let t = this._tableService.pageData(this.dataStore.entities, index , --index + p.pageSize) ;
    this._entList.next(t);
    this.changeTotal(this.dataStore.entities.length);
   // this._rest.custommQuery('GetPaged', { search: pparams })
   //   .map( (response) => response.json()).subscribe( (result) => {
   //     this.dataStore.entities = result.Data;
   //     this._entList.next(Object.assign({}, this.dataStore).entities);
   //     this.changeTotal(result.Total);
   //   }, (error) => {
   //     this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
   //   });s
  }

  getCustomPaged(p: IPChangeEventSorted, action: string = 'GetPaged', cparams: TCRMEntity[]) {
    let pparams = new URLSearchParams();
    pparams.set('page', p.page.toString());
    pparams.set('pageSize', p.pageSize.toString());

      if (p.sortBy === undefined) { p.sortBy = "Name";}
      if (p.sortType === undefined) { p.sortType = "ASC"; }
      pparams.set("sortBy", p.sortBy);
      pparams.set("sortType", p.sortType);
      pparams.set("sText", p.sText);
    if( cparams != undefined) {
      cparams.forEach( (element) => {
        pparams.set(element.Name, element.Description);
      });
    }

    return this._http.get(this._confs.serverWithApiCustomUrl + action, { search: pparams })
      .map((response) => response.json()).subscribe((result) => {
        this.dataStore.entities = result.Data;
        this._entList.next(Object.assign({}, this.dataStore).entities);
        this.changeTotal(result.Total);
      }, (error) => {
        this._loadingService.resolve('users.list');
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      });
  }


  load(id: number | string) {
    // return this._http.get( this.fullapi + id).map(response => response.json());
    this._rest.get(id).subscribe(data => {
      let notFound = true;

      this.dataStore.entities.forEach((item, index) => {
        if (item.Id === data.Id) {
          this.dataStore.entities[index] = data;
          notFound = false;
        }
      });

      if (notFound) {
        this.dataStore.entities.push(data);
      }

      this._entList.next(Object.assign({}, this.dataStore).entities);
      Object.assign(this.itemEdit, data);
      this.changeState(true);
      this.afterLoadEmmiterEvent(this.itemEdit);
    }, error => {
      this._loadingService.resolve('users.list');
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    });
  }


  create(entity: any) {
    this._rest.create(entity)
      .subscribe( (data: any) => {

        if( data.Data !== undefined) {
          this.dataStore.entities.push(data.Data);
          this._entList.next(Object.assign({}, this.dataStore).entities);
          this.changeState(false);
          this._snackBarService.open( this.catalogName + ' ' + data.Message, 'Ok');
          this.itemEdit.Id = (<TCRMEntity>data.Data).Id;
          this.afterCreateEmitter.emit(data.Data);
        }
      }, (error) => {
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      },
       () =>  {
        debugger
       });
  }

  update(entity: any) {

    this._rest.update(entity.Id, entity)
      .subscribe( (data) => {

        this.dataStore.entities.forEach((t, i) => {
          if (t.Id === data.Data.Id) { this.dataStore.entities[i] = data.Data; }
        });

        this._entList.next(Object.assign({}, this.dataStore).entities);
        this.changeState(false);
        this._snackBarService.open(this.catalogName + data.Message, 'Ok');

        this.afterUpdateEmitter.emit(data);

      }, (error) => {
        this._snackBarService.open(error.Message, 'Ok');
      });
  }



  remove(entId: number) {

    this._rest.delete(entId).subscribe( (response) => {

      this.dataStore.entities.forEach((t, i) => {
        if (t.Id === entId) { this.dataStore.entities.splice(i, 1); }
      });

      this._entList.next(Object.assign({}, this.dataStore).entities);
      this._snackBarService.open(response, 'Ok');
    }, (error) => {
      this._snackBarService.open(error.Message, 'Ok');
    });
  }

  loadCatalog(catalog: string, catList: TCRMEntity[], cparams: TCRMEntity[]) {

    let pparams = new URLSearchParams();
    if (cparams != undefined) {
      cparams.forEach((element) => {
        pparams.set(element.Name, element.Description);
      });
    }
    this._http.get(this._confs.serverWithApiUrl + catalog, { search: pparams })
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
        pparams.set(element.Name, element.Description);
      });
    }
    return this._http.get(this._confs.serverWithApiUrl + catalog, { search: pparams });
  }

    loadCustomCatalogObs(catalog: string, cparams: TCRMEntity[]) : any {
    let pparams = new URLSearchParams();


    if (cparams !== undefined) {
      cparams.forEach((element) => {
        pparams.set(element.Name, element.Description);
      });
    }
    return this._http.get(this._confs.serverWithApiCustomUrl + catalog, { search: pparams });
  }

  afterLoadEmmiterEvent(itm: TCRMEntity) {
    this.afterLoadEmitter.next(itm);
  }

  getAfterLoadEmitter() {
    return this.afterLoadEmitter;
  }

  public customUpdate(url: string, cparams: any) {
    return this._http.put(this.apiCustom  + url, cparams);
  }

  public customDelete(url: string, cparams: any) {
    return this._http.delete(this.apiCustom  + url, cparams);
  }
 
  public customPost(url: string, cparams: any) {
    return this._http.post(this.apiCustom  + url, cparams);
  }
}


