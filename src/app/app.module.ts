import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CovalentCoreModule } from '@covalent/core';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { appRoutes, appRoutingProviders } from './app.routes';

import { RequestInterceptor } from '../config/interceptors/request.interceptor';

import { NgxChartsModule } from '@swimlane/ngx-charts';

const httpInterceptorProviders: Type<any>[] = [
  RequestInterceptor,
];



//catalogs
import { BaseComponent } from './crmapp/catalogs/base.component';
import { CatalogComponent } from './crmapp/catalogs/catalog.component';
import { CurrencyComponent } from './crmapp/catalogs/currency/currency.component';
import { ColonytypeComponent } from './crmapp/catalogs/genericcatalogs/colonytype.component';
import { DepartmentComponent } from './crmapp/catalogs/genericcatalogs/department.component';
import { DocumentTypeComponent } from './crmapp/catalogs/genericcatalogs/documenttype.component';
import { FamilyComponent } from './crmapp/catalogs/genericcatalogs/family.component';
import { LinerTermComponent } from './crmapp/catalogs/genericcatalogs/linerterm.component';
import { MarketComponent } from './crmapp/catalogs/genericcatalogs/market.component';
import { MillComponent } from './crmapp/catalogs/genericcatalogs/mills.component';
import { OrganizationComponent } from './crmapp/catalogs/genericcatalogs/organization.component';
import { PaymentTermComponent } from './crmapp/catalogs/genericcatalogs/paymentterm.component';
import { PortComponent } from './crmapp/catalogs/genericcatalogs/port.component';
import { PositionComponent } from './crmapp/catalogs/genericcatalogs/position.component';
import { PropertyComponent } from './crmapp/catalogs/genericcatalogs/property.component';
import { SectorComponent } from './crmapp/catalogs/genericcatalogs/sector.component';
import { TenderComponent } from './crmapp/catalogs/genericcatalogs/tender.component';
import { ActionoppComponent } from './crmapp/catalogs/actionopp/actionopp.component';
import { CountryComponent } from './crmapp/catalogs/genericcatalogs/country.component';
import { StateComponent } from './crmapp/catalogs/state/state.component';
import { IncotermComponent } from './crmapp/catalogs/incoterm/incoterm.component';

//options
import { OptionsComponent } from './crmapp/options/options.component';
import { CompanyComponent } from './crmapp/options/company/company.component';

// Products
import { ProductComponent } from './crmapp/options/product/product.component';
import { ProducteditorComponent } from './crmapp/options/product/producteditor/producteditor.component';
import { ProductpropertyComponent } from './crmapp/options/product/productproperty/productproperty.component';
import { ProductindexComponent } from './crmapp/options/product/productindex/productindex.component';

// cbx Components

import { CRMSelectComponent } from './crmapp/components/crmselect/crmselect.component';
import { OpportunityComponent } from './crmapp/opportunity/opportunity.component';
import { OpportunityindexComponent } from './crmapp/opportunity/opportunityindex/opportunityindex.component';
import { OpportunityeditorComponent } from './crmapp/opportunity/opportunityeditor/opportunityeditor.component';
import { CrmselectchildComponent } from './crmapp/components/crmselectchild/crmselectchild.component';
import { OpportunitydetailComponent } from './crmapp/opportunity/opportunityeditor/+opportunitydetail/opportunitydetail.component';
import { OpportunityheaderComponent } from './crmapp/opportunity/opportunityeditor/+opportunityheader/opportunityheader.component';
import { OpportunitydialogsComponent } from './crmapp/opportunity/opportunityeditor/+opportunitydialogs/opportunitydialogs.component';
import { OpportunitydocumentsComponent } from './crmapp/opportunity/opportunityeditor/+opportunitydocuments/opportunitydocuments.component';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,



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
// Cbx Components
    CRMSelectComponent,
    OpportunityComponent,
    OpportunityindexComponent,
    OpportunityeditorComponent,
    CrmselectchildComponent,
    OpportunitydetailComponent,
    OpportunityheaderComponent,
    OpportunitydialogsComponent,
    OpportunitydocumentsComponent,


  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CovalentCoreModule,
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    appRoutes,
    NgxChartsModule,
  ], // modules needed to run this module
  providers: [
    appRoutingProviders,
    httpInterceptorProviders,
    Title,
  ], // additional providers needed for this module
  entryComponents: [ ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
