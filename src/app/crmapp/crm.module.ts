import { NgModule, Type } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrencyPipe } from '@angular/common';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CKEditorModule } from 'ng2-ckeditor';

import { TextMaskModule } from 'angular2-text-mask';
import { SharedModule } from '../shared/shared.module';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';
import { environment } from '../../environments/environment';


// services 
import { OpportunityService, ActionsService, CatalogService, OnedrivegraphService,
  ConfigurationService, TokenService } from './services/index';


const networkInterface = createNetworkInterface({
  uri: environment.server + 'api/graphql',
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};  // Create the header object if needed.
      }
      // get the authentication token from local storage if it exists
      let t = localStorage.getItem('tokendata');
      if( t ) {
          let tokenData = JSON.parse(t);
          if( tokenData) {
              req.options.headers.authorization = tokenData.token_type + ' ' + tokenData.access_token;
          }
      }    
      

      next();
    }
  }
]);

// by default, this client will send queries to `/graphql` (relative to the URL of your app)
export const client: ApolloClient = new ApolloClient({ networkInterface });




export function provideClient(): ApolloClient {
  return client;
}




//catalogs
import { BaseComponent, CatalogComponent, CurrencyComponent,  
  ActionoppComponent, StateComponent, IncotermComponent,
  TemplateemailComponent, BaseOppComponent, MillComponent, MillcountryComponent
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

import { CRMSelectComponent, GenericActionsComponent, 
  CrmselectchildComponent, EmailSenderComponent,
  EditordetailsumaryComponent, EditorbasedialogComponent,
  EditorbasedialogdocumentComponent,
  DocumentviewerComponent,SelectcolonyComponent, QuotationindexviewerComponent,
  NameDescPipe, MaxStringPipe, EditordetailComponent, CrmcustomdialogComponent } from './components/index';

  
// Directives

import { CRMCurrencyPipe, CRMCurrencyFormatterDirective } from './directives/index';

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

   } from './purchaseorder/index';

// Shipping
import {ShippingComponent, ShippingindexComponent, 
  ShippingindexviewerComponent, 
  ShippingeditorComponent, 
  ShippingeditorheaderComponent,
  ShippingeditordetailComponent,
  ShippingeditorFromPOComponent
} from './shipping/index';

// Login
import { AuthGuard } from './_guards/auth.guard';



import * as moment from 'moment';

import { AuthHelper } from './authHelper/authHelper';




@NgModule({
  declarations: [


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
    
    NameDescPipe,
    MaxStringPipe
    

  ], // directives, components, and pipes owned by this NgModule
  imports: [
    TranslateModule,
    SharedModule,
    RouterModule,
    CKEditorModule,
    //Md2Module,
    //TextMaskModule,
    CurrencyMaskModule,
    ApolloModule.forRoot(provideClient),
  ], // modules needed to run this module
  exports: [
       SharedModule,
      // Md2Module,
       CKEditorModule,
       TranslateModule,
       GenericActionsComponent,
       //TextMaskModule
       

  ],
  providers: [
    ActionsService, CatalogService, ConfigurationService, CurrencyPipe,
    CRMCurrencyPipe, CRMCurrencyFormatterDirective,
    OpportunityService, TokenService,
    AuthGuard, AuthHelper, OnedrivegraphService, 
  ], // additional providers needed for this module
  entryComponents: [ CrmcustomdialogComponent ],

  bootstrap: [  ],

})
export class CRMModule {}
