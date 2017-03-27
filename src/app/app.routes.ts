import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardProductComponent } from './dashboard-product/dashboard-product.component';
import { ProductOverviewComponent } from './dashboard-product/overview/overview.component';
import { ProductStatsComponent } from './dashboard-product/stats/stats.component';
import { ProductFeaturesComponent } from './dashboard-product/features/features.component';
import { FeaturesFormComponent } from './dashboard-product/features/form/form.component';
import { UsersComponent } from './users/users.component';
import { UsersFormComponent } from './users/form/form.component';
import { LogsComponent } from './logs/logs.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './form/form.component';
import { TemplatesComponent } from './templates/templates.component';
import { DashboardTemplateComponent } from './templates/dashboard/dashboard.component';
import { EmailTemplateComponent } from './templates/email/email.component';
import { EditorTemplateComponent } from './templates/editor/editor.component';



// catalogs
import { CatalogComponent } from './crmapp/catalogs/catalog.component';
import { OptionsComponent } from './crmapp/options/options.component';
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
import { ProductComponent } from './crmapp/options/product/product.component';
import { ProductindexComponent } from './crmapp/options/product/productindex/productindex.component';
import { ProducteditorComponent } from './crmapp/options/product/producteditor/producteditor.component';
//import { CompanyComponent } from './crmapp/options/company/company.component';



const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: MainComponent, children: [{
      component: DashboardComponent,
      path: '',
    },
    {path: 'product', component: DashboardProductComponent, children: [
      {path: '', component: ProductOverviewComponent},
      {path: 'stats', component: ProductStatsComponent},
      {path: 'features', children: [
        {path: '', component: ProductFeaturesComponent},
        {path: 'add', component: FeaturesFormComponent},
        {path: ':id/delete', component: FeaturesFormComponent},
        {path: ':id/edit', component: FeaturesFormComponent},
      ]},
    ]},
    {path: 'item/:id', component: DetailComponent},
    {path: 'logs', component: LogsComponent},
    {path: 'form', component: FormComponent},
    {path: 'users', children: [
      {path: '', component: UsersComponent},
      {path: 'add', component: UsersFormComponent},
      {path: ':id/delete', component: UsersFormComponent},
      {path: ':id/edit', component: UsersFormComponent},
    ]},
    {path: 'templates', children: [
      {path: '', component: TemplatesComponent},
      {path: 'dashboard', component: DashboardTemplateComponent},
      {path: 'email', component: EmailTemplateComponent},
      {path: 'editor', component: EditorTemplateComponent},
    ]},

 {
        path: 'catalogs', component: CatalogComponent,
        children: [
            { path: 'currency', component: CurrencyComponent },
            { path: 'colonytype', component: ColonytypeComponent },
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
            
        ]  
      },
      {
        path: 'options', component: OptionsComponent,
        children: [
            //{ path: 'company', component: CompanyComponent },
            { 
              path: 'products', 
              component: ProductComponent,
              children: [
                { path: '', component: ProductindexComponent },   
                { path: 'edit/:id', component: ProducteditorComponent }
              ]
            },
        ]
      },          
  ]},
];

export const appRoutingProviders: any[] = [

];

export const appRoutes: any = RouterModule.forRoot(routes, { useHash: true });
