
import { Injectable, EventEmitter } from '@angular/core';

import { Response, Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { RESTService, HttpInterceptorService } from '@covalent/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ConfigurationService } from '../services/configuration.service';
import {  TCRMEntity, ReturnSaveRequest } from '../model/allmodels';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {
  IPageChangeEvent, TdDataTableService, TdDataTableSortingOrder,
  ITdDataTableSortChangeEvent, ITdDataTableColumn,
  TdLoadingService, TdDialogService, TdMediaService,
} from '@covalent/core';
import { MdSnackBar } from '@angular/material';

import { environment } from '../../../environments/environment';
import { provideClient, client } from './apolo.client';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ColonyTypeQuery, ColonyTypeQueryResponse } from './queries/index';


@Injectable()
export class GraphService   {

  colonyType: any;
   constructor(private apollo: Apollo) {}

     public loadColonyType() {
           this.apollo.watchQuery<ColonyTypeQueryResponse>({
              query: ColonyTypeQuery
            }).subscribe(({data}) => {
debugger
              this.colonyType = data.colonytype;
            });
     }
}