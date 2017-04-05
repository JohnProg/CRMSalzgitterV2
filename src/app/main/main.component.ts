import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'crm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {

  routes: Object[] = [

/*    {
      title: 'Dashboard',
      route: '/',
      icon: 'dashboard',
    }, {
      title: 'Product Dashboard',
      route: '/product',
      icon: 'view_quilt',
    }, {
      title: 'Product Logs',
      route: '/logs',
      icon: 'receipt',
    }, {
      title: 'Manage Users',
      route: '/users',
      icon: 'people',
    }, {
      title: 'Covalent Templates',
      route: '/templates',
      icon: 'view_module',
    },*/

      {
        title: 'Catalogs',
        route: '/catalogs',
        icon: 'euro_symbol',
        childrens: [
          {
                name: 'currency',
                tooltip: 'Create edit Currencies',
                active: true,
                routerlink: 'currency',
                icon: 'euro_symbol',
                displayName: 'Currency',
              },
              {
                name: 'colonytype',
                tooltip: 'Create edit Colonies Type',
                active: true,
                routerlink: 'colonytype',
                icon: 'euro_symbol',
                displayName: 'Colony Type',
              },
              {
                name: 'country',
                tooltip: 'Create edit Countries',
                active: true,
                routerlink: 'country',
                icon: 'euro_symbol',
                displayName: 'Countries',
              },
              {
                name: 'department',
                tooltip: 'Create edit Departments',
                active: true,
                routerlink: 'department',
                icon: 'euro_symbol',
                displayName: 'Departments',
              },
              {
                name: 'documenttype',
                tooltip: 'Create edit Document Type',
                active: true,
                routerlink: 'documenttype',
                icon: 'euro_symbol',
                displayName: 'Document Type',
              },
              {
                name: 'family',
                tooltip: 'Create edit Families',
                active: true,
                routerlink: 'family',
                icon: 'euro_symbol',
                displayName: 'Families',
              }, 
              {
                name: 'linerterm',
                tooltip: 'Create edit Liner Term',
                active: true,
                routerlink: 'linerterm',
                icon: 'euro_symbol',
                displayName: 'Liner Term',
              }, 
              {
                name: 'market',
                tooltip: 'Create edit Market',
                active: true,
                routerlink: 'market',
                icon: 'euro_symbol',
                displayName: 'Market',
              },   
              {
                name: 'mill',
                tooltip: 'Create edit Mills',
                active: true,
                routerlink: 'mill',
                icon: 'euro_symbol',
                displayName: 'Mills',
              }, 
              {
                name: 'organization',
                tooltip: 'Create edit Organization',
                active: true,
                routerlink: 'organization',
                icon: 'euro_symbol',
                displayName: 'Organization',
              }, 
              {
                name: 'paymentterm',
                tooltip: 'Create edit Payment Term',
                active: true,
                routerlink: 'paymentterm',
                icon: 'euro_symbol',
                displayName: 'Payment Term',
              }, 
              {
                name: 'port',
                tooltip: 'Create edit Port',
                active: true,
                routerlink: 'port',
                icon: 'euro_symbol',
                displayName: 'Port',
              }, 
              {
                name: 'position',
                tooltip: 'Create edit Position',
                active: true,
                routerlink: 'position',
                icon: 'euro_symbol',
                displayName: 'Position',
              }, 
              {
                name: 'sector',
                tooltip: 'Create edit Sector',
                active: true,
                routerlink: 'sector',
                icon: 'euro_symbol',
                displayName: 'Sector',
              }, 
              {
                name: 'tender',
                tooltip: 'Create edit Tender',
                active: true,
                routerlink: 'tender',
                icon: 'euro_symbol',
                displayName: 'Tender',
              },      

      ],

    },
    {
      title: 'Options',
      route: '/options',
      icon: 'euro_symbol',
      childrens: [
          {
            name: 'products',
            tooltip: 'Create edit Product',
            active: true,
            routerlink: 'products',
            icon: 'euro_symbol',
            displayName: 'Product',
          },
          {
            name: 'company',
            tooltip: 'Create edit Company',
            active: true,
            routerlink: 'company',
            icon: 'euro_symbol',
            displayName: 'Company',
          },
      ]
    },
  ];

  constructor(private _router: Router) {}

  logout(): void {
    this._router.navigate(['/login']);
  }
}
