import { NgModule, Type } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrencyPipe } from '@angular/common';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { CKEditorModule } from 'ng2-ckeditor';
import { Md2Module }  from 'md2';
import { TextMaskModule } from 'angular2-text-mask';
import { SharedModule } from '../shared/shared.module';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';
import { environment } from '../../environments/environment';

// services 
import { OpportunityService, ActionsService, CatalogService, 
  ConfigurationService, TokenService } from './services/index';


const networkInterface = createNetworkInterface({
  uri: environment.server + 'api/graphql',
});

networkInterface.use([{
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
}]);

// by default, this client will send queries to `/graphql` (relative to the URL of your app)
export const client: ApolloClient = new ApolloClient({ networkInterface  });




export function provideClient(): ApolloClient {
  return client;
}




//catalogs
import { BaseComponent, CatalogComponent, CurrencyComponent,  
  ActionoppComponent, StateComponent, IncotermComponent,
  TemplateemailComponent, BaseOppComponent
 } from './catalogs/index';


import { 
  //options
  OptionsComponent, CompanyComponent, 
  // Products
  ProductComponent, ProducteditorComponent, ProductpropertyComponent,
  ProductindexComponent, ActionopportunityComponent, ActionopportunitytemplateemailComponent } from './options/index';



// cbx Components

import { CRMSelectComponent, GenericActionsComponent, 
  CrmselectchildComponent, EmailSenderComponent,
  EditordetailsumaryComponent, EditorbasedialogComponent,
  EditorbasedialogdocumentComponent,
  DocumentviewerComponent } from './components/index';

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

   } from './purchaseorder/index';

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
    CatalogComponent,
    TemplateemailComponent,
    BaseOppComponent,
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

// Components
  // Cbx Components
    CRMSelectComponent, CrmselectchildComponent,
    GenericActionsComponent, EmailSenderComponent,
    EditordetailsumaryComponent,
    EditorbasedialogComponent,  
    EditorbasedialogdocumentComponent,
    DocumentviewerComponent,
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
    CurrencyMaskModule,
    ApolloModule.forRoot(provideClient),
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
