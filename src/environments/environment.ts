// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment: {
  production: boolean, 
  server: string, 
  appBase: string,
  _secret: string, 
  _clientId: string, 
  _scopes: string, 
  _redirectUrl: string,
  _root: string,
  GRAPH_RESOURCE: string,
  baseHref: string,
  dateFormat: string,
  oneDriveBase: string,
  oneDriveRootCustomer: string,
  rootDocBase: string,
  layoutColor: string
  } = {
  production: false,
  appBase: 'http://localhost:4200/',
  server: 'http://localhost:64997/',
  //server: 'http://localhost:64997/',
  //server: 'http://localhost/CRM.Salzgitter.Services/',
  //server: 'https://crmsalzgittermx.com/qa/testservices/',
  _secret: 'MsuUTgxpHzVyQmxiU8N1qBV',
  _clientId: '000000004C1D164D',
  _scopes:   'openid profile User.ReadWrite User.ReadBasic.All Files.ReadWrite.All',
  _redirectUrl: 'http://localhost:4200',
  _root: 'http://localhost:4200',
  GRAPH_RESOURCE: 'https://graph.microsoft.com',
  baseHref: '/',
  dateFormat: 'YYYY.MM.DD',
  oneDriveBase: 'https://graph.microsoft.com/beta/',
  oneDriveRootCustomer: 'CustomerDocumentV2',
  rootDocBase: 'DEV',
  layoutColor: 'warn'
};
