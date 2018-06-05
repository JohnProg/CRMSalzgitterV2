import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { RequestInterceptor } from '../config/interceptors/request.interceptor';
import { MOCK_API } from '../config/api.config';
import { AppComponent } from './app.component';

import { routedComponents, AppRoutingModule } from './crmapp/app-routing.module';

import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloModule, Apollo } from 'apollo-angular';
import { setContext } from 'apollo-link-context';
import { ApolloLink, concat } from 'apollo-link';

import { environment } from '../environments/environment';
import { CRMModule } from './crmapp/crm.module';
import {  ConfigurationService } from './crmapp/services/index';


const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];


export function getAPI(): string {
  return MOCK_API;
}

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,


    //CustomdialogcrmComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    // angular modules
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpLinkModule,
    ApolloModule,
    CRMModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
  ], // modules needed to run this module
  providers: [
    httpInterceptorProviders,
    Title, 
  ], // additional providers needed for this module
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
})

export class AppModule {

  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    _conf: ConfigurationService
  ) {
  
    const cache = new InMemoryCache();
    const http = httpLink.create({uri: environment.server + 'api/graphql'});

    const authMiddleware = new ApolloLink((operation, forward) => {
      // add the authorization to the headers
      operation.setContext({
        headers: new HttpHeaders().set('Authorization', _conf.getToken() || null)
      });

      return forward(operation);
    });

    apollo.create({
      link: concat(authMiddleware, http),
      cache: cache
    });



    

  }

}
