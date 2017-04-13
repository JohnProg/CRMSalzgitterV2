import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';




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
import { OpportunityComponent } from './crmapp/opportunity/opportunity.component';
import { OpportunityindexComponent } from './crmapp/opportunity/opportunityindex/opportunityindex.component';
import { OpportunityeditorComponent } from './crmapp/opportunity/opportunityeditor/opportunityeditor.component';




const routes: Routes = [
  //{ path: 'login', component: LoginComponent },
  {
    path: '', component: MainComponent, children: [{
      component: DashboardComponent,
      path: '',
    },


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
    {
      path: 'opportunity', component: OpportunityComponent,
      children: [
        {
          path: '',
          component: OpportunityindexComponent
        },

        { path: 'edit/:id', component: OpportunityeditorComponent },
        { path: 'insert', component: OpportunityeditorComponent }
      ]
    },
     ]
  },
];

export const appRoutingProviders: any[] = [

];

export const appRoutes: any = RouterModule.forRoot(routes, { useHash: true });
