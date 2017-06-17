
import { Injectable, EventEmitter } from '@angular/core';

import { Response, Http, Headers, RequestOptions, URLSearchParams, QueryEncoder } from '@angular/http';
import { RESTService, HttpInterceptorService } from '@covalent/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { ConfigurationService } from './configuration.service';
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
import { ApolloClient, createNetworkInterface } from 'apollo-client';


// by default, this client will send queries to `/graphql` (relative to the URL of your app)
const client: ApolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: environment.server + 'graph',
  }),
});


@Injectable()
export class GraphService   {



}