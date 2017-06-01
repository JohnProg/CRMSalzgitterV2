import { NgModule, Type } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

// Login

import { AuthGuard } from './_guards/auth.guard';


import * as moment from 'moment';

import { AuthHelper } from './authHelper/authHelper';

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



  ], // directives, components, and pipes owned by this NgModule
  imports: [
    TranslateModule,
    SharedModule,
    RouterModule,
    CKEditorModule,
    Md2Module,
    TextMaskModule,
  ], // modules needed to run this module
  exports: [
       SharedModule,
       Md2Module,
       CKEditorModule,
       Md2Module,
       TranslateModule,
       TextMaskModule,
  ],
  providers: [
    ActionsService, CatalogService, ConfigurationService, CurrencyPipe,
    CRMCurrencyPipe, CRMCurrencyFormatterDirective,
    OpportunityService, TokenService,
    AuthGuard, AuthHelper,


  ], // additional providers needed for this module
  entryComponents: [ ],

  bootstrap: [  ],
})
export class CRMModule {}
