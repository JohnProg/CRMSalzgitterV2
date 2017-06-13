export const environment: {production: boolean, server: string, appBase: string,
       _secret: string, _clientId: string, _scopes: Array<string>, 
       _redirectUrl: string,
       _root: string,
       GRAPH_RESOURCE: string,
       baseHref: string} = {
  production: true,
  //server: 'http://localhost/CRMSalzgitter.Services/',
  //appBase: 'http://localhost/crmsalzgitterprod',
   server: 'https://crmsalzgittermx.com/testservices/',
   appBase: 'https://crmsalzgittermx.com/testmaterial/',
  _secret: 'MsuUTgxpHzVyQmxiU8N1qBV',
  _clientId: '000000004C1D164D',
  _scopes:   [ 'wl.skydrive',  'wl.skydrive_update'],
  _redirectUrl: 'https://localhost:4200/auth/onedrive',
  _root: 'https://crmsalzgittermx.com/testmaterial/',
  GRAPH_RESOURCE: 'https://graph.microsoft.com',
  baseHref: '/testmaterial/'  
};
