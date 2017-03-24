import { Injectable, EventEmitter } from '@angular/core';
import { IPageChangeEvent } from '@covalent/core';
import { Response, Http, Headers, URLSearchParams, QueryEncoder } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ConfigurationService } from './configuration.service';
import { TCRMEntity } from '../model/allmodels';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {Md2Toast} from 'md2/toast/toast';
import { CatalogService } from './catalog.service';

export interface IPChangeEventSorted extends IPageChangeEvent {
  sortBy: string ,
  sortType: string,
  sText: string
}


@Injectable()
export class ProductService extends CatalogService {

    deleteProperty(entId: number) {
      return  this._http.delete( this.fullapi + 'deleteProperty/' + entId);
    }

}