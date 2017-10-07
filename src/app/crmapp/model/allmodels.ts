    export interface IComplex { }

	export class BaseEntity implements IComplex {
		accessToken: string;
		authenticationToken: string;
		cLASS_NAME: string;
		clientID: string;
		cREATED_BY: string;
		cREATED_ON: Date;
		description: string;
		emailType: string;
		id: number;
		mACHINE_NAME: string;
		name: string;
		nameDescription: string;
		recordStatus: number;
		redirectURL: string;
		selected: boolean;
		wLJsPath: string;
		isActive: boolean;
		showActions: boolean;
		updateStatus: boolean;
	}
	export class TCRMEntity extends BaseEntity {
	}

	export class BaseOpportunity extends TCRMEntity {
		isEditable: boolean;
		allowChild: boolean;
	}
	export class EditorDetailSumary extends TCRMEntity {
		amount: number;
		comment: string;
		dateCreated: Date;
		id: number;
		idDetail: number;
		price: number;
		quantity: number;
	}

	export class EditorDetailSumaryProperty extends TCRMEntity {
		isRequired: boolean;
		id: number;
		idProperty: number;
		property: Property;
		propertyValue: string;
		idParent: number;
	}

	export class BaseOrderDialog extends TCRMEntity {
		actionOpportunity: ActionOpportunity;
		contact: Contact;
		customerContact: CustomerContact;
		dateDialog: Date;
		dateSend: Date;
		dNotes: string;
		emailSended: boolean;
		id: number;
		idAction: number;
		idContact: number;
		idCustomerContact: number;
		idPurchaseOrder: number;
		idResponsible: number;
		purchaseOrder: PurchaseOrder;
		purchaseOrderDocuments: PurchaseOrderDocument[];
		responsible: Responsible;
		subject: string;
		toContact: number;
	}

	export class BaseDocument extends TCRMEntity {
		aData: number[];
		aData64: string;
		dateUploaded: Date;
		dNotes: string;
		docId: string;
		docName: string;
		documentType: DocumentType;
		id: number;
		idDocumentType: number;
		idParent: number;
		parentFolder: string;
	}

	export class ActionOpportunity extends TCRMEntity {
		description: string;
		id: number;
		name: string;
	}
	export class ActionOpportunityDocType extends TCRMEntity {
		actionOpportunity: ActionOpportunity;
		docType: DocType;
		emailTo: number;
		estatusOpportunity: EstatusOpportunity;
		id: number;
		idActionOpportunity: number;
		idDocType: number;
		idStatus: number;
		idTemplateEmail: number;
		templateEMail: TemplateEMail;
	}
	export class AttachDocument extends TCRMEntity {
		dateUploaded: Date;
		dNotes: string;
		docId: string;
		docName: string;
		docType: number;
		docTypeDescription: string;
		docTypeName: string;
		documentType: DocumentType;
		id: number;
		idDocumentType: number;
		idParent: number;
		parentFolder: string;
	}
	export class Bank extends TCRMEntity {
		description: string;
		id: number;
		name: string;
	}
	export class BreakStringIntoRows_Result extends TCRMEntity implements IComplex {
		column1: string;
	}
	export class Broker extends TCRMEntity {
		agentNumber: string;
		colony: Colony;
		contactName: string;
		customerBrokers: CustomerBroker[];
		eMail: string;
		id: number;
		idColony: number;
		name: string;
		number: string;
		phoneUSA: string;
		rFC: string;
		street: string;
	}
	export class Category extends TCRMEntity {
		categoryID: number;
		categoryLogs: CategoryLog[];
		categoryName: string;
	}
	export class CategoryLog extends TCRMEntity {
		category: Category;
		categoryID: number;
		categoryLogID: number;
		log: Log;
		logID: number;
	}
	export class City extends TCRMEntity {
		colonies: Colony[];
		description: string;
		id: number;
		idState: number;
		name: string;
		state: State;
	}
	export class CollectionDataType extends TCRMEntity {
		applyTax: boolean;
		asImporter: boolean;
		cType: number;
		description: string;
		factor: number;
		id: number;
		name: string;
	}
	export class CollectionImporterRelation extends TCRMEntity {
		asImporter: boolean;
		cType: number;
		id: number;
		idCollectionDataType: number;
	}
	export class Colony extends TCRMEntity {
		city: City;
		colonyType: ColonyType;
		description: string;
		id: number;
		idCity: number;
		idColonyType: number;
		name: string;
		zipCode: string;
	}
	export class ColonyType extends TCRMEntity {
		colonies: Colony[];
		description: string;
		id: number;
		name: string;
	}
	export class Company extends TCRMEntity {
		colony: Colony;
		companyName: string;
		companyTargets: CompanyTarget[];
		fax: string;
		id: number;
		idColony: number;
		legalResponsible: string;
		logo: string;
		number: string;
		phone: string;
		rfc: string;
		street: string;
		taxAmount: number;
		zipCode: string;
	}
	export class CompanyTarget extends TCRMEntity {
		company: Company;
		family: Family;
		id: number;
		idCompany: number;
		idFamily: number;
		target: number;
		targetYear: number;
	}
	export class Contact extends TCRMEntity {
		cellPhone: string;
		department: Department;
		eMail: string;
		id: number;
		idDepartment: number;
		idOrganization: number;
		isActive: boolean;
		name: string;
		officePhone: string;
		opportunities: Opportunity[];
		opportunityDialogs: OpportunityDialog[];
		organization: Organization;
		purchaseOrderDialogs: PurchaseOrderDialog[];
		purchaseOrders: PurchaseOrder[];
		quotationFromSupplierDialogs: QuotationFromSupplierDialog[];
		quotationToCustomerDialogs: QuotationToCustomerDialog[];
	}
	export class Country extends TCRMEntity {
		description: string;
		id: number;
		mills: Mill[];
		name: string;
		purchaseOrders: PurchaseOrder[];
		quotationFromSuppliers: QuotationFromSupplier[];
		quotationToCustomers: QuotationToCustomer[];
		shippings: Shipping[];
		states: State[];
		suppliers: Supplier[];
	}
	export class Currency extends TCRMEntity {
		aSign: string;
		description: string;
		exchangeRates: ExchangeRate[];
		id: number;
		name: string;
		opportunities: Opportunity[];
		purchaseOrders: PurchaseOrder[];
		quotationFromSuppliers: QuotationFromSupplier[];
		quotationToCustomers: QuotationToCustomer[];
	}
	export class Customer extends TCRMEntity {
		brokers: Broker[];
		colony: Colony;
		customerBrokers: CustomerBroker[];
		customerContacts: CustomerContact[];
		customerDeliveryPoints: CustomerDeliveryPoint[];
		customerDocuments: CustomerDocument[];
		customerMarkets: CustomerMarket[];
		customerProducts: CustomerProduct[];
		customerRailSpurs: CustomerRailSpur[];
		customerSectors: CustomerSector[];
		daysCredit: number;
		id: number;
		idColony: number;
		idResponsible: number;
		interestRate: number;
		isActive: boolean;
		isAutomotive: boolean;
		limitCreditGermany: number;
		limitCreditUSA: number;
		name: string;
		number: string;
		opportunities: Opportunity[];
		phone: string;
		purchaseOrders: PurchaseOrder[];
		responsible: Responsible;
		rFC: string;
		shippings: Shipping[];
		street: string;
	}
	export class CustomerBroker extends TCRMEntity {
		broker: Broker;
		customer: Customer;
		id: number;
		idBroker: number;
		idCustomer: number;
	}
	export class CustomerContact extends TCRMEntity {
		cellPhone: string;
		customer: Customer;
		email: string;
		extension: string;
		fechaNacimiento: Date;
		id: number;
		idCustomer: number;
		idPosition: number;
		isActive: boolean;
		name: string;
		nickName: string;
		officePhone: string;
		opportunities: Opportunity[];
		opportunityDialogs: OpportunityDialog[];
		position: Position;
		purchaseOrderDialogs: PurchaseOrderDialog[];
		purchaseOrders: PurchaseOrder[];
		quotationFromSupplierDialogs: QuotationFromSupplierDialog[];
		quotationToCustomerDialogs: QuotationToCustomerDialog[];
	}
	export class CustomerDeliveryPoint extends TCRMEntity {
		cdpContact: string;
		cdpName: string;
		cdpStreet: string;
		cdpTelephone: string;
		colony: Colony;
		customer: Customer;
		deliveryType: DeliveryType;
		id: number;
		idColony: number;
		idCustomer: number;
		idDeliveryType: number;
		isActive: boolean;
		opportunities: Opportunity[];
		purchaseOrders: PurchaseOrder[];
		quotationFromSuppliers: QuotationFromSupplier[];
		quotationToCustomers: QuotationToCustomer[];
		shippings: Shipping[];
	}
	export class CustomerDocument extends BaseDocument {
		comment: string;
		customer: Customer;
		dateUploaded: Date;
		docId: string;
		docName: string;
		id: number;
		idCustomer: number;
		idDocumentType: number;
		parentFolder: string;
	}
	export class CustomerMarket extends TCRMEntity{
		customer: Customer;
		id: number;
		idCustomer: number;
		idMarket: number;
		market: Market;
	}
	export class CustomerProduct extends TCRMEntity {
		constructor() {
			super();
			this.customerProductExtended = new CustomerProductExtended();
		}
		id: number;
		idCustomer: number;
		idProduct: number;
		isAutomotive: boolean;
		customerProductExtended: CustomerProductExtended;
		customerProductProperties: CustomerProductProperty[];
	}
	export class CustomerProductExtended extends TCRMEntity {
		buyerName: string;
		customerName: string;
		eau: number;
		idCustomerProduct: number;
		partNumberBuyer: string;
		partNumberOEM: string;
		platform: string;
		prodDescription: string;
	}	
	export class CustomerProductPrice extends TCRMEntity {
		customerProduct: CustomerProduct;
		id: number;
		idCustomerProduct: number;
		price: number;
		validFrom: Date;
		validTo: Date;
	}	
	export class CustomerProductProperty extends TCRMEntity {
		id: number;
		idCustomerProduct: number;
		idProperty: number;
		property: Property;
		propertyValue: string;
	}	
	export class CustomerRailSpur extends TCRMEntity {
		customer: Customer;
		id: number;
		idCustomer: number;
		idRailSpur: number;
		railSpur: RailSpur;
	}
	export class CustomerSector extends TCRMEntity {
		customer: Customer;
		id: number;
		idCustomer: number;
		idSector: number;
		sector: Sector;
	}	
	export class DeliveryType extends TCRMEntity {
		customerDeliveryPoints: CustomerDeliveryPoint[];
		description: string;
		id: number;
		name: string;
	}
	export class Department extends TCRMEntity {
		contacts: Contact[];
		description: string;
		id: number;
		name: string;
	}
	export class DocType extends TCRMEntity {
		actionOpportunityDocTypes: ActionOpportunityDocType[];
		description: string;
		docTypeStatus: DocTypeStatu[];
		id: number;
		name: string;
		opportunities: Opportunity[];
		purchaseOrders: PurchaseOrder[];
		quotationFromSuppliers: QuotationFromSupplier[];
		quotationToCustomers: QuotationToCustomer[];
		rootFolder: string;
	}
	export class DocTypeStatu extends TCRMEntity {
		allowChild: boolean;
		docType: DocType;
		estatusOpportunity: EstatusOpportunity;
		id: number;
		idDocType: number;
		idStatus: number;
		isEditable: boolean;
	}
	export class DocumentType extends TCRMEntity {
		description: string;
		id: number;
		name: string;
		opportunityDocuments: OpportunityDocument[];
		purchaseOrderDocuments: PurchaseOrderDocument[];
		quotationFromSupplierDocuments: QuotationFromSupplierDocument[];
		quotationToCustomerDocuments: QuotationToCustomerDocument[];
		templateEMails: TemplateEMail[];
	}
	export class EMailTemplate extends TCRMEntity {
		custContactMail: string;
		custContactSent: string;
		dateSent: Date;
		emailAttachments: AttachDocument[];
		eMailBCC: GenericList[];
		eMailBody: string;
		eMailCC: GenericList[];
		eMailSubject: string;
		eMailTo: GenericList[];
		idCustomer: number;
		idDialog: number;
		idOpportunity: number;
		idPurchase: number;
		idQuotationFromSupplier: number;
		idQuotationToCustomer: number;
		idResponsible: number;
		isSent: boolean;
		listIdDocuments: number[];
		oneDriveDocs: string[];
		oneDriveDocsName: string[];
	}
	export class EstatusOpportunity extends TCRMEntity {
		actionOpportunities: ActionOpportunity[];
		description: string;
		docTypeStatus: DocTypeStatu[];
		id: number;
		name: string;
		opportunities: Opportunity[];
		purchaseOrders: PurchaseOrder[];
		quotationFromSuppliers: QuotationFromSupplier[];
		quotationToCustomers: QuotationToCustomer[];
	}
	export class ExchangeRate extends TCRMEntity {
		currency: Currency;
		id: number;
		idCurrency: number;
		tDate: Date;
		value: number;
	}
	export class Family extends TCRMEntity {
		companyTargets: CompanyTarget[];
		description: string;
		id: number;
		name: string;
		products: Product[];
		responsibleTargets: ResponsibleTarget[];
	}
	export class findActionOppByType_Result {
		description: string;
		eMailTo: number;
		id: number;
		idDocType: number;
		idStatus: number;
		idTemplateEmail: number;
		name: string;
	}	
	export class GenericList extends TCRMEntity {
		description: string;
		idString: string;
		name: string;
	}
	export class GetActionDoctType_Result  extends TCRMEntity {
		docTypeName: string;
		eMailSubject: string;
		eMailTo: number;
		id: number;
		idActionOpportunity: number;
		idDocType: number;
		idStatus: number;
		idTemplateEmail: number;
		statusName: string;
		templateName: string;
	}
	export class getAllContactsWithCustomers_Result extends TCRMEntity {
		aTipo: string;
		eMail: string;
		id: number;
		isActive: boolean;
		name: string;
	}
	export class getCitites_Result extends TCRMEntity {
		countryName: string;
		description: string;
		fullName: string;
		id: number;
		idCountry: number;
		idState: number;
		name: string;
		stateName: string;
	}
	export class getColonies_Result extends TCRMEntity{
		cityName: string;
		countryName: string;
		cTypeName: string;
		description: string;
		id: number;
		idCity: number;
		idColonyType: number;
		idCountry: number;
		idState: number;
		name: string;
		stateName: string;
		zipCode: string;
	}
	export class GetColoniesFromZipCode_Result extends TCRMEntity {
		description: string;
		id: number;
		idCity: number;
		idColonyType: number;
		name: string;
		zipCode: string;
	}
	export class GetCompanyInfo_Result extends TCRMEntity {
		address1: string;
		address2: string;
		cityDescription: string;
		cityName: string;
		colonyDescription: string;
		colonyName: string;
		colonyType: string;
		companyName: string;
		countryDescription: string;
		countryName: string;
		fax: string;
		id: number;
		idCity: number;
		idColony: number;
		idColonyType: number;
		idCountry: number;
		idState: number;
		legalResponsible: string;
		logo: number[];
		number: string;
		phone: string;
		stateDescription: string;
		stateName: string;
		street: string;
		zipCode: string;
	}
	export class getCountries_Result extends TCRMEntity {
		description: string;
		fullName: string;
		id: number;
		name: string;
	}
	export class getCountriesFromIdMill_Result extends TCRMEntity {
		description: string;
		id: number;
		idCountry: number;
		name: string;
	}
	export class getCustomerContactList_Result extends TCRMEntity {
		email: string;
		id: number;
		idCustomer: number;
		name: string;
		nickName: string;
	}
	export class getCustomerContacts_Result extends TCRMEntity {
		cellPhone: string;
		email: string;
		id: number;
		idCustomer: number;
		name: string;
		nickName: string;
		position: string;
	}	
	export class GetCustomerDeliverPoints_Result extends TCRMEntity {
		cdpContact: string;
		cdpName: string;
		cdpTelephone: string;
		colonyName: string;
		deliveryTypeName: string;
		id: number;
		idColony: number;
		idCustomer: number;
		idDeliveryType: number;
		isActive: boolean;
		stateName: string;
		zipCode: string;
	}	
	export class GetCustomerDirectory_Result extends TCRMEntity {
		address: string;
		city: string;
		id: number;
		limitCreditGermany: number;
		limitCreditUSA: number;
		market: string;
		name: string;
		responsible: string;
		sector: string;
	}
	export class GetCustomerDocuments_Result extends TCRMEntity {
		comment: string;
		dateUploaded: Date;
		docId: string;
		docName: string;
		docTypeName: string;
		id: number;
		idCustomer: number;
		idDocumentType: number;
	}	
	export class GetCustomerMarkets_Result extends TCRMEntity {
		description: string;
		id: number;
		idCustomer: number;
		idMarket: number;
		name: string;
	}	
    export class GetCustomerProductData_Result extends TCRMEntity {
		currentPrice: number;
		id: number;
		idCustomer: number;
		idProduct: number;
		isAutomotive: boolean;
		partNumberBuyer: string;
		partNumberOEM: string;
		platform: string;
		prodDescription: string;
		productName: string;
	}
	export class GetCustomerProducts_Result extends TCRMEntity {
		buyerName: string;
		id: number;
		idCustomer: number;
		idProduct: number;
		partNumberBuyer: string;
		partNumberOEM: string;
		platform: string;
		prodDescription: string;
		productDescription: string;
		productName: string;
	}
	export class getCustomers_Result extends TCRMEntity {
		colonyName: string;
		daysCredit: number;
		id: number;
		idColony: number;
		idResponsible: number;
		interestRate: number;
		limitCreditGermany: number;
		limitCreditUSA: number;
		name: string;
		number: string;
		phone: string;
		responsibleName: string;
		rFC: string;
		street: string;
	}
	export class GetCustomerSectors_Result extends TCRMEntity {
		description: string;
		id: number;
		idCustomer: number;
		idSector: number;
		name: string;
	}	
	export class GetFieldForPurchaseOrder_Result extends TCRMEntity {
		asImporter: boolean;
		creditDays: number;
		idContact: number;
		idCountryOrigin: number;
		idCurrency: number;
		idCustomer: number;
		idCustomerContact: number;
		idDeliveryPoint: number;
		idDocType: number;
		idIncoTerm: number;
		idLinerTerm: number;
		idMarket: number;
		idMill: number;
		idOpportunity: number;
		idPort: number;
		idQuotationFromSupplier: number;
		idQuotationToCustomer: number;
		idResponsible: number;
		idSector: number;
		idStatus: number;
		idTransactionFlow: number;
		idTypeOpp: number;
		idUser: number;
		interestRate: number;
		isAutomotive: boolean;
		offerValidity: Date;
		oppNotes: string;
		shipmentOffered: Date;
	}
	export class GetFieldForShipping_Result extends TCRMEntity {
		id: number;
		idCountryOrigin: number;
		idCurrency: number;
		idCustomer: number;
		idDeliveryPoint: number;
		idIncoTerm: number;
		idLinerTerm: number;
		idMill: number;
		idPort: number;
		isAutomotive: boolean;
		idDocType: number;
		idStatus: number;
	}	
	export class getListIntFomXML_Result extends TCRMEntity {
		id: number;
	}
	export class GetOppDetailsIndex_Result extends TCRMEntity {
		dateAdded: Date;
		familyDescription: string;
		id: number;
		idFamily: number;
		idOpportunity: number;
		idProduct: number;
		itemDescription: string;
		itemExtended: number;
		itemPrice: number;
		itemQuantity: number;
		productDescription: string;
	}
	export class GetOppDialogDocumentIndex_Result  extends TCRMEntity {
		dateUploaded: Date;
		dNotes: string;
		docName: string;
		docTypeName: string;
		id: number;
		idDocumentType: number;
	}
	export class GetOppDialogIndex_Result extends TCRMEntity {
		actionName: string;
		contactName: string;
		custContactName: string;
		dateDialog: Date;
		id: number;
		idOpportunity: number;
		responsibleName: string;
		toContact: number;
	}
	export class GetOpportunities extends TCRMEntity {
		asImporter: boolean;
		customerName: string;
		dateCreated: Date;
		daysUpdate: number;
		id: number;
		idCustomer: number;
		idStatus: number;
		idUser: number;
		isActive: boolean;
		lastUpdated: Date;
		oppNotes: string;
		pastDue: number;
		responsibleName: string;
		statusName: string;
		userName: string;
	}
	export class GetOpportunityDetails_Result extends TCRMEntity {
		dateAdded: Date;
		id: number;
		idOpportunity: number;
		idProduct: number;
		itemDescription: string;
		itemExtended: number;
		itemPrice: number;
		itemQuantity: number;
		partNumberBuyer: string;
		partNumberOEM: string;
		platform: string;
		productDescription: string;
		productName: string;
	}
	export class GetPODetailForShipping_Result extends TCRMEntity {
		amountSum: number;
		asImporter: boolean;
		itemExtended: number;
		id: number;
		idCurrency: number;
		idDetail: number;
		idDetailSum: number;
		idIncoTerm: number;
		idLinerTerm: number;
		idMarket: number;
		idProduct: number;
		idSector: number;
		idStatus: number;
		idTransactionFlow: number;
		interestRate: number;
		itemDescription: string;
		itemPrice: number;
		itemQuantity: number;
		pONumber: string;
		priceSum: number;
		productName: string;
		qtyInShipping: number;
		qtyShipSum: number;
		qtySum: number;
		salePrice: number;
		shipQty: number;
		sumaryDescription: string;
	}	
	export class getProductProperties_Result extends TCRMEntity {
		description: string;
		id: number;
		idProperty: number;
		isRequired: boolean;
		name: string;
		pOrder: number;
	}
	export class getProducts_Result extends TCRMEntity {
		description: string;
		familyDescription: string;
		familyName: string;
		id: number;
		idFamily: number;
		name: string;
	}
	export class GetProductsPaged extends TCRMEntity {
		description: string;
		familyDescription: string;
		familyName: string;
		id: number;
		idFamily: number;
		name: string;
	}
	export class getProductsPaged_Result extends TCRMEntity {
		description: string;
		familyDescription: string;
		familyName: string;
		id: number;
		idFamily: number;
		name: string;
	}
	export class GetPurchaseOrder_Result extends TCRMEntity {
		allowChild: boolean;
		aSign: string;
		currencyName: string;
		customerName: string;
		docTypeName: string;
		id: number;
		idCurrency: number;
		idDocType: number;
		idMill: number;
		idQuotationToCustomer: number;
		idStatus: number;
		isAutomotive: boolean;
		isEditable: boolean;
		millName: string;
		sMIM: string;
		sstatusName: string;
	}
	export class GetPurchaseOrderDetails_Result extends TCRMEntity {
		id: number;
		idProduct: number;
		idPurchaseOrder: number;
		itemDescription: string;
		itemExtended: number;
		itemPrice: number;
		itemQuantity: number;
		partNumberBuyer: string;
		partNumberOEM: string;
		platform: string;
		productDescription: string;
		productName: string;
		salePrice: number;
		shipQty: number;
	}
	export class GetPurchaseOrderDialogDocumentIndex_Result extends TCRMEntity {
		dateUploaded: Date;
		dNotes: string;
		docId: string;
		docName: string;
		docTypeName: string;
		id: number;
		idDocumentType: number;
	}
	export class GetPurchaseOrderDialogIndex_Result extends TCRMEntity {
		actionName: string;
		contactName: string;
		custContactName: string;
		dateDialog: Date;
		id: number;
		idPurchaseOrder: number;
		responsibleName: string;
		toContact: number;
	}
	export class GetQFSFields_Result extends TCRMEntity {
		asImporter: boolean;
		creditDays: number;
		idContact: number;
		idCountryOrigin: number;
		idCurrency: number;
		idCustomer: number;
		idCustomerContact: number;
		idDeliveryPoint: number;
		idDocType: number;
		idIncoTerm: number;
		idLinerTerm: number;
		idMarket: number;
		idMill: number;
		idOpportunity: number;
		idPort: number;
		idResponsible: number;
		idSector: number;
		idStatus: number;
		idTransactionFlow: number;
		idTypeOpp: number;
		idUser: number;
		interestRate: number;
		offerValidity: Date;
		oppNotes: string;
		shipmentOffered: Date;
	}
	export class getQuotationFromSupplier_Result extends TCRMEntity {
		allowChild: boolean;
		aSign: string;
		asImporter: boolean;
		currencyName: string;
		customerName: string;
		dateReceived: Date;
		docTypeName: string;
		id: number;
		idCurrency: number;
		idDocType: number;
		idMill: number;
		idOpportunity: number;
		idPort: number;
		idStatus: number;
		isAutomotive: boolean;
		isEditable: boolean;
		millName: string;
		portName: string;
		sstatusName: string;
	}
	export class GetQuotationFromSupplierDetails_Result extends TCRMEntity {
		id: number;
		idProduct: number;
		idQuotationFromSupplier: number;
		itemDescription: string;
		itemExtended: number;
		itemPrice: number;
		itemQuantity: number;
		partNumberBuyer: string;
		partNumberOEM: string;
		platform: string;
		productDescription: string;
		productName: string;
		salePrice: number;
	}
	export class GetQuotationFromSupplierDialogDocumentIndex_Result extends TCRMEntity {
		dateUploaded: Date;
		dNotes: string;
		docId: string;
		docName: string;
		docTypeName: string;
		id: number;
		idDocumentType: number;
	}
	export class GetQuotationFromSupplierDialogIndex_Result extends TCRMEntity {
		actionName: string;
		contactName: string;
		custContactName: string;
		dateDialog: Date;
		id: number;
		idQuotationFromSupplier: number;
		responsibleName: string;
		toContact: number;
	}
	export class GetQuotationToCustomer_Result extends TCRMEntity {
		allowChild: boolean;
		aSign: string;
		currencyName: string;
		customerName: string;
		docTypeName: string;
		id: number;
		idCurrency: number;
		idDocType: number;
		idMill: number;
		idQuotationFromSupplier: number;
		idStatus: number;
		isAutomotive: boolean;
		isEditable: boolean;
		millName: string;
		sstatusName: string;
	}
	export class GetQuotationToCustomerDetails_Result extends TCRMEntity {
		id: number;
		idProduct: number;
		idQuotationToCustomer: number;
		itemDescription: string;
		itemExtended: number;
		itemPrice: number;
		itemQuantity: number;
		partNumberBuyer: string;
		partNumberOEM: string;
		platform: string;
		productDescription: string;
		productName: string;
		salePrice: number;
	}
	export class GetQuotationToCustomerDialogDocumentIndex_Result extends TCRMEntity {
		dateUploaded: Date;
		dNotes: string;
		docId: string;
		docName: string;
		docTypeName: string;
		id: number;
		idDocumentType: number;
	}
	export class GetQuotationToCustomerDialogIndex_Result extends TCRMEntity {
		actionName: string;
		contactName: string;
		custContactName: string;
		dateDialog: Date;
		id: number;
		idQuotationToCustomer: number;
		responsibleName: string;
		toContact: number;
	}
	export class getResponsible_Result extends TCRMEntity {
		cellPhone: string;
		eMail: string;
		id: number;
		idPosition: number;
		isActive: boolean;
		name: string;
		officePhone: string;
		positionDescription: string;
	}
	export class GetShippingDetails_Result extends TCRMEntity  {
		extended: number;
		id: number;
		idPurchaseOrder: number;
		idPurchaseOrderDetail: number;
		idPurchaseOrderDetailSumary: number;
		idShipping: number;
		itemDescription: string;
		shipPrice: number;
		shipQty: number;
		sumaryDescription: string;
		sumaryOrdered: number;
		totalQtyOrdered: number;
	}
	export class GetShippingDialogDocumentIndex_Result extends TCRMEntity {
		dateUploaded: Date;
		dNotes: string;
		docId: string;
		docName: string;
		docTypeName: string;
		id: number;
		idDocumentType: number;
	}
	export class GetShippingDialogIndex_Result extends TCRMEntity {
		actionName: string;
		contactName: string;
		custContactName: string;
		dateDialog: Date;
		id: number;
		idShipping: number;
		responsibleName: string;
		toContact: number;
	}	
	export class GetShippings_Result extends TCRMEntity  {
		aDA: Date;
		bLDate: Date;
		bLNumber: string;
		cDPName: string;
		countryName: string;
		customerName: string;
		eTA: Date;
		eTD: Date;
		id: number;
		idCountryOrigin: number;
		idCustomer: number;
		idDeliveryPoint: number;
		idMill: number;
		idPort: number;
		idStatus: number;
		idUser: number;
		isAutomotive: boolean;
		millName: string;
		portName: string;
		shipDate: Date;
		statusName: string;
		userName: string;
	}
	export class getState_Result extends TCRMEntity  {
		countryName: string;
		description: string;
		fullName: string;
		id: number;
		idCountry: number;
		name: string;
	}
	export class GetStatusByDocType_Result extends TCRMEntity {
		allowChild: boolean;
		description: string;
		id: number;
		idDocType: number;
		idDStatus: number;
		isEditable: boolean;
		name: string;
	}
	export class getUsers_Result extends TCRMEntity {
		firstName: string;
		id: number;
		isActive: boolean;
		lastName: string;
		userName: string;
		userPassword: string;
		userPassword1: string;
	}
	export class IncoTerm  extends TCRMEntity {
		deliveryRequired: boolean;
		description: string;
		id: number;
		name: string;
		opportunities: Opportunity[];
		purchaseOrders: PurchaseOrder[];
		quotationFromSuppliers: QuotationFromSupplier[];
		quotationToCustomers: QuotationToCustomer[];
	}
	export class LinerTerm extends TCRMEntity {
		description: string;
		id: number;
		name: string;
		opportunities: Opportunity[];
		purchaseOrders: PurchaseOrder[];
		quotationFromSuppliers: QuotationFromSupplier[];
		quotationToCustomers: QuotationToCustomer[];
	}
	export class Log extends TCRMEntity {
		appDomainName: string;
		categoryLogs: CategoryLog[];
		eventId: number;
		formattedMessage: string;
		logId: number;
		machineName: string;
		message: string;
		priority: number;
		processID: string;
		processName: string;
		severity: string;
		threadName: string;
		timestamp: Date;
		title: string;
		win32ThreadId: string;
	}
	export class Market extends TCRMEntity {
		customerMarkets: CustomerMarket[];
		description: string;
		id: number;
		name: string;
		opportunities: Opportunity[];
		purchaseOrders: PurchaseOrder[];
	}
	export class MessageTemplate extends TCRMEntity {
		id: number;
		messageBody: string;
		messageSubject: string;
	}
	export class Mill extends TCRMEntity {
		countries: Country[];
		description: string;
		id: number;
		name: string;
		purchaseOrders: PurchaseOrder[];
		quotationFromSuppliers: QuotationFromSupplier[];
		quotationToCustomers: QuotationToCustomer[];
		shippings: Shipping[];
	}
	export class MillCountry extends TCRMEntity {
		id: number;
		idMill: number;
		idCountry: number;
	}
	export class Opportunity extends TCRMEntity {
		asImporter: boolean;
		comments: string;
		contact: Contact;
		creditDays: number;
		currency: Currency;
		customer: Customer;
		customerContact: CustomerContact;
		customerDeliveryPoint: CustomerDeliveryPoint;
		dateCreated: Date;
		docType: DocType;
		estatusOpportunity: EstatusOpportunity;
		id: number;
		idContact: number;
		idCurrency: number;
		idCustomer: number;
		idCustomerContact: number;
		idDeliveryPoint: number;
		idDocType: number;
		idIncoTerm: number;
		idLinerTerms: number;
		idMarket: number;
		idPort: number;
		idResponsible: number;
		idSector: number;
		idStatus: number;
		idTransactionFlow: number;
		idTypeOpp: number;
		idUser: number;
		incoTerm: IncoTerm;
		interestRate: number;
		isActive: boolean;
		isAutomotive: boolean;
		lastUpdated: Date;
		linerTerm: LinerTerm;
		market: Market;
		oppNotes: string;
		opportunityDetails: OpportunityDetail[];
		opportunityDialogs: OpportunityDialog[];
		port: Port;
		purchaseOrders: PurchaseOrder[];
		quotationFromSuppliers: QuotationFromSupplier[];
		responsible: Responsible;
		sector: Sector;
		transactionFlow: TransactionFlow;
		typeOpportunity: TypeOpportunity;
		user: User;
	}
	export class OpportunityDetail extends TCRMEntity  {
		dateAdded: Date;
		id: number;
		idCustomerProduct: number;
		idOpportunity: number;
		idProduct: number;
		itemDescription: string;
		itemExtended: number = 0;
		itemPrice: number = 0;
		itemQuantity: number = 0;
		opportunity: Opportunity;
		opportunityDetailSumaries: OpportunityDetailSumary[];
		product: Product;
	}
	export class OpportunityDetailSumary extends EditorDetailSumary {
		idOpportunityDetail: number;
		opportunityDetailSumaryProperties: OpportunityDetailSumaryProperty[];
	}
	export class OpportunityDetailSumaryProperty extends EditorDetailSumaryProperty {
		idOpportunityDetailSumary: number;
	}
	export class OpportunityDialog extends BaseOrderDialog {
		idOpportunity: number;
	}
	export class OpportunityDocument extends BaseDocument {
		aData: number[];
		aData64: string;
		dateUploaded: Date;
		dNotes: string;
		docId: string;
		docName: string;
		documentType: DocumentType;
		id: number;
		idDocumentType: number;
		idOpportunityDialog: number;
		opportunityDialog: OpportunityDialog;
		parentFolder: string;
	}
	export class Organization extends TCRMEntity {
		contacts: Contact[];
		description: string;
		id: number;
		name: string;
	}
	export class PaymentTerm extends TCRMEntity {
		description: string;
		id: number;
		name: string;
	}
	export class Port extends TCRMEntity {
		description: string;
		id: number;
		name: string;
		opportunities: Opportunity[];
		purchaseOrders: PurchaseOrder[];
		quotationFromSuppliers: QuotationFromSupplier[];
		quotationToCustomers: QuotationToCustomer[];
		shippings: Shipping[];
	}
	export class Position extends TCRMEntity {
		customerContacts: CustomerContact[];
		description: string;
		id: number;
		name: string;
		responsibles: Responsible[];
	}
	export class Product extends TCRMEntity {
		campaignTemplate: string;
		campaignTemplateSubject: string;
		customerProducts: CustomerProduct[];
		description: string;
		family: Family;
		id: number;
		idFamily: number;
		name: string;
		opportunityDetails: OpportunityDetail[];
		productProperties: ProductProperty[];
		purchaseOrderDetails: PurchaseOrderDetail[];
		quotationFromSupplierDetails: QuotationFromSupplierDetail[];
		quotationToCustomerDetails: QuotationToCustomerDetail[];
		suppliers: Supplier[];
	}
	export class ProductProperty extends TCRMEntity {
		id: number;
		idProduct: number;
		idProperty: number;
		isRequired: boolean;
		pOrder: number;
		product: Product;
		property: Property;
	}
	export class Property extends TCRMEntity {
		customerProductProperties: CustomerProductProperty[];
		description: string;
		id: number;
		name: string;
		opportunityDetailSumaryProperties: OpportunityDetailSumaryProperty[];
		productProperties: ProductProperty[];
		purchaseOrderDetailSumaryProperties: PurchaseOrderDetailSumaryProperty[];
		quotationFromSupplierDetailSumaryProperties: QuotationFromSupplierDetailSumaryProperty[];
		quotationToCustomerDetailSumaryProperties: QuotationToCustomerDetailSumaryProperty[];
	}
	export class PurchaseOrder extends BaseOpportunity {

		asImporter: boolean;
		bookingDate: Date;
		comments: string;
		contact: Contact;
		country: Country;
		creditDays: number;
		currency: Currency;
		customer: Customer;
		customerContact: CustomerContact;
		customerDeliveryPoint: CustomerDeliveryPoint;
		dateCreated: Date;
		docType: DocType;
		estatusOpportunity: EstatusOpportunity;
		id: number;
		idContact: number;
		idCountryOrigin: number;
		idCurrency: number;
		idCustomer: number;
		idCustomerContact: number;
		idDeliveryPoint: number;
		idDocType: number;
		idIncoTerm: number;
		idLinerTerm: number;
		idMarket: number;
		idMill: number;
		idOpportunity: number;
		idPort: number;
		idQuotationFromSupplier: number;
		idQuotationToCustomer: number;
		idResponsible: number;
		idSector: number;
		idStatus: number;
		idTransactionFlow: number;
		idTypeOpp: number;
		idUser: number;
		incoTerm: IncoTerm;
		interestRate: number;
		isActive: boolean;
		isAutomotive: boolean;
		lastUpdated: Date;
		linerTerm: LinerTerm;
		market: Market;
		mill: Mill;
		offerValidity: Date;
		oppNotes: string;
		opportunity: Opportunity;
		poNumber: string;
		port: Port;
		purchaseOrderDetails: PurchaseOrderDetail[];
		purchaseOrderDialogs: PurchaseOrderDialog[];
		quotationFromSupplier: QuotationFromSupplier;
		quotationToCustomer: QuotationToCustomer;
		responsible: Responsible;
		sector: Sector;
		shipmentOffered: Date;
		shippingDetails: ShippingDetail[];
		smim: string;
		transactionFlow: TransactionFlow;
		typeOpportunity: TypeOpportunity;
		user: User;
	}
	export class PurchaseOrderDetail extends TCRMEntity {
		dateAdded: Date;
		id: number;
		idCustomerProduct: number;
		idProduct: number;
		idPurchaseOrder: number;
		itemDescription: string;
		itemExtended: number;
		itemPrice: number;
		itemQuantity: number;
		product: Product;
		purchaseOrder: PurchaseOrder;
		purchaseOrderDetailSumaries: PurchaseOrderDetailSumary[];
		salePrice: number;
		shippingDetails: ShippingDetail[];
		shipQty: number;
	}
	export class PurchaseOrderDetailSumary extends EditorDetailSumary {
		amount: number;
		comment: string;
		dateCreated: Date;
		id: number;
		idPurchaseOrderDetail: number;
		price: number;
		purchaseOrderDetail: PurchaseOrderDetail;
		purchaseOrderDetailSumaryProperties: PurchaseOrderDetailSumaryProperty[];
		qtyShipped: number;
		quantity: number;
		shippingDetails: ShippingDetail[];
	}
	export class PurchaseOrderDetailSumaryProperty extends EditorDetailSumaryProperty {
		idPurchaseOrderDetailSumary: number;
		purchaseOrderDetailSumary: PurchaseOrderDetailSumary;
	}
	export class PurchaseOrderDialog extends BaseOrderDialog {
		idPurchaseOrder: number;
		purchaseOrder: PurchaseOrder;
		purchaseOrderDocuments: PurchaseOrderDocument[];
	}
	export class PurchaseOrderDocument extends BaseDocument {
		idPurchaseOrderDialog: number;
	}
	export class QuotationFromSupplier extends BaseOpportunity {
		asImporter: boolean;
		country: Country;
		creditDays: number;
		currency: Currency;
		customerDeliveryPoint: CustomerDeliveryPoint;
		dateCreated: Date;
		dateReceived: Date;
		docType: DocType;
		estatusOpportunity: EstatusOpportunity;
		id: number;
		idCountryOrigin: number;
		idCurrency: number;
		idDeliveryPoint: number;
		idDocType: number;
		idIncoTerm: number;
		idLinerTerm: number;
		idMill: number;
		idOpportunity: number;
		idPort: number;
		idStatus: number;
		idTransactionFlow: number;
		idTypeOpp: number;
		idUser: number;
		incoTerm: IncoTerm;
		interestRate: number;
		isAutomotive: boolean;
		linerTerm: LinerTerm;
		mill: Mill;
		offerValidity: Date;
		idCustomer: number;
		opportunity: Opportunity;
		port: Port;
		purchaseOrders: PurchaseOrder[];
		quotationFromSupplierDetails: QuotationFromSupplierDetail[];
		quotationFromSupplierDialogs: QuotationFromSupplierDialog[];
		quotationToCustomers: QuotationToCustomer[];
		quoteNotes: string;
		shipmentOffered: Date;
		transactionFlow: TransactionFlow;
		typeOpportunity: TypeOpportunity;
		user: User;
	}
	export class QuotationFromSupplierDetail extends TCRMEntity {
		dateAdded: Date;
		id: number;
		idCustomerProduct: number;
		idProduct: number;
		idQuotationFromSupplier: number;
		itemDescription: string;
		itemExtended: number;
		itemPrice: number;
		itemQuantity: number;
		product: Product;
		quotationFromSupplier: QuotationFromSupplier;
		quotationFromSupplierDetailSumaries: QuotationFromSupplierDetailSumary[];
		salePrice: number;
	}
	export class QuotationFromSupplierDetailSumary extends EditorDetailSumary {
		amount: number;
		comment: string;
		dateCreated: Date;
		id: number;
		idQuotationFromSupplierDetail: number;
		price: number;
		quantity: number;
		quotationFromSupplierDetail: QuotationFromSupplierDetail;
		quotationFromSupplierDetailSumaryProperties: QuotationFromSupplierDetailSumaryProperty[];
	}
	export class QuotationFromSupplierDetailSumaryProperty extends EditorDetailSumaryProperty {
		idQuotationFromSupplierDetailSumary: number;
		quotationFromSupplierDetailSumary: QuotationFromSupplierDetailSumary;
	}
	export class QuotationFromSupplierDialog extends BaseOrderDialog {
		idQuotationFromSupplier: number;
	}
	export class QuotationFromSupplierDocument extends BaseDocument {
		idQuotationFromSupplierDialog: number;
	}

	export class QuotationToCustomer extends BaseOpportunity {
		asImporter: boolean;
		country: Country;
		creditDays: number;
		currency: Currency;
		customerDeliveryPoint: CustomerDeliveryPoint;
		dateCreated: Date;
		dateSend: Date;
		docType: DocType;
		estatusOpportunity: EstatusOpportunity;
		id: number;
		idCountry: number;
		idCurrency: number;
		idDeliveryPoint: number;
		idDocType: number;
		idIncoTerm: number;
		idLinerTerm: number;
		idMill: number;
		idPort: number;
		idQuotationFromSupplier: number;
		idStatus: number;
		idTypeOpp: number;
		idUser: number;
		incoTerm: IncoTerm;
		interestRate: number;
		isAutomotive: boolean;
		linerTerm: LinerTerm;
		mill: Mill;
		offerValidity: Date;
		idCustomer: number;
		port: Port;

		purchaseOrders: PurchaseOrder[];
		quotationFromSupplier: QuotationFromSupplier;
		quotationToCustomerDetails: QuotationToCustomerDetail[];
		quoteNotes: string;
		shipmentOffered: Date;
		typeOpportunity: TypeOpportunity;
		user: User;
	}
	export class QuotationToCustomerDetail extends TCRMEntity {
		expenseSMIM_Cost: number;
		expenseSupplierSide_Cost: number;
		id: number;
		idCustomerProduct: number;
		idProduct: number;
		idQuotationToCustomer: number;
		itemDescription: string;
		itemExtended: number;
		itemPrice: number;
		itemQuantity: number;
		product: Product;
		profit: number;
		quotationToCustomer: QuotationToCustomer;
		quotationToCustomerDetailSumaries: QuotationToCustomerDetailSumary[];
		salePrice: number;
		salesPriceBased: number;
	}
	export class QuotationToCustomerDetailSumary extends EditorDetailSumary {
		amount: number;
		comment: string;
		dateCreated: Date;
		id: number;
		idQuotationToCustomerDetail: number;
		price: number;
		quantity: number;
		quotationToCustomerDetail: QuotationToCustomerDetail;
		quotationToCustomerDetailSumaryProperties: QuotationToCustomerDetailSumaryProperty[];
	}
	export class QuotationToCustomerDetailSumaryProperty extends EditorDetailSumaryProperty {
		idQuotationToCustomerDetailSumary: number;
		quotationToCustomerDetailSumary: QuotationToCustomerDetailSumary;
	}
	export class QuotationToCustomerDialog extends BaseOrderDialog {
		idQuotationToCustomer: number;
	}
	export class QuotationToCustomerDocument extends BaseDocument {
		idQuotationToCustomerDialog: number;
	}
	export class RailSpur extends TCRMEntity {
		carsPerDay: number;
		colony: Colony;
		customerRailSpurs: CustomerRailSpur[];
		id: number;
		idColony: number;
		idRailSpurType: number;
		idRailway: number;
		name: string;
		number: string;
		phone: string;
		railSpur1: string;
		railSpurType: RailSpurType;
		railway: Railway;
		rFC: string;
		station: string;
		street: string;
		zona: string;
	}
	export class RailSpurType extends TCRMEntity {
		description: string;
		id: number;
		name: string;
		railSpurs: RailSpur[];
	}
	export class Railway extends TCRMEntity {
		description: string;
		id: number;
		name: string;
		railSpurs: RailSpur[];
	}
	export class Responsible extends TCRMEntity {
		cellPhone: string;
		customers: Customer[];
		eMail: string;
		id: number;
		idPosition: number;
		idUser: number;
		isActive: boolean;
		name: string;
		officePhone: string;
		opportunities: Opportunity[];
		opportunityDialogs: OpportunityDialog[];
		position: Position;
		purchaseOrderDialogs: PurchaseOrderDialog[];
		purchaseOrders: PurchaseOrder[];
		quotationFromSupplierDialogs: QuotationFromSupplierDialog[];
		quotationToCustomerDialogs: QuotationToCustomerDialog[];
		responsibleTargets: ResponsibleTarget[];
		rspPassword: string;
		rspUserCredential: string;
		user: User;
	}
	export class ResponsibleTarget extends TCRMEntity {
		family: Family;
		id: number;
		idFamily: number;
		idResponsible: number;
		responsible: Responsible;
		responsibleTargetYear: number;
		targetQty: number;
	}
	export class ReturnSaveRequest extends TCRMEntity {
		data: any;
		message: string;
	}
	export class Sector extends TCRMEntity {
		customerSectors: CustomerSector[];
		description: string;
		id: number;
		name: string;
		opportunities: Opportunity[];
		purchaseOrders: PurchaseOrder[];
	}
	export class Shipping extends TCRMEntity {
		ada: Date;
		blDate: Date;
		blNumber: string;
		country: Country;
		currency: Currency;
		customer: Customer;
		customerDeliveryPoint: CustomerDeliveryPoint;
		eta: Date;
		etd: Date;
		id: number;
		idCountryOrigin: number;
		idCurrency: number;
		idCustomer: number;
		idDeliveryPoint: number;
		idIncoTerm: number;
		idLinerTerm: number;		
		idMill: number;
		idPort: number;
		idStatus: number;
		idUser: number;
		incoTerm: IncoTerm;
		isAutomotive: boolean;
		linerTerm: LinerTerm;
		mill: Mill;
		port: Port;
		shipDate: Date;
		shipNotes: string;
		shippingDetails: ShippingDetail[];
		user: User;
		vesselName: string;
	}
	export class ShippingDetail extends TCRMEntity {
		extended: number;
		id: number;
		idPurchaseOrder: number;
		idPurchaseOrderDetail: number;
		idPurchaseOrderDetailSumary: number;
		idShipping: number;
		purchaseOrder: PurchaseOrder;
		purchaseOrderDetail: PurchaseOrderDetail;
		purchaseOrderDetailSumary: PurchaseOrderDetailSumary;
		shipping: Shipping;
		shipPrice: number;
		shipQty: number;
	}
	export class ShippingDialog extends TCRMEntity {
		actionOpportunity: ActionOpportunity;
		contact: Contact;
		customerContact: CustomerContact;
		dateDialog: Date;
		dateSend: Date;
		dNotes: string;
		emailSended: boolean;
		id: number;
		idAction: number;
		idContact: number;
		idCustomerContact: number;
		idResponsible: number;
		idShipping: number;
		shipping: Shipping;
		shippingDialogDocuments: ShippingDialogDocument[];
		subject: string;
		toContact: number;
	}
	export class ShippingDialogDocument extends TCRMEntity {
		dateUploaded: Date;
		dNotes: string;
		docId: string;
		docName: string;
		documentType: DocumentType;
		id: number;
		idDocumentType: number;
		idShippingDialog: number;
		parentFolder: string;
		shippingDialog: ShippingDialog;
	}	
	export class State extends TCRMEntity {
		cities: City[];
		country: Country;
		description: string;
		id: number;
		idCountry: number;
		name: string;
	}
	export class Supplier extends TCRMEntity {
		country: Country;
		id: number;
		idCountry: number;
		isActive: boolean;
		name: string;
		products: Product[];
		shortName: string;
		supplierContacts: SupplierContact[];
	}
	export class SupplierContact extends TCRMEntity {
		cellPhone: string;
		department: string;
		eMail: string;
		id: number;
		idSupplier: number;
		isActive: boolean;
		name: string;
		officePhone: string;
		supplier: Supplier;
	}
	export class sysdiagram extends TCRMEntity {
		definition: number[];
		diagram_id: number;
		name: string;
		principal_id: number;
		version: number;
	}
	export class TemplateEMail extends TCRMEntity {
		actionOpportunityDocTypes: ActionOpportunityDocType[];
		documentTypes: DocumentType[];
		eMailBody: string;
		eMailSubject: string;
		id: number;
		name: string;
	}
	export class Tender extends TCRMEntity {
		description: string;
		id: number;
		name: string;
	}
	export class TransactionFlow extends TCRMEntity {
		description: string;
		id: number;
		name: string;
		opportunities: Opportunity[];
		purchaseOrders: PurchaseOrder[];
		quotationFromSuppliers: QuotationFromSupplier[];
	}
	export class TypeOpportunity extends TCRMEntity {
		description: string;
		id: number;
		name: string;
		opportunities: Opportunity[];
		purchaseOrders: PurchaseOrder[];
		quotationFromSuppliers: QuotationFromSupplier[];
		quotationToCustomers: QuotationToCustomer[];
	}
	export class User extends TCRMEntity {
		eMail: string;
		id: number;
		isActive: boolean;
		isAdmin: boolean;
		name: string;
		opportunities: Opportunity[];
		purchaseOrders: PurchaseOrder[];
		quotationFromSuppliers: QuotationFromSupplier[];
		quotationToCustomers: QuotationToCustomer[];
		responsibles: Responsible[];
		shippings: Shipping[];
		userName: string;
		userPassword: string;
	}


	export class ShipPODetailModel extends TCRMEntity {
		items: GetPODetailForShipping_Result[];
		po: number;
	}
export class ValidaCustomerProductPriceDate_Result extends TCRMEntity {
		id: number;
		idCustomer: number;
		idProduct: number;
		price: number;
		validFrom: Date;
		validTo: Date;
	}
