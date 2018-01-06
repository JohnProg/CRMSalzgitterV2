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
import { MatSnackBar } from '@angular/material';

import { ApolloClient } from 'apollo-client';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {  TCRMEntity, ReturnSaveRequest, QueryResponse } from '../model/index';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface IPChangeEventSorted extends IPageChangeEvent {
  sortBy: string;
  sortType: string;
  sText: string;
}

export const NUMBER_FORMAT: any = (v: number) => (v || 0).toLocaleString();
export const DECIMAL_FORMAT: any = (v: number) => (v || 0).toLocaleString();
export const CURRENCY_FORMAT: any = (v: number ) => {
    return  '$' + (v || 0).toLocaleString()
};
export const DATE_FORMAT: any = (v: Date ) =>   v !== undefined ? moment(v).format(environment.dateFormat) : '';
export const MAXSTRING_FORMAT: any = (v: string ) =>   {
  
  if( v === undefined || v === '') {
    return '';
  }
  if( v.length > 20) {
    return v.substring(0, 19) + '';
  }
  return v;
};

export const EMAILTO_FORMAT: any = (v: number) => { 
    switch(v) {
      case 1: return 'Customer';
      case 2: return 'Customer Contact';
      case 3: return 'Both';
    }
      return 'N/A';
  } ;
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

  onUpdateErrorEmitter: EventEmitter<any> = new EventEmitter<any>();
  onCreateErrorEmitter: EventEmitter<any> = new EventEmitter<any>();
  onDeleteErrorEmitter: EventEmitter<any> = new EventEmitter<any>();

  afterLoadAllEvent: EventEmitter<TCRMEntity[]> = new EventEmitter<TCRMEntity[]>();
  _rest: CRMRestService;

  loadName: string;

  constructor(public _http: Http, 
    public _confs: ConfigurationService,
    public _loadingService: TdLoadingService,
    public _dialogService: MatDialog,
    public _snackBarService: MatSnackBar,
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

  setAPI(tapi: string, cName: string, loadN: string) {
    this.capi = tapi;
    this._rest.setPath(this.capi);
    this.fullapi = this._confs.serverWithApiUrl + this.capi;
    this.catalogName = cName;
    this.loadName = loadN;
  }

  changeTotal(total: number) {
    
      this._totalItems.next(total);
  }

  loadAll(cparams: IPChangeEventSorted, customHandle: boolean = false) {
    this._loadingService.register(this.loadName);
    this._rest.query().subscribe((datas: TCRMEntity[]) => {
      this.dataStore.entities = datas;
      let t = this._tableService.pageData(this.dataStore.entities, 1, cparams.pageSize);
      this._entList.next(t);
      this._loadingService.resolve(this.loadName);

        this.changeTotal(this.dataStore.entities.length);
        this.afterLoadAllEvent.next(this.dataStore.entities);      



    }, (error: Error) => {
      this._loadingService.resolve(this.loadName);
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    });
  }


  loadCustomAll( url: string,  cparams: URLSearchParams, pageSize: number = 0, customHandle: boolean = false) {
    console.log('registering ' + this.loadName);
    this._loadingService.register(this.loadName);
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
        console.log('Resolving ' + this.loadName);
        this._loadingService.resolve(this.loadName);
        if( customHandle === false ) {
          this._entList.next(t);
          this.afterLoadAllEvent.next(t);
        } else {
           this.afterLoadAllEvent.next(this.dataStore.entities);
        }
      }, (error) => {
        this._loadingService.register(this.loadName);
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

    let index = (p.page * p.pageSize) + 1;
    let t = this.dataStore.entities;
    if( p.sText != undefined && p.sText.length > 0 ) {
       t = this._tableService.filterData(t, p.sText, true); 
    }
    

    t = this._tableService.sortData(t, p.sortBy, p.sortType == 'ASC' ? TdDataTableSortingOrder.Ascending : TdDataTableSortingOrder.Descending );
    t = this._tableService.pageData(t, index , --index + p.pageSize);    
    this._entList.next(t);
    //this.changeTotal(t.length);
    //this.afterLoadAllEvent.next(this.dataStore.entities);
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
    this._loadingService.register(this.loadName);
    return this._http.get(this._confs.serverWithApiCustomUrl + action, { search: pparams, headers: this.headers })
      .map((response) => response.json()).subscribe((result) => {
        this.dataStore.entities = result.Data;
        this._entList.next(Object.assign({}, this.dataStore).entities);
        this.changeTotal(result.Total);
        this.afterLoadAllEvent.next(this.dataStore.entities);
      }, (error) => {
        this._loadingService.resolve(this.loadName);
        this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
      });
  }


  load(id: number | string) {
    this._loadingService.register(this.loadName);
    // return this._http.get( this.fullapi + id).map(response => response.json());
    this._rest.get(id).subscribe( (data: TCRMEntity) => {
      Object.assign(this.itemEdit, data);
      this._loadingService.resolve(this.loadName);
       this.afterLoadEmmiterEvent(this.itemEdit);       


     
    }, error => {
      this._loadingService.resolve(this.loadName);
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    });
  }

  loadFromUrl(url: string) {
    // return this._http.get( this.fullapi + id).map(response => response.json());
    this._loadingService.register(this.loadName);
     this._http.get(this._confs.serverWithApiCustomUrl + url, this.options)
      .map((response) => response.json())
      .subscribe( (data: TCRMEntity) => {
      Object.assign(this.itemEdit, data);
      this.afterLoadEmmiterEvent(this.itemEdit);
      this._loadingService.resolve(this.loadName);
    }, error => {
      this._loadingService.resolve(this.loadName);
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    });
  }
  
  create(entity: any, customHandle: boolean = false ) {
    console.log('Register ' + this.loadName);
    this._loadingService.register(this.loadName);

    this._rest.create( entity)
      .map((response) => response.json())
      .subscribe( (data: ReturnSaveRequest) => {

        console.log('Resolve ' + this.loadName);
        this._loadingService.resolve(this.loadName);        
 
          if(customHandle === false ) {
            this.dataStore.entities.push(data.data);
            this._entList.next(Object.assign({}, this.dataStore).entities);
            this.itemEdit.id = data.data.id;
            this.afterCreateEmitter.emit(data.data);             
            this._snackBarService.open( this.catalogName + ' ' + data.message, 'Ok');
          } else {
            this.dataStore.entities.push(data.data);
            this.afterCreateEmitter.emit( this.dataStore.entities);             
          }       
      }, (error) => {
        
        this._loadingService.resolve(this.loadName);
        this.onCreateErrorEmitter.emit(error);
        
        this._snackBarService.open(error.message, 'Ok');
      });
  }

  createArray(entity: any, customHandle: boolean = false) {
    this._loadingService.register(this.loadName);
    this._rest.create( entity)
      .map((response) => response.json())
      .subscribe( (data: ReturnSaveRequest) => {
        this._loadingService.resolve(this.loadName);

        if(customHandle === false ) {
          this.dataStore.entities = [];
          data.data.forEach(element => {
            this.dataStore.entities.push(element);
          });
          
          this._entList.next(Object.assign({}, this.dataStore).entities);
          this.changeTotal(this.dataStore.entities.length);
          setTimeout( () => {
            this.afterCreateEmitter.emit(  data.data);
            this.itemEdit.id = data.data.id;
            this.afterLoadAllEvent.next(this.dataStore.entities);           
          }, 50);

          this._snackBarService.open( this.catalogName + ' ' + data.message, 'Ok');
        } else {
           this.dataStore.entities.push(data.data);
           setTimeout( () => {
            this.afterCreateEmitter.emit( this.dataStore.entities);           
          }, 50);

        }

      }, (error) => {
        this._loadingService.resolve(this.loadName);
        this.onCreateErrorEmitter.emit(error);
        
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
         this._snackBarService.open(error.message, 'Ok');
      });
  }

  assignList(items: TCRMEntity[]) {
     this._entList.next(Object.assign({}, this.dataStore).entities);
  }

  update(entity: any, customHandle: boolean = false) {
    console.log('Register ' + this.loadName);
    this._loadingService.register(this.loadName);
    this._rest.update(entity.id, entity)
   // .map((response) => response.json())
      .subscribe( (data: ReturnSaveRequest) => {
        console.log('Resolve ' + this.loadName);
        this._loadingService.resolve(this.loadName);
        
          this.dataStore.entities.forEach((t, i) => {
            if (t.id === data.data.id) {
              this.dataStore.entities[i] = data.data;  
            }
          });
         
          if( customHandle === false) {
            this._entList.next(Object.assign({}, this.dataStore).entities);
            setTimeout( () => {
            this.afterUpdateEmitter.emit(data.data);
            }, 50);
          } else {
            setTimeout( () => {
                this.afterUpdateEmitter.emit(this.dataStore.entities);
            }, 50);
          }
          this._snackBarService.open(this.catalogName + data.message, 'Ok');
        
      }, (error) => {
        this._loadingService.resolve(this.loadName);
        this.onUpdateErrorEmitter.emit(error);
      });
  }



  remove(entId: number, customHandle: boolean = false ) {
    console.log('Registering ' + this.loadName);
    this._loadingService.register(this.loadName);
    this._rest.delete(entId).subscribe( (response) => {
      // this.dataStore.entities.forEach((t, i) => {
      //   if (t.id === entId) { this.dataStore.entities.splice(i, 1); }
      // });
      
      let idx = this.dataStore.entities.findIndex(o => o.id == entId);
      
      if( idx >= 0) {
        this.dataStore.entities.splice(idx, 1); 
      }
      //let et = Object.assign({}, this.dataStore).entities;
      if( customHandle === false) {
        //this._entList.next(this.dataStore.entities);
      }
      console.log('Resolving ' + this.loadName);
      this._loadingService.resolve(this.loadName);
      setTimeout( () => {
        this.afterDeleteEmitter.emit(this.dataStore.entities);
      }, 50);
      this._snackBarService.open(response, 'Ok');

    }, (error) => {
      this._loadingService.resolve(this.loadName);
      this.onDeleteErrorEmitter.emit(error);
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
    }).valueChanges.subscribe(({data}) => {
      
      this.dataStore.entities = <Array<TCRMEntity>>data[pname];
      let t = this._tableService.pageData(this.dataStore.entities, 1, cparams.pageSize);
      this._entList.next(t);
      this.changeTotal(this.dataStore.entities.length);
      this.afterLoadAllEvent.next(this.dataStore.entities);
      
    }, (error: Error) => {
      
      this._snackBarService.open(' Could not load ' + this.catalogName, 'Ok');
    }
    );

   }

  loadQl(query: any, gvars: any) { //, pname: string[],  catList: TCRMEntity[]) {
    // return this._http.get( this.fullapi + id).map(response => response.json());

    return this.apollo.watchQuery<QueryResponse>({
      query: query,
      variables: gvars
    }).valueChanges;
    
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


  converBase64toBlob(content, contentType) {
    contentType = contentType || '';
    let sliceSize = 512;
    let byteCharacters = window.atob(content); //method which converts base64 to binary
    var byteArrays = [
    ];
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, {
      type: contentType
    }); //statement which creates the blob
    return blob;
  }

}


