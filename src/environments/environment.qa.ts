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
    rootDocBase: string
        } = {
  
    production: true,
     server: 'https://crmsalzgittermx.com/testservices/',
     appBase: 'https://crmsalzgittermx.com/testmaterial/',
    _secret: 'OXioRQ5XwYGUFKW5AdE9AXs',
    _clientId: '000000004C1F2315',
    _scopes:   'openid profile User.ReadWrite User.ReadBasic.All Files.ReadWrite.All', //"user.read 0mail.read",
    _redirectUrl: 'https://crmsalzgittermx.com/testmaterial',
    _root: 'https://crmsalzgittermx.com/testmaterial/',
    GRAPH_RESOURCE: 'https://graph.microsoft.com',
    baseHref: '/testmaterial/',
    dateFormat: 'YYYY.MM.DD',
    oneDriveBase: 'https://graph.microsoft.com/v1.0/',
    oneDriveRootCustomer: 'CustomerDocumentV2',
    rootDocBase: 'QA'
  };
  