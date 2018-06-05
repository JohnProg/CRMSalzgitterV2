/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface ActionOpportunityDocTypeInputQL {
  id: number,
  idActionOpportunity: number,
  idDocType: number,
  idTemplateEmail: number,
  idStatus?: number | null,
  eMailTo?: number | null,
  actionClass?: string | null,
  beforeEMailClass?: string | null,
  afterEMailClass?: string | null,
};

export interface ActionOpportunityInputQL {
  id: number,
  name: string,
  description: string,
};

export interface BankInputQL {
  id: number,
  name: string,
  description: string,
};

export interface BrokerInputQL {
  id: number,
  name: string,
  agentNumber: string,
  contactName: string,
  eMail?: string | null,
  street?: string | null,
  number?: string | null,
  idColony: number,
  rFC?: string | null,
  phoneUSA?: string | null,
};

export interface CategoryLogInputQL {
  categoryLogID: number,
  categoryID: number,
  logID: number,
};

export interface CategoryInputQL {
  categoryID: number,
  categoryName: string,
};

export interface CityInputQL {
  id: number,
  idState: number,
  name: string,
  description: string,
};

export interface CollectionDataTypeInputQL {
  id: number,
  cType: number,
  name: string,
  description: string,
  applyTax: boolean,
  factor: string,
  asImporter: boolean,
};

export interface CollectionImporterRelationInputQL {
  id: number,
  asImporter: boolean,
  cType: number,
  idCollectionDataType: number,
};

export interface ColonyTypeInputQL {
  id: number,
  name: string,
  description: string,
};

export interface ColonyInputQL {
  id: number,
  idCity: number,
  zipCode: string,
  name: string,
  description: string,
  idColonyType: number,
};

export interface CompanyTargetInputQL {
  id: number,
  idCompany: number,
  targetYear: number,
  idFamily: number,
  target: string,
};

export interface CompanyInputQL {
  id: number,
  companyName: string,
  street: string,
  number: string,
  idColony: number,
  phone: string,
  fax?: string | null,
  legalResponsible: string,
  logo?: string | null,
  taxAmount?: string | null,
  rFC?: string | null,
};

export interface ContactInputQL {
  id: number,
  idOrganization: number,
  idDepartment: number,
  name: string,
  officePhone?: string | null,
  cellPhone?: string | null,
  eMail: string,
  isActive: boolean,
};

export interface CountryInputQL {
  id: number,
  name: string,
  description: string,
};

export interface CurrencyInputQL {
  id: number,
  name: string,
  description: string,
  aSign?: string | null,
};

export interface CustomerBrokerInputQL {
  id: number,
  idCustomer: number,
  idBroker: number,
};

export interface CustomerContactInputQL {
  id: number,
  idCustomer: number,
  name: string,
  idPosition: number,
  officePhone?: string | null,
  extension?: string | null,
  cellPhone?: string | null,
  email?: string | null,
  fechaNacimiento?: string | null,
  isActive: boolean,
  nickName?: string | null,
};

export interface CustomerDeliveryPointInputQL {
  id: number,
  idDeliveryType: number,
  idCustomer: number,
  cDPName: string,
  cDPStreet: string,
  idColony: number,
  cDPTelephone: string,
  cDPContact?: string | null,
  isActive: boolean,
};

export interface CustomerDocumentInputQL {
  id: number,
  idCustomer: number,
  docName: string,
  parentFolder: string,
  docId: string,
  dateUploaded: string,
  comment: string,
  idDocumentType: number,
};

export interface CustomerMarketInputQL {
  id: number,
  idCustomer: number,
  idMarket: number,
};

export interface CustomerProductExtendedInputQL {
  idCustomerProduct: number,
  customerName: string,
  buyerName: string,
  platform: string,
  partNumberOEM: string,
  partNumberBuyer?: string | null,
  eAU: string,
  prodDescription?: string | null,
  comments?: string | null,
};

export interface CustomerProductPriceInputQL {
  id: number,
  idCustomerProduct: number,
  validFrom: string,
  validTo: string,
  price: string,
  comments?: string | null,
};

export interface CustomerProductPropertyInputQL {
  id: number,
  idCustomerProduct: number,
  idProperty: number,
  propertyValue: string,
  comments?: string | null,
};

export interface CustomerProductInputQL {
  id: number,
  idCustomer: number,
  idProduct: number,
  isAutomotive: boolean,
  comments?: string | null,
  salesTons: number,
};

export interface CustomerRailSpurInputQL {
  id: number,
  idCustomer: number,
  idRailSpur: number,
};

export interface CustomerSectorInputQL {
  id: number,
  idCustomer: number,
  idSector: number,
};

export interface CustomerInputQL {
  id: number,
  name: string,
  street: string,
  number: string,
  idColony: number,
  phone?: string | null,
  rFC?: string | null,
  daysCredit: number,
  limitCreditUSA: string,
  limitCreditGermany: string,
  idResponsible: number,
  interestRate: string,
  isAutomotive: boolean,
  isActive: boolean,
  idCurrency: number,
  isTax: boolean,
};

export interface DeliveryTypeInputQL {
  id: number,
  name: string,
  description: string,
};

export interface DepartmentInputQL {
  id: number,
  name: string,
  description: string,
};

export interface DocTypeStatuInputQL {
  id: number,
  idDocType: number,
  idStatus: number,
  allowChild: boolean,
  isEditable: boolean,
};

export interface DocTypeInputQL {
  id: number,
  name: string,
  description: string,
  rootFolder?: string | null,
};

export interface DocumentTypeInputQL {
  id: number,
  name: string,
  description: string,
};

export interface EstatusOpportunityInputQL {
  id: number,
  name?: string | null,
  description: string,
};

export interface ExchangeRateInputQL {
  id: number,
  idCurrency: number,
  tDate: string,
  value: string,
};

export interface FamilyInputQL {
  id: number,
  name: string,
  description: string,
};

export interface IncoTermInputQL {
  id: number,
  name: string,
  description: string,
  deliveryRequired: boolean,
};

export interface LinerTermInputQL {
  id: number,
  name: string,
  description: string,
};

export interface LogInputQL {
  logId: number,
  eventId?: number | null,
  priority: number,
  severity?: string | null,
  title?: string | null,
  timestamp: string,
  machineName?: string | null,
  appDomainName?: string | null,
  processID?: string | null,
  processName?: string | null,
  threadName?: string | null,
  win32ThreadId?: string | null,
  message?: string | null,
  formattedMessage?: string | null,
};

export interface MarketInputQL {
  id: number,
  name: string,
  description: string,
};

export interface MessageTemplateInputQL {
  id: number,
  messageSubject: string,
  messageBody: string,
};

export interface MillCountryInputQL {
  id: number,
  idMill: number,
  idCountry: number,
};

export interface MillProductInputQL {
  id: number,
  idMill: number,
  idProduct: number,
};

export interface MillInputQL {
  id: number,
  name: string,
  description: string,
};

export interface OpportunityDetailSumaryPropertyInputQL {
  id: number,
  idOpportunityDetailSumary: number,
  idProperty: number,
  propertyValue?: string | null,
};

export interface OpportunityDetailSumaryInputQL {
  id: number,
  idOpportunityDetail: number,
  quantity: string,
  comment?: string | null,
  dateCreated: string,
  price: string,
  amount: string,
};

export interface OpportunityDetailInputQL {
  id: number,
  idOpportunity: number,
  idProduct: number,
  idCustomerProduct: number,
  itemDescription: string,
  itemQuantity: string,
  itemPrice: string,
  itemExtended: string,
  dateAdded: string,
};

export interface OpportunityDialogInputQL {
  id: number,
  idOpportunity: number,
  idAction: number,
  dateDialog: string,
  idResponsible: number,
  toContact: number,
  idContact?: number | null,
  idCustomerContact?: number | null,
  dNotes: string,
  emailSended: boolean,
  dateSend?: string | null,
  subject?: string | null,
};

export interface OpportunityDocumentInputQL {
  id: number,
  idOpportunityDialog: number,
  idDocumentType: number,
  dateUploaded: string,
  docName: string,
  dNotes?: string | null,
  docId?: string | null,
  parentFolder?: string | null,
};

export interface OpportunityInputQL {
  id: number,
  idResponsible: number,
  idCustomer: number,
  idCustomerContact: number,
  idCurrency: number,
  idContact: number,
  idStatus: number,
  dateCreated: string,
  lastUpdated: string,
  idUser: number,
  idPort?: number | null,
  idIncoTerm?: number | null,
  idLinerTerms?: number | null,
  isActive: boolean,
  idMarket: number,
  idSector: number,
  oppNotes?: string | null,
  asImporter: boolean,
  idTransactionFlow: number,
  idDocType: number,
  idTypeOpp: number,
  comments?: string | null,
  creditDays: number,
  interestRate: string,
  idDeliveryPoint?: number | null,
  isAutomotive: boolean,
  subtotal: string,
  tax: string,
  taxAmount?: string | null,
  total?: string | null,
};

export interface OrganizationInputQL {
  id: number,
  name: string,
  description: string,
};

export interface PaymentTermInputQL {
  id: number,
  name: string,
  description: string,
};

export interface PortInputQL {
  id: number,
  name?: string | null,
  description: string,
};

export interface PositionInputQL {
  id: number,
  name?: string | null,
  description: string,
};

export interface ProductPropertyInputQL {
  id: number,
  idProduct: number,
  idProperty: number,
  pOrder: number,
  isRequired: boolean,
};

export interface ProductInputQL {
  id: number,
  name?: string | null,
  description: string,
  idFamily: number,
  campaignTemplate?: string | null,
  campaignTemplateSubject?: string | null,
};

export interface PropertyInputQL {
  id: number,
  name: string,
  description: string,
};

export interface PurchaseOrderConfirmationInputQL {
  id: number,
  idPurchaseOrder: number,
  dateCreated: string,
  dateSended?: string | null,
  sendedBy?: number | null,
};

export interface PurchaseOrderDetailSumaryPropertyInputQL {
  id: number,
  idPurchaseOrderDetailSumary: number,
  idProperty: number,
  propertyValue: string,
};

export interface PurchaseOrderDetailSumaryInputQL {
  id: number,
  idPurchaseOrderDetail: number,
  quantity: string,
  comment?: string | null,
  dateCreated: string,
  price: string,
  amount: string,
  qtyShipped: string,
};

export interface PurchaseOrderDetailInputQL {
  id: number,
  idPurchaseOrder: number,
  idProduct: number,
  itemDescription: string,
  itemQuantity: string,
  itemPrice: string,
  salePrice: string,
  dateAdded: string,
  shipQty: string,
  itemExtended: string,
  idCustomerProduct: number,
};

export interface PurchaseOrderDialogInputQL {
  id: number,
  idPurchaseOrder: number,
  idAction: number,
  dateDialog: string,
  idResponsible: number,
  toContact: number,
  idContact?: number | null,
  idCustomerContact?: number | null,
  dNotes: string,
  emailSended: boolean,
  dateSend?: string | null,
  subject?: string | null,
};

export interface PurchaseOrderDocumentInputQL {
  id: number,
  idPurchaseOrderDialog: number,
  idDocumentType: number,
  dateUploaded: string,
  docName: string,
  dNotes?: string | null,
  docId?: string | null,
  parentFolder?: string | null,
};

export interface PurchaseOrderInputQL {
  id: number,
  idOpportunity: number,
  idQuotationFromSupplier: number,
  idQuotationToCustomer: number,
  idDocType: number,
  idStatus: number,
  idResponsible: number,
  idCustomer: number,
  idCustomerContact: number,
  idCurrency: number,
  idContact: number,
  dateCreated: string,
  lastUpdated: string,
  idUser: number,
  idPort: number,
  idIncoTerm: number,
  idLinerTerm: number,
  isActive: boolean,
  idMarket: number,
  idSector: number,
  oppNotes?: string | null,
  asImporter: boolean,
  idTransactionFlow: number,
  sMIM?: string | null,
  idTypeOpp: number,
  idMill: number,
  idCountryOrigin: number,
  offerValidity?: string | null,
  shipmentOffered?: string | null,
  pONumber?: string | null,
  bookingDate?: string | null,
  comments?: string | null,
  creditDays: number,
  interestRate: string,
  idDeliveryPoint?: number | null,
  isAutomotive: boolean,
  orderConfirmDate?: string | null,
  subtotal: string,
  tax: string,
  taxAmount?: string | null,
  total?: string | null,
};

export interface QuotationFromSupplierDetailSumaryPropertyInputQL {
  id: number,
  idQuotationFromSupplierDetailSumary: number,
  idProperty: number,
  propertyValue: string,
};

export interface QuotationFromSupplierDetailSumaryInputQL {
  id: number,
  idQuotationFromSupplierDetail: number,
  quantity: string,
  comment?: string | null,
  dateCreated: string,
  price: string,
  amount: string,
  salePrice?: string | null,
};

export interface QuotationFromSupplierDetailInputQL {
  id: number,
  idQuotationFromSupplier: number,
  idProduct: number,
  itemDescription: string,
  itemQuantity: string,
  itemPrice: string,
  dateAdded: string,
  itemExtended: string,
  idCustomerProduct: number,
};

export interface QuotationFromSupplierDialogInputQL {
  id: number,
  idQuotationFromSupplier: number,
  idAction: number,
  dateDialog: string,
  idResponsible: number,
  toContact: number,
  idContact?: number | null,
  idCustomerContact?: number | null,
  dNotes: string,
  emailSended: boolean,
  dateSend?: string | null,
  subject?: string | null,
};

export interface QuotationFromSupplierDocumentInputQL {
  id: number,
  idQuotationFromSupplierDialog: number,
  idDocumentType: number,
  dateUploaded: string,
  docName: string,
  dNotes?: string | null,
  docId?: string | null,
  parentFolder?: string | null,
};

export interface QuotationFromSupplierInputQL {
  id: number,
  idOpportunity: number,
  idCurrency: number,
  idMill: number,
  idPort: number,
  idCountryOrigin: number,
  idStatus: number,
  dateReceived?: string | null,
  idUser: number,
  idIncoTerm: number,
  idLinerTerm: number,
  quoteNotes?: string | null,
  asImporter: boolean,
  idTransactionFlow: number,
  offerValidity?: string | null,
  shipmentOffered?: string | null,
  idDocType: number,
  dateCreated: string,
  idTypeOpp: number,
  creditDays: number,
  interestRate: string,
  idDeliveryPoint?: number | null,
  isAutomotive: boolean,
  subtotal: string,
  tax: string,
  taxAmount?: string | null,
  total?: string | null,
};

export interface QuotationToCustomerDetailSumaryPropertyInputQL {
  id: number,
  idQuotationToCustomerDetailSumary: number,
  idProperty: number,
  propertyValue: string,
};

export interface QuotationToCustomerDetailSumaryInputQL {
  id: number,
  idQuotationToCustomerDetail: number,
  quantity: string,
  comment?: string | null,
  itemPrice: string,
  expenseSupplierSide_Cost?: string | null,
  expenseSMIM_Cost?: string | null,
  profit?: string | null,
  salesPriceBased?: string | null,
  salePrice?: string | null,
  expectedProfit?: string | null,
  dateCreated: string,
};

export interface QuotationToCustomerDetailInputQL {
  id: number,
  idQuotationToCustomer: number,
  idProduct: number,
  idCustomerProduct: number,
  itemDescription: string,
  itemQuantity: string,
  itemPrice: string,
  itemExtended: string,
};

export interface QuotationToCustomerDialogInputQL {
  id: number,
  idQuotationToCustomer: number,
  idAction: number,
  dateDialog: string,
  idResponsible: number,
  toContact: number,
  idContact?: number | null,
  idCustomerContact?: number | null,
  dNotes: string,
  emailSended: boolean,
  dateSend?: string | null,
  subject?: string | null,
};

export interface QuotationToCustomerDocumentInputQL {
  id: number,
  idQuotationToCustomerDialog: number,
  idDocumentType: number,
  dateUploaded: string,
  docName: string,
  dNotes?: string | null,
  docId?: string | null,
  parentFolder?: string | null,
};

export interface QuotationToCustomerInputQL {
  id: number,
  idDocType: number,
  idQuotationFromSupplier: number,
  idIncoTerm: number,
  idLinerTerm: number,
  idMill: number,
  idCountry: number,
  idPort: number,
  idCurrency: number,
  idStatus: number,
  dateSend?: string | null,
  dateCreated: string,
  idUser: number,
  offerValidity?: string | null,
  shipmentOffered?: string | null,
  quoteNotes?: string | null,
  asImporter: boolean,
  idTypeOpp: number,
  creditDays: number,
  interestRate: string,
  idDeliveryPoint?: number | null,
  isAutomotive: boolean,
  subtotal: string,
  tax: string,
  taxAmount?: string | null,
  total?: string | null,
};

export interface RailSpurTypeInputQL {
  id: number,
  name: string,
  description: string,
};

export interface RailSpurInputQL {
  id: number,
  idRailSpurType: number,
  name: string,
  street?: string | null,
  number?: string | null,
  idColony?: number | null,
  phone?: string | null,
  rFC?: string | null,
  station?: string | null,
  zona?: string | null,
  railSpur1?: string | null,
  idRailway: number,
  carsPerDay: number,
};

export interface RailwayInputQL {
  id: number,
  name: string,
  description: string,
};

export interface ResponsibleTargetInputQL {
  id: number,
  idResponsible: number,
  idFamily: number,
  responsibleTargetYear: number,
  targetQty: string,
};

export interface ResponsibleInputQL {
  id: number,
  name: string,
  officePhone?: string | null,
  cellPhone?: string | null,
  eMail: string,
  idPosition: number,
  rspUserCredential: string,
  isActive: boolean,
  idUser: number,
};

export interface SectorInputQL {
  id: number,
  name: string,
  description: string,
};

export interface ShippingDetailInputQL {
  id: number,
  idShipping: number,
  idPurchaseOrder: number,
  idPurchaseOrderDetail: number,
  idPurchaseOrderDetailSumary: number,
  shipQty: string,
  shipPrice: string,
  extended: string,
};

export interface ShippingDialogDocumentInputQL {
  id: number,
  idShippingDialog: number,
  idDocumentType: number,
  dateUploaded: string,
  docName: string,
  dNotes?: string | null,
  docId?: string | null,
  parentFolder?: string | null,
};

export interface ShippingDialogInputQL {
  id: number,
  idShipping: number,
  idAction: number,
  dateDialog: string,
  idResponsible: number,
  toContact: number,
  idContact?: number | null,
  idCustomerContact?: number | null,
  dNotes: string,
  emailSended: boolean,
  dateSend?: string | null,
  subject?: string | null,
};

export interface ShippingInputQL {
  id: number,
  shipDate: string,
  idStatus: number,
  idCurrency?: number | null,
  idCustomer: number,
  bLNumber: string,
  bLDate?: string | null,
  eTA: string,
  eTD?: string | null,
  aDA?: string | null,
  vesselName: string,
  idPort: number,
  idMill: number,
  idCountryOrigin: number,
  idIncoTerm: number,
  idLinerTerm: number,
  idDeliveryPoint?: number | null,
  idUser: number,
  shipNotes?: string | null,
  isAutomotive: boolean,
  idDocType: number,
  subtotal: string,
  tax: string,
  taxAmount?: string | null,
  total?: string | null,
  idResponsible: number,
};

export interface StateInputQL {
  id: number,
  idCountry: number,
  name: string,
  description: string,
};

export interface SupplierContactInputQL {
  id: number,
  idSupplier: number,
  name: string,
  eMail: string,
  cellPhone?: string | null,
  officePhone?: string | null,
  department: string,
  isActive: boolean,
};

export interface SupplierInputQL {
  id: number,
  shortName: string,
  name: string,
  idCountry: number,
  isActive: boolean,
};

export interface TemplateEMailInputQL {
  id: number,
  name: string,
  eMailSubject: string,
  eMailBody: string,
};

export interface TemplateMailDocumentInputQL {
  id: number,
  idTemplate: number,
  idDocumentType: number,
};

export interface TenderInputQL {
  id: number,
  name: string,
  description: string,
};

export interface TransactionFlowInputQL {
  id: number,
  name: string,
  description: string,
};

export interface TypeOpportunityInputQL {
  id: number,
  name: string,
  description: string,
};

export interface UserInputQL {
  id: number,
  userName: string,
  userPassword: string,
  isActive: boolean,
  isAdmin: boolean,
  name: string,
  eMail: string,
};

export interface createactionOpportunityDocTypeMutationVariables {
  value: ActionOpportunityDocTypeInputQL,
};

export interface createactionOpportunityDocTypeMutation {
  createactionOpportunityDocType:  {
    __typename: "ActionOpportunityDocTypeTypeQL",
    id: number,
  } | null,
};

export interface createactionOpportunityMutationVariables {
  value: ActionOpportunityInputQL,
};

export interface createactionOpportunityMutation {
  createactionOpportunity:  {
    __typename: "ActionOpportunityTypeQL",
    id: number,
  } | null,
};

export interface createbankMutationVariables {
  value: BankInputQL,
};

export interface createbankMutation {
  createbank:  {
    __typename: "BankTypeQL",
    id: number,
  } | null,
};

export interface createbrokerMutationVariables {
  value: BrokerInputQL,
};

export interface createbrokerMutation {
  createbroker:  {
    __typename: "BrokerTypeQL",
    id: number,
  } | null,
};

export interface createcategoryLogMutationVariables {
  value: CategoryLogInputQL,
};

export interface createcategoryLogMutation {
  createcategoryLog:  {
    __typename: "CategoryLogTypeQL",
    categoryLogID: number,
  } | null,
};

export interface createcategoryMutationVariables {
  value: CategoryInputQL,
};

export interface createcategoryMutation {
  createcategory:  {
    __typename: "CategoryTypeQL",
    categoryID: number,
  } | null,
};

export interface createcityMutationVariables {
  value: CityInputQL,
};

export interface createcityMutation {
  createcity:  {
    __typename: "CityTypeQL",
    id: number,
  } | null,
};

export interface createcollectionDataTypeMutationVariables {
  value: CollectionDataTypeInputQL,
};

export interface createcollectionDataTypeMutation {
  createcollectionDataType:  {
    __typename: "CollectionDataTypeTypeQL",
    id: number,
  } | null,
};

export interface createcollectionImporterRelationMutationVariables {
  value: CollectionImporterRelationInputQL,
};

export interface createcollectionImporterRelationMutation {
  createcollectionImporterRelation:  {
    __typename: "CollectionImporterRelationTypeQL",
    id: number,
  } | null,
};

export interface createcolonyTypeMutationVariables {
  value: ColonyTypeInputQL,
};

export interface createcolonyTypeMutation {
  createcolonyType:  {
    __typename: "ColonyTypeTypeQL",
    id: number,
  } | null,
};

export interface createcolonyMutationVariables {
  value: ColonyInputQL,
};

export interface createcolonyMutation {
  createcolony:  {
    __typename: "ColonyTypeQL",
    id: number,
  } | null,
};

export interface createcompanyTargetMutationVariables {
  value: CompanyTargetInputQL,
};

export interface createcompanyTargetMutation {
  createcompanyTarget:  {
    __typename: "CompanyTargetTypeQL",
    id: number,
  } | null,
};

export interface createcompanyMutationVariables {
  value: CompanyInputQL,
};

export interface createcompanyMutation {
  createcompany:  {
    __typename: "CompanyTypeQL",
    id: number,
  } | null,
};

export interface createcontactMutationVariables {
  value: ContactInputQL,
};

export interface createcontactMutation {
  createcontact:  {
    __typename: "ContactTypeQL",
    id: number,
  } | null,
};

export interface createcountryMutationVariables {
  value: CountryInputQL,
};

export interface createcountryMutation {
  createcountry:  {
    __typename: "CountryTypeQL",
    id: number,
  } | null,
};

export interface createcurrencyMutationVariables {
  value: CurrencyInputQL,
};

export interface createcurrencyMutation {
  createcurrency:  {
    __typename: "CurrencyTypeQL",
    id: number,
  } | null,
};

export interface createcustomerBrokerMutationVariables {
  value: CustomerBrokerInputQL,
};

export interface createcustomerBrokerMutation {
  createcustomerBroker:  {
    __typename: "CustomerBrokerTypeQL",
    id: number,
  } | null,
};

export interface createcustomerContactMutationVariables {
  value: CustomerContactInputQL,
};

export interface createcustomerContactMutation {
  createcustomerContact:  {
    __typename: "CustomerContactTypeQL",
    id: number,
  } | null,
};

export interface createcustomerDeliveryPointMutationVariables {
  value: CustomerDeliveryPointInputQL,
};

export interface createcustomerDeliveryPointMutation {
  createcustomerDeliveryPoint:  {
    __typename: "CustomerDeliveryPointTypeQL",
    id: number,
  } | null,
};

export interface createcustomerDocumentMutationVariables {
  value: CustomerDocumentInputQL,
};

export interface createcustomerDocumentMutation {
  createcustomerDocument:  {
    __typename: "CustomerDocumentTypeQL",
    id: number,
  } | null,
};

export interface createcustomerMarketMutationVariables {
  value: CustomerMarketInputQL,
};

export interface createcustomerMarketMutation {
  createcustomerMarket:  {
    __typename: "CustomerMarketTypeQL",
    id: number,
  } | null,
};

export interface createcustomerProductExtendedMutationVariables {
  value: CustomerProductExtendedInputQL,
};

export interface createcustomerProductExtendedMutation {
  createcustomerProductExtended:  {
    __typename: "CustomerProductExtendedTypeQL",
    idCustomerProduct: number,
  } | null,
};

export interface createcustomerProductPriceMutationVariables {
  value: CustomerProductPriceInputQL,
};

export interface createcustomerProductPriceMutation {
  createcustomerProductPrice:  {
    __typename: "CustomerProductPriceTypeQL",
    id: number,
  } | null,
};

export interface createcustomerProductPropertyMutationVariables {
  value: CustomerProductPropertyInputQL,
};

export interface createcustomerProductPropertyMutation {
  createcustomerProductProperty:  {
    __typename: "CustomerProductPropertyTypeQL",
    id: number,
  } | null,
};

export interface createcustomerProductMutationVariables {
  value: CustomerProductInputQL,
};

export interface createcustomerProductMutation {
  createcustomerProduct:  {
    __typename: "CustomerProductTypeQL",
    id: number,
  } | null,
};

export interface createcustomerRailSpurMutationVariables {
  value: CustomerRailSpurInputQL,
};

export interface createcustomerRailSpurMutation {
  createcustomerRailSpur:  {
    __typename: "CustomerRailSpurTypeQL",
    id: number,
  } | null,
};

export interface createcustomerSectorMutationVariables {
  value: CustomerSectorInputQL,
};

export interface createcustomerSectorMutation {
  createcustomerSector:  {
    __typename: "CustomerSectorTypeQL",
    id: number,
  } | null,
};

export interface createcustomerMutationVariables {
  value: CustomerInputQL,
};

export interface createcustomerMutation {
  createcustomer:  {
    __typename: "CustomerTypeQL",
    id: number,
  } | null,
};

export interface createdeliveryTypeMutationVariables {
  value: DeliveryTypeInputQL,
};

export interface createdeliveryTypeMutation {
  createdeliveryType:  {
    __typename: "DeliveryTypeTypeQL",
    id: number,
  } | null,
};

export interface createdepartmentMutationVariables {
  value: DepartmentInputQL,
};

export interface createdepartmentMutation {
  createdepartment:  {
    __typename: "DepartmentTypeQL",
    id: number,
  } | null,
};

export interface createdocTypeStatuMutationVariables {
  value: DocTypeStatuInputQL,
};

export interface createdocTypeStatuMutation {
  createdocTypeStatu:  {
    __typename: "DocTypeStatuTypeQL",
    id: number,
  } | null,
};

export interface createdocTypeMutationVariables {
  value: DocTypeInputQL,
};

export interface createdocTypeMutation {
  createdocType:  {
    __typename: "DocTypeTypeQL",
    id: number,
  } | null,
};

export interface createdocumentTypeMutationVariables {
  value: DocumentTypeInputQL,
};

export interface createdocumentTypeMutation {
  createdocumentType:  {
    __typename: "DocumentTypeTypeQL",
    id: number,
  } | null,
};

export interface createestatusOpportunityMutationVariables {
  value: EstatusOpportunityInputQL,
};

export interface createestatusOpportunityMutation {
  createestatusOpportunity:  {
    __typename: "EstatusOpportunityTypeQL",
    id: number,
  } | null,
};

export interface createexchangeRateMutationVariables {
  value: ExchangeRateInputQL,
};

export interface createexchangeRateMutation {
  createexchangeRate:  {
    __typename: "ExchangeRateTypeQL",
    id: number,
  } | null,
};

export interface createfamilyMutationVariables {
  value: FamilyInputQL,
};

export interface createfamilyMutation {
  createfamily:  {
    __typename: "FamilyTypeQL",
    id: number,
  } | null,
};

export interface createincoTermMutationVariables {
  value: IncoTermInputQL,
};

export interface createincoTermMutation {
  createincoTerm:  {
    __typename: "IncoTermTypeQL",
    id: number,
  } | null,
};

export interface createlinerTermMutationVariables {
  value: LinerTermInputQL,
};

export interface createlinerTermMutation {
  createlinerTerm:  {
    __typename: "LinerTermTypeQL",
    id: number,
  } | null,
};

export interface createlogMutationVariables {
  value: LogInputQL,
};

export interface createlogMutation {
  createlog:  {
    __typename: "LogTypeQL",
    logId: number,
  } | null,
};

export interface createmarketMutationVariables {
  value: MarketInputQL,
};

export interface createmarketMutation {
  createmarket:  {
    __typename: "MarketTypeQL",
    id: number,
  } | null,
};

export interface createmessageTemplateMutationVariables {
  value: MessageTemplateInputQL,
};

export interface createmessageTemplateMutation {
  createmessageTemplate:  {
    __typename: "MessageTemplateTypeQL",
    id: number,
  } | null,
};

export interface createmillCountryMutationVariables {
  value: MillCountryInputQL,
};

export interface createmillCountryMutation {
  createmillCountry:  {
    __typename: "MillCountryTypeQL",
    id: number,
  } | null,
};

export interface createmillProductMutationVariables {
  value: MillProductInputQL,
};

export interface createmillProductMutation {
  createmillProduct:  {
    __typename: "MillProductTypeQL",
    id: number,
  } | null,
};

export interface createmillMutationVariables {
  value: MillInputQL,
};

export interface createmillMutation {
  createmill:  {
    __typename: "MillTypeQL",
    id: number,
  } | null,
};

export interface createopportunityDetailSumaryPropertyMutationVariables {
  value: OpportunityDetailSumaryPropertyInputQL,
};

export interface createopportunityDetailSumaryPropertyMutation {
  createopportunityDetailSumaryProperty:  {
    __typename: "OpportunityDetailSumaryPropertyTypeQL",
    id: number,
  } | null,
};

export interface createopportunityDetailSumaryMutationVariables {
  value: OpportunityDetailSumaryInputQL,
};

export interface createopportunityDetailSumaryMutation {
  createopportunityDetailSumary:  {
    __typename: "OpportunityDetailSumaryTypeQL",
    id: number,
  } | null,
};

export interface createopportunityDetailMutationVariables {
  value: OpportunityDetailInputQL,
};

export interface createopportunityDetailMutation {
  createopportunityDetail:  {
    __typename: "OpportunityDetailTypeQL",
    id: number,
  } | null,
};

export interface createopportunityDialogMutationVariables {
  value: OpportunityDialogInputQL,
};

export interface createopportunityDialogMutation {
  createopportunityDialog:  {
    __typename: "OpportunityDialogTypeQL",
    id: number,
  } | null,
};

export interface createopportunityDocumentMutationVariables {
  value: OpportunityDocumentInputQL,
};

export interface createopportunityDocumentMutation {
  createopportunityDocument:  {
    __typename: "OpportunityDocumentTypeQL",
    id: number,
  } | null,
};

export interface createopportunityMutationVariables {
  value: OpportunityInputQL,
};

export interface createopportunityMutation {
  createopportunity:  {
    __typename: "OpportunityTypeQL",
    id: number,
  } | null,
};

export interface createorganizationMutationVariables {
  value: OrganizationInputQL,
};

export interface createorganizationMutation {
  createorganization:  {
    __typename: "OrganizationTypeQL",
    id: number,
  } | null,
};

export interface createpaymentTermMutationVariables {
  value: PaymentTermInputQL,
};

export interface createpaymentTermMutation {
  createpaymentTerm:  {
    __typename: "PaymentTermTypeQL",
    id: number,
  } | null,
};

export interface createportMutationVariables {
  value: PortInputQL,
};

export interface createportMutation {
  createport:  {
    __typename: "PortTypeQL",
    id: number,
  } | null,
};

export interface createpositionMutationVariables {
  value: PositionInputQL,
};

export interface createpositionMutation {
  createposition:  {
    __typename: "PositionTypeQL",
    id: number,
  } | null,
};

export interface createproductPropertyMutationVariables {
  value: ProductPropertyInputQL,
};

export interface createproductPropertyMutation {
  createproductProperty:  {
    __typename: "ProductPropertyTypeQL",
    id: number,
  } | null,
};

export interface createproductMutationVariables {
  value: ProductInputQL,
};

export interface createproductMutation {
  createproduct:  {
    __typename: "ProductTypeQL",
    id: number,
  } | null,
};

export interface createpropertyMutationVariables {
  value: PropertyInputQL,
};

export interface createpropertyMutation {
  createproperty:  {
    __typename: "PropertyTypeQL",
    id: number,
  } | null,
};

export interface createpurchaseOrderConfirmationMutationVariables {
  value: PurchaseOrderConfirmationInputQL,
};

export interface createpurchaseOrderConfirmationMutation {
  createpurchaseOrderConfirmation:  {
    __typename: "PurchaseOrderConfirmationTypeQL",
    id: number,
  } | null,
};

export interface createpurchaseOrderDetailSumaryPropertyMutationVariables {
  value: PurchaseOrderDetailSumaryPropertyInputQL,
};

export interface createpurchaseOrderDetailSumaryPropertyMutation {
  createpurchaseOrderDetailSumaryProperty:  {
    __typename: "PurchaseOrderDetailSumaryPropertyTypeQL",
    id: number,
  } | null,
};

export interface createpurchaseOrderDetailSumaryMutationVariables {
  value: PurchaseOrderDetailSumaryInputQL,
};

export interface createpurchaseOrderDetailSumaryMutation {
  createpurchaseOrderDetailSumary:  {
    __typename: "PurchaseOrderDetailSumaryTypeQL",
    id: number,
  } | null,
};

export interface createpurchaseOrderDetailMutationVariables {
  value: PurchaseOrderDetailInputQL,
};

export interface createpurchaseOrderDetailMutation {
  createpurchaseOrderDetail:  {
    __typename: "PurchaseOrderDetailTypeQL",
    id: number,
  } | null,
};

export interface createpurchaseOrderDialogMutationVariables {
  value: PurchaseOrderDialogInputQL,
};

export interface createpurchaseOrderDialogMutation {
  createpurchaseOrderDialog:  {
    __typename: "PurchaseOrderDialogTypeQL",
    id: number,
  } | null,
};

export interface createpurchaseOrderDocumentMutationVariables {
  value: PurchaseOrderDocumentInputQL,
};

export interface createpurchaseOrderDocumentMutation {
  createpurchaseOrderDocument:  {
    __typename: "PurchaseOrderDocumentTypeQL",
    id: number,
  } | null,
};

export interface createpurchaseOrderMutationVariables {
  value: PurchaseOrderInputQL,
};

export interface createpurchaseOrderMutation {
  createpurchaseOrder:  {
    __typename: "PurchaseOrderTypeQL",
    id: number,
  } | null,
};

export interface createquotationFromSupplierDetailSumaryPropertyMutationVariables {
  value: QuotationFromSupplierDetailSumaryPropertyInputQL,
};

export interface createquotationFromSupplierDetailSumaryPropertyMutation {
  createquotationFromSupplierDetailSumaryProperty:  {
    __typename: "QuotationFromSupplierDetailSumaryPropertyTypeQL",
    id: number,
  } | null,
};

export interface createquotationFromSupplierDetailSumaryMutationVariables {
  value: QuotationFromSupplierDetailSumaryInputQL,
};

export interface createquotationFromSupplierDetailSumaryMutation {
  createquotationFromSupplierDetailSumary:  {
    __typename: "QuotationFromSupplierDetailSumaryTypeQL",
    id: number,
  } | null,
};

export interface createquotationFromSupplierDetailMutationVariables {
  value: QuotationFromSupplierDetailInputQL,
};

export interface createquotationFromSupplierDetailMutation {
  createquotationFromSupplierDetail:  {
    __typename: "QuotationFromSupplierDetailTypeQL",
    id: number,
  } | null,
};

export interface createquotationFromSupplierDialogMutationVariables {
  value: QuotationFromSupplierDialogInputQL,
};

export interface createquotationFromSupplierDialogMutation {
  createquotationFromSupplierDialog:  {
    __typename: "QuotationFromSupplierDialogTypeQL",
    id: number,
  } | null,
};

export interface createquotationFromSupplierDocumentMutationVariables {
  value: QuotationFromSupplierDocumentInputQL,
};

export interface createquotationFromSupplierDocumentMutation {
  createquotationFromSupplierDocument:  {
    __typename: "QuotationFromSupplierDocumentTypeQL",
    id: number,
  } | null,
};

export interface createquotationFromSupplierMutationVariables {
  value: QuotationFromSupplierInputQL,
};

export interface createquotationFromSupplierMutation {
  createquotationFromSupplier:  {
    __typename: "QuotationFromSupplierTypeQL",
    id: number,
  } | null,
};

export interface createquotationToCustomerDetailSumaryPropertyMutationVariables {
  value: QuotationToCustomerDetailSumaryPropertyInputQL,
};

export interface createquotationToCustomerDetailSumaryPropertyMutation {
  createquotationToCustomerDetailSumaryProperty:  {
    __typename: "QuotationToCustomerDetailSumaryPropertyTypeQL",
    id: number,
  } | null,
};

export interface createquotationToCustomerDetailSumaryMutationVariables {
  value: QuotationToCustomerDetailSumaryInputQL,
};

export interface createquotationToCustomerDetailSumaryMutation {
  createquotationToCustomerDetailSumary:  {
    __typename: "QuotationToCustomerDetailSumaryTypeQL",
    id: number,
  } | null,
};

export interface createquotationToCustomerDetailMutationVariables {
  value: QuotationToCustomerDetailInputQL,
};

export interface createquotationToCustomerDetailMutation {
  createquotationToCustomerDetail:  {
    __typename: "QuotationToCustomerDetailTypeQL",
    id: number,
  } | null,
};

export interface createquotationToCustomerDialogMutationVariables {
  value: QuotationToCustomerDialogInputQL,
};

export interface createquotationToCustomerDialogMutation {
  createquotationToCustomerDialog:  {
    __typename: "QuotationToCustomerDialogTypeQL",
    id: number,
  } | null,
};

export interface createquotationToCustomerDocumentMutationVariables {
  value: QuotationToCustomerDocumentInputQL,
};

export interface createquotationToCustomerDocumentMutation {
  createquotationToCustomerDocument:  {
    __typename: "QuotationToCustomerDocumentTypeQL",
    id: number,
  } | null,
};

export interface createquotationToCustomerMutationVariables {
  value: QuotationToCustomerInputQL,
};

export interface createquotationToCustomerMutation {
  createquotationToCustomer:  {
    __typename: "QuotationToCustomerTypeQL",
    id: number,
  } | null,
};

export interface createrailSpurTypeMutationVariables {
  value: RailSpurTypeInputQL,
};

export interface createrailSpurTypeMutation {
  createrailSpurType:  {
    __typename: "RailSpurTypeTypeQL",
    id: number,
  } | null,
};

export interface createrailSpurMutationVariables {
  value: RailSpurInputQL,
};

export interface createrailSpurMutation {
  createrailSpur:  {
    __typename: "RailSpurTypeQL",
    id: number,
  } | null,
};

export interface createrailwayMutationVariables {
  value: RailwayInputQL,
};

export interface createrailwayMutation {
  createrailway:  {
    __typename: "RailwayTypeQL",
    id: number,
  } | null,
};

export interface createresponsibleTargetMutationVariables {
  value: ResponsibleTargetInputQL,
};

export interface createresponsibleTargetMutation {
  createresponsibleTarget:  {
    __typename: "ResponsibleTargetTypeQL",
    id: number,
  } | null,
};

export interface createresponsibleMutationVariables {
  value: ResponsibleInputQL,
};

export interface createresponsibleMutation {
  createresponsible:  {
    __typename: "ResponsibleTypeQL",
    id: number,
  } | null,
};

export interface createsectorMutationVariables {
  value: SectorInputQL,
};

export interface createsectorMutation {
  createsector:  {
    __typename: "SectorTypeQL",
    id: number,
  } | null,
};

export interface createshippingDetailMutationVariables {
  value: ShippingDetailInputQL,
};

export interface createshippingDetailMutation {
  createshippingDetail:  {
    __typename: "ShippingDetailTypeQL",
    id: number,
  } | null,
};

export interface createshippingDialogDocumentMutationVariables {
  value: ShippingDialogDocumentInputQL,
};

export interface createshippingDialogDocumentMutation {
  createshippingDialogDocument:  {
    __typename: "ShippingDialogDocumentTypeQL",
    id: number,
  } | null,
};

export interface createshippingDialogMutationVariables {
  value: ShippingDialogInputQL,
};

export interface createshippingDialogMutation {
  createshippingDialog:  {
    __typename: "ShippingDialogTypeQL",
    id: number,
  } | null,
};

export interface createshippingMutationVariables {
  value: ShippingInputQL,
};

export interface createshippingMutation {
  createshipping:  {
    __typename: "ShippingTypeQL",
    id: number,
  } | null,
};

export interface createstateMutationVariables {
  value: StateInputQL,
};

export interface createstateMutation {
  createstate:  {
    __typename: "StateTypeQL",
    id: number,
  } | null,
};

export interface createsupplierContactMutationVariables {
  value: SupplierContactInputQL,
};

export interface createsupplierContactMutation {
  createsupplierContact:  {
    __typename: "SupplierContactTypeQL",
    id: number,
  } | null,
};

export interface createsupplierMutationVariables {
  value: SupplierInputQL,
};

export interface createsupplierMutation {
  createsupplier:  {
    __typename: "SupplierTypeQL",
    id: number,
  } | null,
};

export interface createtemplateEMailMutationVariables {
  value: TemplateEMailInputQL,
};

export interface createtemplateEMailMutation {
  createtemplateEMail:  {
    __typename: "TemplateEMailTypeQL",
    id: number,
  } | null,
};

export interface createtemplateMailDocumentMutationVariables {
  value: TemplateMailDocumentInputQL,
};

export interface createtemplateMailDocumentMutation {
  createtemplateMailDocument:  {
    __typename: "TemplateMailDocumentTypeQL",
    id: number,
  } | null,
};

export interface createtenderMutationVariables {
  value: TenderInputQL,
};

export interface createtenderMutation {
  createtender:  {
    __typename: "TenderTypeQL",
    id: number,
  } | null,
};

export interface createtransactionFlowMutationVariables {
  value: TransactionFlowInputQL,
};

export interface createtransactionFlowMutation {
  createtransactionFlow:  {
    __typename: "TransactionFlowTypeQL",
    id: number,
  } | null,
};

export interface createtypeOpportunityMutationVariables {
  value: TypeOpportunityInputQL,
};

export interface createtypeOpportunityMutation {
  createtypeOpportunity:  {
    __typename: "TypeOpportunityTypeQL",
    id: number,
  } | null,
};

export interface createuserMutationVariables {
  value: UserInputQL,
};

export interface createuserMutation {
  createuser:  {
    __typename: "UserTypeQL",
    id: number,
  } | null,
};
