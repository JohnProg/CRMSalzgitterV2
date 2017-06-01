import { NgModule, Type } from '@angular/core';
import { RequestInterceptor } from '../../config/interceptors/request.interceptor';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';


const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];


import { CurrencyPipe } from '@angular/common';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CKEditorModule } from 'ng2-ckeditor';

import { Md2Module }  from 'md2';

import { TextMaskModule } from 'angular2-text-mask';

import { SharedModule } from '../shared/shared.module';
// services 
import { OpportunityService, ActionsService, CatalogService, 
  ConfigurationService, TokenService } from './services/index';


//catalogs
import { BaseComponent, CatalogComponent, CurrencyComponent, ColonytypeComponent,
DepartmentComponent, DocumentTypeComponent, FamilyComponent, LinerTermComponent,
MarketComponent, MillComponent, OrganizationComponent, PaymentTermComponent,
PortComponent, PositionComponent, PropertyComponent, SectorComponent,
TenderComponent, ActionoppComponent, CountryComponent, StateComponent, IncotermComponent,
TransactionflowComponent,  TemplateemailComponent
 } from './catalogs/index';


import { 
  //options
  OptionsComponent, CompanyComponent, 
  // Products
  ProductComponent, ProducteditorComponent, ProductpropertyComponent,
  ProductindexComponent, ActionopportunityComponent, ActionopportunitytemplateemailComponent } from './options/index';



// cbx Components

import { CRMSelectComponent, GenericActionsComponent, CrmselectchildComponent, EmailSenderComponent } from './components/index';

// Directives

import { CRMCurrencyPipe, CRMCurrencyFormatterDirective } from './directives/index';

// Opportunity
import { OpportunityComponent, OpportunityindexComponent, OpportunityeditorComponent, OpportunitydetailComponent,
        OpportunityheaderComponent, OpportunitydialogsComponent, 
        OpportunitydocumentsComponent, OpportunitydetailsumaryComponent,
       OpportunityDialogsDocumentsComponent, OpportunitydialogemailComponent
        } from './opportunity/index';

// Quotation to supplier

import { QuotationfromsupplierComponent, QuotationfromsupplierindexComponent,
  QuotationfromsupplierindexviewerComponent,
QuotationfromsuppliereditorComponent, QuotationfromsupplierheaderComponent,
QuotationfromsupplierdetailComponent, QuotationfromsupplierdetailsumaryComponent,
QuotationfromsupplierdialogsComponent, QuotationfromsupplierdialogsdocumentsComponent,
QuotationfromsupplierdialogemailComponent,
QuotationfromsuppliereditorFromOppComponent } from './quotationfromsupplier/index';

//Quotation to Customer
import { QuotationtocustomerComponent, QuotationtocustomerindexComponent,
QuotationtocustomerindexviewerComponent, QuotationtocustomereditorComponent,
QuotationtocustomereditorheaderComponent, QuotationtocustomereditorFromQFSComponent,
QuotationtocustomereditordetailComponent, QuotationtocustomerdetailsumaryComponent
 } from './quotationtocustomer/index';


// OneDrive
import { ONEDRIVE_PROVIDERS } from './onedriveapi/index';
import { OnedriveCallbackComponent } from './onedriveapi/onedrive-callback/onedrive-callback.component';

// Login

import { AuthGuard } from './_guards/auth.guard';


import * as moment from 'moment';

import { TestonedriveComponent } from './testonedrive/testonedrive.component';

import { AuthHelper } from './authHelper/authHelper';

@NgModule({
  declarations: [
    TestonedriveComponent,

    
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
    TransactionflowComponent,
    TemplateemailComponent,

    //Options
    OptionsComponent,
    CompanyComponent,
    ActionopportunityComponent,
    ActionopportunitytemplateemailComponent,
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
    OpportunitydetailsumaryComponent,
    OpportunityDialogsDocumentsComponent,
    OpportunitydialogemailComponent,

   // Quotation to supplier
   QuotationfromsupplierComponent,
   QuotationfromsupplierindexComponent,
   QuotationfromsupplierindexviewerComponent,
   QuotationfromsuppliereditorComponent,
   QuotationfromsupplierheaderComponent,
   QuotationfromsupplierdetailComponent,
   QuotationfromsupplierdetailsumaryComponent,
   QuotationfromsupplierdialogsComponent,
   QuotationfromsupplierdialogsdocumentsComponent,
   QuotationfromsupplierdialogemailComponent,
   QuotationfromsuppliereditorFromOppComponent,

   // Quotation to Customer
   QuotationtocustomerComponent,
   QuotationtocustomerindexComponent,
   QuotationtocustomerindexviewerComponent,
   QuotationtocustomereditorComponent,
   QuotationtocustomereditorheaderComponent,
   QuotationtocustomereditorFromQFSComponent,
   QuotationtocustomereditordetailComponent,
   QuotationtocustomerdetailsumaryComponent,
// Components
  // Cbx Components
    CRMSelectComponent, CrmselectchildComponent,
    GenericActionsComponent, EmailSenderComponent,

    // Directives
    CRMCurrencyPipe, CRMCurrencyFormatterDirective,

// OneDrive
    OnedriveCallbackComponent,


  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    TranslateModule,
     CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CKEditorModule,
    Md2Module.forRoot(),
    TextMaskModule,
  ], // modules needed to run this module
  exports: [
       SharedModule,
       TranslateModule,
  ],
  providers: [
    ActionsService, CatalogService, ConfigurationService, CurrencyPipe,
    CRMCurrencyPipe, CRMCurrencyFormatterDirective,
    OpportunityService, TokenService,
    ONEDRIVE_PROVIDERS, AuthGuard, AuthHelper,


  ], // additional providers needed for this module
  entryComponents: [ ],

  bootstrap: [  ],
})
export class CRMModule {}
