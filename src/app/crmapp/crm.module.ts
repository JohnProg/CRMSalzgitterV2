import { NgModule, Type } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrencyPipe } from '@angular/common';

import { CKEditorModule } from 'ng2-ckeditor';

import { TextMaskModule } from 'angular2-text-mask';
import { SharedModule } from '../shared/shared.module';
import { CurrencyMaskModule } from "ng2-currency-mask";


import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloModule, Apollo } from 'apollo-angular';
import { setContext } from 'apollo-link-context';

import { environment } from '../../environments/environment';


// // services 
import { OpportunityService, ActionsService, CatalogService, OnedrivegraphService,
  ConfigurationService, TokenService, SharedataService } from './services/index';

  // Directives
 import { CRMCurrencyPipe, CRMCurrencyFormatterDirective } from './directives/index';


//catalogs
import { BaseComponent, CatalogComponent, CurrencyComponent,  
  ActionoppComponent, StateComponent, IncotermComponent,
  TemplateemailComponent, TemplateemaildocumentComponent, BaseOppComponent, MillComponent, MillcountryComponent
 } from './catalogs/index';


import { 
  //options
  OptionsComponent, CompanyComponent, 
  // Customer
  CustomerComponent, CustomerindexComponent , CustomereditorComponent, CustomereditorheaderComponent,
    CustomerbrokerComponent,
    CustomercontactComponent,
    CustomerdeliverypointComponent,
    CustomerdocumentComponent,
    CustomermarketComponent,
    CustomersectorComponent,
    CustomerproductComponent,
    CustomerrailspurComponent,
    CustomerbaseComponent,
    CustomerproductpriceComponent,
  // Products
  ProductComponent, ProducteditorComponent, ProductpropertyComponent,
  ProductindexComponent, ActionopportunityComponent, ActionopportunitytemplateemailComponent,
  OpptypeComponent, OpptypestatusComponent

} from './options/index';



// cbx Components

import { 
   CRMSelectComponent, GenericActionsComponent, 
  CrmselectchildComponent, EmailSenderComponent,
  EditordetailsumaryComponent, EditorbasedialogComponent,
  EditorbasedialogdocumentComponent,
  DocumentviewerComponent,SelectcolonyComponent, QuotationindexviewerComponent,
  NameDescPipe, MaxStringPipe, EditordetailComponent, CrmcustomdialogComponent,
  MainmenuComponent, DialogOverviewResponsiblePswDialog, EmailSenderDialogComponent,
  FilteroppComponent  } from './components/index';

  
// Opportunity
import { OpportunityComponent, OpportunityindexComponent, OpportunityeditorComponent, OpportunitydetailComponent,
        OpportunityheaderComponent,  
        OpportunitydetailsumaryComponent,
        OpportunitydialogemailComponent
        } from './opportunity/index';

// Quotation to supplier

import { QuotationfromsupplierComponent, QuotationfromsupplierindexComponent,
  QuotationfromsupplierindexviewerComponent,
QuotationfromsuppliereditorComponent, QuotationfromsupplierheaderComponent,
QuotationfromsupplierdetailComponent, QuotationfromsupplierdetailsumaryComponent,
QuotationfromsupplierdialogemailComponent,
QuotationfromsuppliereditorFromOppComponent } from './quotationfromsupplier/index';

//Quotation to Customer
import { QuotationtocustomerComponent, QuotationtocustomerindexComponent,
QuotationtocustomerindexviewerComponent, QuotationtocustomereditorComponent,
QuotationtocustomereditorheaderComponent, QuotationtocustomereditorFromQFSComponent,
QuotationtocustomereditordetailComponent, QuotationtocustomerdetailsumaryComponent,
 QuotationtocustomerdialogemailComponent
 } from './quotationtocustomer/index';


 
//Purchase Order
import { PurchaseorderComponent,
   PurchaseorderindexComponent,
   PurchaseorderindexviewerComponent,
   PurchaseordereditorComponent, PurchaseordereditorheaderComponent,
   PurchaseordereditordetailComponent,
   PurchaseordereditordetailsumaryComponent,
   PurchaseordereditorFromQTSComponent,
   PurchaseorderdialogemailComponent,
   } from './purchaseorder/index';

// Shipping
import {ShippingComponent, ShippingindexComponent, 
  ShippingindexviewerComponent, 
  ShippingeditorComponent, 
  ShippingeditorheaderComponent,
  ShippingeditordetailComponent,
  ShippingeditorFromPOComponent,
  ShippingdialogemailComponent
} from './shipping/index';

// Login
import { AuthGuard } from './_guards/auth.guard';


import { AuthHelper } from './authHelper/authHelper';




@NgModule({
  declarations: [
    MainmenuComponent,
    BaseComponent,
    CurrencyComponent,
    ActionoppComponent, 
    StateComponent,
    IncotermComponent,
    TemplateemailComponent,
    BaseOppComponent,
    SelectcolonyComponent,
    EditordetailComponent,
    MillComponent,
    MillcountryComponent,
    CrmcustomdialogComponent,
    CatalogComponent,
    DialogOverviewResponsiblePswDialog,
    EmailSenderDialogComponent,
    TemplateemaildocumentComponent,
    FilteroppComponent,
    //Options
    OptionsComponent,
    CompanyComponent,
    ActionopportunityComponent,
    ActionopportunitytemplateemailComponent,
    OpptypeComponent, OpptypestatusComponent,

    //Customer
    CustomerComponent,
    CustomerindexComponent , 
    CustomereditorComponent,
    CustomerbaseComponent,
    CustomereditorheaderComponent,
    CustomerbrokerComponent,
    CustomercontactComponent,
    CustomerdeliverypointComponent,
    CustomerdocumentComponent,
    CustomermarketComponent,
    CustomersectorComponent,
    CustomerproductComponent,
    CustomerrailspurComponent,    
    CustomerproductpriceComponent,
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
    OpportunitydetailsumaryComponent,
    OpportunitydialogemailComponent,

   // Quotation to supplier
   QuotationfromsupplierComponent,
   QuotationfromsupplierindexComponent,
   QuotationfromsupplierindexviewerComponent,
   QuotationfromsuppliereditorComponent,
   QuotationfromsupplierheaderComponent,
   QuotationfromsupplierdetailComponent,
   QuotationfromsupplierdetailsumaryComponent,
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
   QuotationtocustomerdialogemailComponent,



   //Purchase Order
   PurchaseorderComponent,
   PurchaseorderindexComponent,
   PurchaseorderindexviewerComponent,
   PurchaseordereditorComponent, 
   PurchaseordereditorheaderComponent,
   PurchaseordereditordetailComponent,
   PurchaseordereditordetailsumaryComponent,
   PurchaseordereditorFromQTSComponent,
   PurchaseorderdialogemailComponent,
// Components
  // Cbx Components
    CRMSelectComponent, CrmselectchildComponent,
    GenericActionsComponent, EmailSenderComponent,
    EditordetailsumaryComponent,
    EditorbasedialogComponent,  
    EditorbasedialogdocumentComponent,
    DocumentviewerComponent,
    QuotationindexviewerComponent,
    // Directives
    CRMCurrencyPipe, CRMCurrencyFormatterDirective,

// Shipping
    ShippingComponent,
    ShippingindexComponent,
    ShippingindexviewerComponent,
    ShippingeditorComponent,
    ShippingeditorFromPOComponent,
    ShippingeditorheaderComponent,
    ShippingeditordetailComponent,
    ShippingdialogemailComponent,
    
    NameDescPipe,
    MaxStringPipe
    

  ], // directives, components, and pipes owned by this NgModule
  imports: [
    SharedModule,
    RouterModule,
    CKEditorModule,
    //Md2Module,
    //TextMaskModule,
    CurrencyMaskModule,
    HttpClientModule,
    HttpLinkModule,
    ApolloModule
  ], // modules needed to run this module
  exports: [
       SharedModule,
      // Md2Module,
       CKEditorModule,

    
      //  GenericActionsComponent,
      //  //TextMaskModule
        MainmenuComponent,

  ],
  providers: [
     ActionsService, CatalogService, ConfigurationService, CurrencyPipe,
     CRMCurrencyPipe, CRMCurrencyFormatterDirective,
     CrmcustomdialogComponent,
    // OpportunityService,
     TokenService,
     AuthGuard, AuthHelper,
     OnedrivegraphService, 
     SharedataService,


  ], // additional providers needed for this module
  entryComponents: [


   CrmcustomdialogComponent,
   DialogOverviewResponsiblePswDialog,
   EmailSenderDialogComponent
  ],

  bootstrap: [  ],

})
export class CRMModule {

  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    _conf: ConfigurationService
  ) {
  
  
    const http = httpLink.create({ uri:  environment.server + 'api/graphql' });

    const middleware = setContext(() => ({
      headers: new HttpHeaders().set('Authorization', _conf.getToken() )
    }));



    const cache = new InMemoryCache();
    const link = middleware.concat(http);
    apollo.create({
       link: link,
       cache: cache
      //http
    });
  }


}
