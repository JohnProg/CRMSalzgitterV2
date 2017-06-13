import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthGuard } from './crmapp/_guards/auth.guard';

import { BaseComponent, CatalogComponent, CurrencyComponent, ColonytypeComponent, DepartmentComponent,
DocumentTypeComponent, FamilyComponent, LinerTermComponent, MarketComponent, MillComponent, OrganizationComponent,
PaymentTermComponent, PortComponent, PositionComponent, PropertyComponent, SectorComponent, TenderComponent,
ActionoppComponent, CountryComponent, TransactionflowComponent, StateComponent, IncotermComponent,
TemplateemailComponent, TypeOpportunityComponent } from './crmapp/catalogs/index';

import { OptionsComponent, ActionopportunityComponent, ProductComponent, ProductindexComponent,
   ProducteditorComponent } from './crmapp/options/index';

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
   PurchaseordereditorComponent
} from './crmapp/purchaseorder/index';

import { LoginComponent } from './crmapp/login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: '', 
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
        {
          component: DashboardComponent,
          path: '',
        },
        {
          path: 'catalogs', component: CatalogComponent,
          canActivate: [AuthGuard],
          children: [

            { path: 'currency', component: CurrencyComponent },
            { path: 'colonytype', component: CurrencyComponent }, //, data: { baseapi: 'ColonyType', catName: 'Colony Type' } },
            { path: 'department', component: DepartmentComponent },
            { path: 'documenttype', component: DocumentTypeComponent },
            { path: 'family', component: FamilyComponent },
            { path: 'linerterm', component: LinerTermComponent },
            { path: 'market', component: MarketComponent },
            { path: 'mill', component: MillComponent },
            { path: 'organization', component: OrganizationComponent },
            { path: 'paymentterm', component: PaymentTermComponent },
            { path: 'port', component: PortComponent },
            { path: 'position', component: PositionComponent },
            { path: 'property', component: PropertyComponent },
            { path: 'sector', component: SectorComponent },
            { path: 'tender', component: TenderComponent },
            { path: 'actionopp', component: ActionoppComponent },
            { path: 'country', component: CountryComponent },
            { path: 'state', component: StateComponent },
            { path: 'incoterm', component: IncotermComponent },
            { path: 'transactionflow', component: TransactionflowComponent },
            { path: 'templateemail', component: TemplateemailComponent },
            { path: 'typeopportunity', component: TypeOpportunityComponent },

          ]
        },
        {
          path: 'options', component: OptionsComponent,
          canActivate: [AuthGuard],
          children: [
            //{ path: 'company', component: CompanyComponent },
            { path: 'actionopp', component: ActionopportunityComponent },
            {
              path: 'products',
              component: ProductComponent,
              children: [
                { path: '', component: ProductindexComponent },
                { path: 'edit/:id', component: ProducteditorComponent },

              ]
            },
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
            { path: 'sendemail/:id', component: OpportunitydialogemailComponent },
            { path: 'insert', component: OpportunityeditorComponent }
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
            { path: 'edit/:id', component: QuotationfromsuppliereditorComponent,
              children: [

              ]
            },
            { path: 'createfromopp/:id', component: QuotationfromsuppliereditorFromOppComponent,
              children: [

              ]
            },        
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
            { path: 'createfromquote/:id', component: QuotationtocustomereditorFromQFSComponent,
              children: [

              ]
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
            { path: 'edit/:id', component: PurchaseordereditorComponent,
              children: [

              ]
            },
            { path: 'createfromquote/:id', component: QuotationtocustomereditorFromQFSComponent,
              children: [

              ]
            },        
            { path: 'sendemail/:id', component: QuotationtocustomerdialogemailComponent },
            { path: 'insert', component: QuotationfromsuppliereditorComponent }
          ]
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
    DashboardComponent, 
];
