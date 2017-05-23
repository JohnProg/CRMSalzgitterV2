import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRoutes, appRoutingProviders } from '../app.routes';
import { CovalentCoreModule } from '@covalent/core';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CurrencyPipe } from '@angular/common';

import { RequestInterceptor } from '../../config/interceptors/request.interceptor';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CKEditorModule } from 'ng2-ckeditor';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Md2Module }  from 'md2';

import { TextMaskModule } from 'angular2-text-mask';


// services 
import { ActionsService, CatalogService, ConfigurationService } from './services/index';


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
  ProductindexComponent, ActionopportunityComponent } from './options/index';



// cbx Components

import { CRMSelectComponent, GenericActionsComponent, CrmselectchildComponent, EmailSenderComponent } from './components/index';

// Directives

import { CurrencyInputDirective, CRMCurrencyFormatterDirective } from './directives/index';

// Opportunity
import { OpportunityComponent, OpportunityindexComponent, OpportunityeditorComponent, OpportunitydetailComponent,
        OpportunityheaderComponent, OpportunitydialogsComponent, 
        OpportunitydocumentsComponent, OpportunitydetailsumaryComponent,
      OpportunityService, OpportunityDialogsDocumentsComponent, OpportunitydialogemailComponent
        } from './opportunity/index';

// Quotation to supplier

import { QuotationfromsupplierComponent, QuotationfromsupplierindexComponent,
QuotationfromsuppliereditorComponent, QuotationfromsupplierheaderComponent,
QuotationfromsupplierdetailComponent, QuotationfromsupplierdetailsumaryComponent,
QuotationfromsupplierdialogsComponent, QuotationfromsupplierdialogsdocumentsComponent,
QuotationfromsupplierdialogemailComponent } from './quotationfromsupplier/index';


// OneDrive
import { ONEDRIVE_PROVIDERS } from './onedriveapi/index';
import { OnedriveCallbackComponent } from './onedriveapi/onedrive-callback/onedrive-callback.component';

import * as moment from 'moment';


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
    TransactionflowComponent,
    TemplateemailComponent,

    //Options
    OptionsComponent,
    CompanyComponent,
    ActionopportunityComponent,
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
   QuotationfromsuppliereditorComponent,
   QuotationfromsupplierheaderComponent,
   QuotationfromsupplierdetailComponent,
   QuotationfromsupplierdetailsumaryComponent,
   QuotationfromsupplierdialogsComponent,
   QuotationfromsupplierdialogsdocumentsComponent,
   QuotationfromsupplierdialogemailComponent,

   
// Components
  // Cbx Components
    CRMSelectComponent, CrmselectchildComponent,
    GenericActionsComponent, EmailSenderComponent,

    // Directives
    CurrencyInputDirective, CRMCurrencyFormatterDirective,

// OneDrive
    OnedriveCallbackComponent,
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CovalentCoreModule,
    CovalentHttpModule,

    CovalentHighlightModule,
    CovalentMarkdownModule,
    NgxChartsModule,
    TranslateModule,
    appRoutes,
    CKEditorModule,
    Md2Module.forRoot(),
    TextMaskModule,
  ], // modules needed to run this module
  exports: [
       TranslateModule,
  ],
  providers: [
    appRoutingProviders,
    ActionsService, CatalogService, ConfigurationService, CurrencyPipe,
    CurrencyInputDirective, CRMCurrencyFormatterDirective,
    OpportunityService,
    ONEDRIVE_PROVIDERS,


  ], // additional providers needed for this module
  entryComponents: [ ],

  bootstrap: [  ],
})
export class CRMModule {}
