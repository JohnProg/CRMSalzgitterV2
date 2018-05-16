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
  oneDriveBase: string ,
  oneDriveRootCustomer: string,
  rootDocBase: string,
  layoutColor: string
      } = {

  production: true,
   server: 'https://crmsalzgittermx.com/v2/services/',
   appBase: 'https://crmsalzgittermx.com/v2/crm/',
  _secret: 'jstCnZtZR2WN7XPzVxY8cw3',
  _clientId: '00000000401F4494',
  _scopes:   'openid profile User.ReadWrite User.ReadBasic.All Files.ReadWrite.All', //"user.read 0mail.read",
  _redirectUrl: 'https://crmsalzgittermx.com/v2/crm/',
  _root: 'https://crmsalzgittermx.com/v2/crm/',
  GRAPH_RESOURCE: 'https://graph.microsoft.com',
  baseHref: '/v2/',
  dateFormat: 'YYYY.MM.DD',
  oneDriveBase: 'https://graph.microsoft.com/v1.0/',
  oneDriveRootCustomer: 'CustomerDocumentV2',
  rootDocBase: 'PROD',
  layoutColor: 'primary'
};
