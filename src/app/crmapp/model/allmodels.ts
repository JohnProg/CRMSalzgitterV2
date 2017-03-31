

export class TCRMEntity  {
  Id: number;
  Name: string;
  Description: string;
  NameDescription: string;
  
  EmailType: string;
  Selected: boolean;
  RecordStatus: number;
  AccessToken: string;
  AuthenticationToken: string;
  ClientID: string;
  RedirectURL: string;
  WLJsPath: string;
}

export class Currency extends TCRMEntity {

}

export class Product extends TCRMEntity {

}

export class Property extends TCRMEntity {}
export class ProductProperty extends TCRMEntity {
   Property : Property;
}

export class GetProductProperty extends TCRMEntity {
   POrder: number;
   IsRequired: boolean;
}

export class Company extends TCRMEntity {
   zipCode: string;
}

export class IncoTerm extends TCRMEntity {

}

export class State extends TCRMEntity {
   IdCountry: number;

}

export class ActionOpportunity extends TCRMEntity {
  
}