import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutes, appRoutingProviders } from '../app.routes';
import { CovalentCoreModule } from '@covalent/core';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';

import { RequestInterceptor } from '../../config/interceptors/request.interceptor';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';


// services 
import { ActionsService, CatalogService, ConfigurationService } from './services/index';


//catalogs
import { BaseComponent, CatalogComponent, CurrencyComponent, ColonytypeComponent,
DepartmentComponent, DocumentTypeComponent, FamilyComponent, LinerTermComponent,
MarketComponent, MillComponent, OrganizationComponent, PaymentTermComponent, 
PortComponent, PositionComponent, PropertyComponent, SectorComponent, 
TenderComponent, ActionoppComponent, CountryComponent, StateComponent, IncotermComponent
 } from './catalogs/index';


//options
import { OptionsComponent, CompanyComponent } from './options/index';

// Products
import { ProductComponent, ProducteditorComponent, ProductpropertyComponent,
         ProductindexComponent } from './options/index';


// cbx Components

import { CRMSelectComponent, GenericActionsComponent, CrmselectchildComponent } from './components/index';

// Directives

import { CRMCurrencyPipe, CRMCurrencyFormatterDirective } from './directives/index';

// Opportunity
import { OpportunityComponent, OpportunityindexComponent, OpportunityeditorComponent, OpportunitydetailComponent,
        OpportunityheaderComponent, OpportunitydialogsComponent, OpportunitydocumentsComponent } from './opportunity/index';


@NgModule({
  declarations: [
    BaseComponent,
    CurrencyComponent,
    ColonytypeComponent,
    DepartmentComponent,
    DocumentTypeComponent,
    FamilyComponent,
    LinerTermComponent,
    MarketComponent,
    MillComponent,
    OrganizationComponent,
    PaymentTermComponent,
    PortComponent,
    PositionComponent, 
    PropertyComponent, 
    SectorComponent, 
    TenderComponent, 
    ActionoppComponent, 
    CountryComponent,
    StateComponent,

    IncotermComponent,
    CatalogComponent,


    //Options
    OptionsComponent,
    CompanyComponent,
      //Products
    ProductComponent, 
    ProducteditorComponent,
    ProductindexComponent,
    ProductpropertyComponent,


    // Opportunity
    OpportunityComponent,
    OpportunityindexComponent,
    OpportunityeditorComponent,
    //CrmselectchildComponent,
    OpportunitydetailComponent,
    OpportunityheaderComponent,
    OpportunitydialogsComponent,
    OpportunitydocumentsComponent,


// Components
  // Cbx Components
    CRMSelectComponent, CrmselectchildComponent,
    GenericActionsComponent,



  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CovalentCoreModule,
    CovalentHttpModule
    // .forRoot({
    //   interceptors: [{
    //     interceptor: RequestInterceptor, paths: ['**'],
    //   }],
    // })
    ,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    NgxChartsModule,
    TranslateModule
    // .forChild({
    //         loader: {
    //             provide: TranslateLoader,
    //             useFactory: HttpLoaderFactory,
    //             deps: [Http]
    //         }
    //     })
        , 
    appRoutes
  ], // modules needed to run this module
  exports: [
       TranslateModule
  ],
  providers: [
    appRoutingProviders,
    ActionsService, CatalogService, ConfigurationService,

    // Directives
    CRMCurrencyPipe, CRMCurrencyFormatterDirective,

  ], // additional providers needed for this module
  entryComponents: [ ],

  bootstrap: [  ],
})
export class CRMModule {}
