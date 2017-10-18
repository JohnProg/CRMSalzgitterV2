import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpModule }    from '@angular/http';


import {HttpClientModule, HttpClient, HttpHandler} from '@angular/common/http';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { RequestInterceptor } from '../config/interceptors/request.interceptor';

import { routedComponents, AppRoutingModule } from './app-routing.module';

import { CRMModule } from './crmapp/crm.module';

import { environment } from '../environments/environment';

import { MainmenuComponent } from './mainmenu/mainmenu.component';


const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, environment.baseHref + 'assets/i18n/', '-lang.json');
}

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    MainmenuComponent,



  ], // directives, components, and pipes owned by this NgModule
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    CRMModule,
    
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    })
  ], // modules needed to run this module
  providers: [
    httpInterceptorProviders,
    Title
  ], // additional providers needed for this module
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
