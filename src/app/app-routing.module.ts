import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './crmapp/_guards/auth.guard';

import { BaseComponent, CatalogComponent, CurrencyComponent, 
ActionoppComponent,  StateComponent, IncotermComponent,
TemplateemailComponent, MillComponent } from './crmapp/catalogs/index';


import { OptionsComponent, 
  CompanyComponent,
  ActionopportunityComponent, 
  ProductComponent, ProductindexComponent,
   ProducteditorComponent,
  CustomerComponent,
    CustomerindexComponent,
    CustomereditorComponent,
    OpptypeComponent,  

} from './crmapp/options/index';

import { OpportunityComponent, OpportunityindexComponent, OpportunityeditorComponent,
OpportunitydetailComponent, OpportunityheaderComponent, 
 OpportunitydialogemailComponent } from './crmapp/opportunity/index';


// Quotation to supplier

import { QuotationfromsupplierComponent, QuotationfromsupplierindexComponent, 
    QuotationfromsuppliereditorComponent, QuotationfromsupplierdialogemailComponent,
    QuotationfromsuppliereditorFromOppComponent
  
 } from './crmapp/quotationfromsupplier/index';

//Quotation to Customer
import { QuotationtocustomerComponent,
  QuotationtocustomerindexComponent, QuotationtocustomereditorComponent,
  QuotationtocustomereditorFromQFSComponent, QuotationtocustomerdialogemailComponent
 } from './crmapp/quotationtocustomer/index';

// Purchase Order
import {
   PurchaseorderComponent, PurchaseorderindexComponent,
   PurchaseordereditorComponent, PurchaseordereditorFromQTSComponent, PurchaseorderdialogemailComponent
} from './crmapp/purchaseorder/index';

// shippings
import { ShippingComponent, ShippingindexComponent, ShippingeditorComponent, ShippingeditorFromPOComponent } from './crmapp/shipping/index';

import { LoginComponent } from './crmapp/login/login.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: '', component: MainComponent },
  {
    path: '', component: MainComponent, 
    children: [
  
        {
          component: DashboardComponent,
          path: '',
          canActivate: [AuthGuard]
        }
  ]
} ,
{
  path: 'catalogs', component: CatalogComponent,
  canActivate: [AuthGuard],
  children: [


    { path: 'currency', component: CurrencyComponent },
    { path: 'colonytype', component: BaseComponent, data: { baseapi: 'ColonyType', catName: 'Colony Type' } },
    { path: 'department', component: BaseComponent, data: { baseapi: 'Department', catName: 'Department' } },
    { path: 'documenttype', component: BaseComponent, data: { baseapi: 'DocumentType', catName: 'Document Type' } },
    { path: 'family', component: BaseComponent, data: { baseapi: 'Family', catName: 'Families' } },
    { path: 'linerterm', component: BaseComponent, data: { baseapi: 'LinerTerm', catName: 'Liner Term' } },
    { path: 'market', component: BaseComponent, data: { baseapi: 'Market', catName: 'Market' } },
    { path: 'mill', component: MillComponent },
    { path: 'organization', component: BaseComponent, data: { baseapi: 'Organization', catName: 'Organization' } },
    { path: 'paymentterm', component: BaseComponent, data: { baseapi: 'PaymentTerm', catName: 'Payment Term' } },
    { path: 'port', component: BaseComponent, data: { baseapi: 'Port', catName: 'Port' } },
    { path: 'position', component: BaseComponent, data: { baseapi: 'Position', catName: 'Position' } },
    { path: 'property', component: BaseComponent, data: { baseapi: 'Property', catName: 'Properties' } },
    { path: 'sector', component: BaseComponent, data: { baseapi: 'Sector', catName: 'Sector' } },
    { path: 'tender', component: BaseComponent, data: { baseapi: 'Tender', catName: 'Tender' } },
    { path: 'actionopp', component: ActionoppComponent, data: { baseapi: 'ActionOpportunity', catName: 'Opportunity Action' } },
    { path: 'country', component: BaseComponent, data: { baseapi: 'Country', catName: 'Country' } },
    { path: 'state', component: StateComponent },
    { path: 'incoterm', component: IncotermComponent },
    { path: 'transactionflow', component: BaseComponent, data: { baseapi: 'TransactionFlow', catName: 'Transaction Flow' } },
    { path: 'templateemail', component: TemplateemailComponent },
    { path: 'typeopportunity', component: BaseComponent, data: { baseapi: 'TypeOpportunity', catName: 'Type Opportunity' } },
    { path: 'status', component: BaseComponent, data: { baseapi: 'EstatusOpportunity', catName: 'Status' } },
    { path: 'properties', component: BaseComponent, data: { baseapi: 'Property', catName: 'Properties' } },
    
  ]
},
{
  path: 'opportunity', component: OpportunityComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: OpportunityindexComponent
    },
  
    { path: 'edit/:id', component: OpportunityeditorComponent,
      children: [
        //{ path: '', component: OpportunityheaderComponent },
        {
          path: 'edit/:id', component: OpportunityeditorComponent,
        }

      ]
    },
    { path: 'sendemail/:id', component: OpportunitydialogemailComponent},
    
    { path: 'insert', component: OpportunityeditorComponent }
  ]
},
{
  path: 'options', component: OptionsComponent,
  canActivate: [AuthGuard],
  children: [
    { path: 'company', component: CompanyComponent },
    { path: 'actionopp', component: ActionopportunityComponent },
    {
      path: 'products',
      component: ProductComponent,
      children: [
        { path: '', component: ProductindexComponent },
        { path: 'edit/:id', component: ProducteditorComponent },

      ]
    },
    {
      path: 'customer',
      component: CustomerComponent,
      children: [
        { path: '', component: CustomerindexComponent },
        { path: 'edit/:id', component: CustomereditorComponent },
      ]
    },
    { path: 'doctype', component: OpptypeComponent }
  ]
},

{
  path: 'quotationfromsupplier', component: QuotationfromsupplierComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: QuotationfromsupplierindexComponent
    },
    {
      path: 'fromopp/:id',
      component: QuotationfromsupplierindexComponent
    },          
    { path: 'edit/:id', component: QuotationfromsuppliereditorComponent },
    { path: 'createfromquote/:id', component: QuotationfromsuppliereditorFromOppComponent },        
    { path: 'sendemail/:id', component: QuotationfromsupplierdialogemailComponent },
    { path: 'insert', component: QuotationfromsuppliereditorComponent }
  ]
},    
//Quotation to Customer
{
  path: 'quotationtocustomer', component: QuotationtocustomerComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: '',
      component: QuotationtocustomerindexComponent,
    },
    {
      path: 'fromopp/:id',
      component: QuotationtocustomerindexComponent
    },          
    { path: 'edit/:id', component: QuotationtocustomereditorComponent,
      children: [

      ]
    },
    { path: 'createfromquote/:id', component: QuotationtocustomereditorFromQFSComponent
    },        
    { path: 'sendemail/:id', component: QuotationtocustomerdialogemailComponent },
    { path: 'insert', component: QuotationfromsuppliereditorComponent }
  ]
},

//Purchase Order
{
  path: 'purchaseorder', component: PurchaseorderComponent,
  canActivate: [AuthGuard],          
  children: [
    {
      path: '',
      component: PurchaseorderindexComponent,
    },
    {
      path: 'from/:id/:bytype',
      component: PurchaseorderindexComponent,
    },
    { 
      path: 'edit/:id', 
      component: PurchaseordereditorComponent
    },
    { 
      path: 'createfromquote/:id', 
      component: PurchaseordereditorFromQTSComponent
    },        
    { path: 'sendemail/:id', component: PurchaseorderdialogemailComponent }
  ]
},
//Shipping
{
  path: 'shipping', component: ShippingComponent,
  canActivate: [AuthGuard],          
  children: [
    {
      path: '',
      component: ShippingindexComponent,
    },
    {
      path: 'createfromquote/:id',
      component: ShippingeditorFromPOComponent,
    },           
    { path: 'edit/:id', component: ShippingeditorComponent
    }
  ]
}   
  
  
];



@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }
export const routedComponents: any[] = [
  MainComponent, LoginComponent,
  DashboardComponent
];
