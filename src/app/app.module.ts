import { NgModule, Type } from '@angular/core';
import { BrowserModule, Title }  from '@angular/platform-browser';

import { CovalentCoreModule } from '@covalent/core';
import { CovalentHttpModule, IHttpInterceptor } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentChartsModule } from '@covalent/charts';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { UsersFormComponent } from './users/form/form.component';
import { UsersFormComponent2 } from './users/+form/form.component';
import { LogsComponent } from './logs/logs.component';
import { FormComponent } from './form/form.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
import { ProductOverviewComponent } from './dashboard-product/overview/overview.component';
import { ProductStatsComponent } from './dashboard-product/stats/stats.component';
import { ProductFeaturesComponent } from './dashboard-product/features/features.component';
import { FeaturesFormComponent } from './dashboard-product/features/form/form.component';
import { FeaturesFormComponent2 } from './dashboard-product/features/+form/form.component';
import { TemplatesComponent } from './templates/templates.component';
import { DashboardTemplateComponent } from './templates/dashboard/dashboard.component';
import { EmailTemplateComponent } from './templates/email/email.component';
import { EditorTemplateComponent } from './templates/editor/editor.component';
import { appRoutes, appRoutingProviders } from './app.routes';
import { ButtonDisableFix } from '../directives/button-disable-fix.directive';


import { ChartComponent } from '../components/chart/chart.component';

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
import { CbxstatusoppComponent } from './crmapp/components/cbxstatusopp/cbxstatusopp.component';
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

import { CbxcolonyComponent } from './crmapp/components/cbxcolony/cbxcolony.component';
import { CbxfamilyComponent } from './crmapp/components/cbxfamily/cbxfamily.component';
import { CbxcountryComponent } from './crmapp/components/cbxcountry/cbxcountry.component';




@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DashboardComponent,
    DashboardProductComponent,
    ProductOverviewComponent,
    ProductStatsComponent,
    ProductFeaturesComponent,
    FeaturesFormComponent,
    FeaturesFormComponent2,
    UsersComponent,
    UsersFormComponent,
    UsersFormComponent2,
    LogsComponent,
    FormComponent,
    DetailComponent,
    LoginComponent,
    ChartComponent,
    TemplatesComponent,
    DashboardTemplateComponent,
    EmailTemplateComponent,
    EditorTemplateComponent,
ButtonDisableFix,

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
    CbxfamilyComponent,
    CbxcountryComponent,
    CbxcolonyComponent,
    CbxstatusoppComponent,

        
  ], // directives, components, and pipes owned by this NgModule
  imports: [
    BrowserModule,
    CovalentCoreModule.forRoot(),
    CovalentChartsModule.forRoot(),
    CovalentHttpModule.forRoot({
      interceptors: [{
        interceptor: RequestInterceptor, paths: ['**'],
      }],
    }),
    CovalentHighlightModule.forRoot(),
    CovalentMarkdownModule.forRoot(),
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
