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
	}
	export class TCRMEntity extends BaseEntity {
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
		actionOpportunityDocTypes: ActionOpportunityDocType[];
		eMailTo: number;
		estatusOpportunity: EstatusOpportunity;
		id: number;
		idStatus: number;
		name: string;
		opportunityDialogs: OpportunityDialog[];
		purchaseOrderDialogs: PurchaseOrderDialog[];
		quotationFromSupplierDialogs: QuotationFromSupplierDialog[];
		quotationToCustomerDialogs: QuotationToCustomerDialog[];
		showActionType: number;
	}
	export class ActionOpportunityDocType extends TCRMEntity {
		actionOpportunity: ActionOpportunity;
		docType: DocType;
		id: number;
		idActionOpportunity: number;
		idDocType: number;
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
		customers: Customer[];
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
		brokers: Broker[];
		city: City;
		colonyType: ColonyType;
		companies: Company[];
		customerDeliveryPoints: CustomerDeliveryPoint[];
		customers: Customer[];
		description: string;
		id: number;
		idCity: number;
		idColonyType: number;
		name: string;
		railSpurs: RailSpur[];
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
		logo: number[];
		number: string;
		phone: string;
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
		customerContacts: CustomerContact[];
		customerDeliveryPoints: CustomerDeliveryPoint[];
		customerDocuments: CustomerDocument[];
		daysCredit: number;
		id: number;
		idColony: number;
		idResponsible: number;
		interestRate: number;
		limitCreditGermany: number;
		limitCreditUSA: number;
		markets: Market[];
		name: string;
		number: string;
		opportunities: Opportunity[];
		phone: string;
		productExtendeds: ProductExtended[];
		products: Product[];
		purchaseOrders: PurchaseOrder[];
		railSpurs: RailSpur[];
		responsible: Responsible;
		rFC: string;
		sectors: Sector[];
		street: string;
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
		cDPContact: string;
		cDPCP: string;
		cDPName: string;
		cDPStreet: string;
		cDPTelephone: string;
		colony: Colony;
		customer: Customer;
		deliveryType: DeliveryType;
		id: number;
		idColony: number;
		idCustomer: number;
		idDeliveryType: number;
	}
	export class CustomerDocument extends TCRMEntity {
		comment: string;
		customer: Customer;
		dateUploaded: Date;
		docId: string;
		docName: string;
		id: number;
		idCustomer: number;
		parentFolder: string;
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
		id: number;
		name: string;
		opportunities: Opportunity[];
		purchaseOrders: PurchaseOrder[];
		quotationFromSuppliers: QuotationFromSupplier[];
		quotationToCustomers: QuotationToCustomer[];
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
		id: number;
		isEditable: boolean;
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
	export class GenericList extends TCRMEntity {
		descripcion: string;
		idString: string;
		name: string;
	}
	export class GetActionDoctType_Result  extends TCRMEntity {
		docTypeName: string;
		eMailSubject: string;
		id: number;
		idActionOpportunity: number;
		idDocType: number;
		idTemplateEmail: number;
		name: string;
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
		name: string;
	}
	export class getCustomerContactList_Result extends TCRMEntity {
		email: string;
		id: number;
		idCustomer: number;
		name: string;
		nickName: string;
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
	export class GetCustomerProducts_Result extends TCRMEntity {
		customerName: string;
		familyName: string;
		idCustomer: number;
		idFamily: number;
		idProduct: number;
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
	export class GetFieldForPurchaseOrder_Result extends TCRMEntity {
		asImporter: boolean;
		creditDays: number;
		deliveryLocation: string;
		idContact: number;
		idCountryOrigin: number;
		idCurrency: number;
		idCustomer: number;
		idCustomerContact: number;
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
		offerValidity: Date;
		oppNotes: string;
		shipmentOffered: Date;
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
		productDescription: string;
		productName: string;
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
		itemPrice: number;
		itemQuantity: number;
		productDescription: string;
		productName: string;
		salePrice: number;
	}
	export class GetPurchaseOrderDialogDocumentIndex_Result extends TCRMEntity {
		dateUploaded: Date;
		dNotes: string;
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
	export class GetQFSFields_Result {
			asImporter: boolean;
			creditDays: number;
			deliveryLocation: string;
			idContact: number;
			idCountryOrigin: number;
			idCurrency: number;
			idCustomer: number;
			idCustomerContact: number;
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
		isEditable: boolean;
		millName: string;
		portName: string;
		sstatusName: string;
	}
	export class GetQuotationFromSupplierDetails_Result extends TCRMEntity {
		extended: number;
		id: number;
		idProduct: number;
		idQuotationFromSupplier: number;
		itemDescription: string;
		itemPrice: number;
		itemQuantity: number;
		productDescription: string;
		productName: string;
		salePrice: number;
	}
	export class GetQuotationFromSupplierDialogDocumentIndex_Result extends TCRMEntity {
		dateUploaded: Date;
		dNotes: string;
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
		isEditable: boolean;
		millName: string;
		sstatusName: string;
	}
	export class GetQuotationToCustomerDetails_Result extends TCRMEntity {
		id: number;
		idProduct: number;
		idQuotationToCustomer: number;
		itemDescription: string;
		itemPrice: number;
		itemQuantity: number;
		productDescription: string;
		productName: string;
		salePrice: number;
	}
	export class GetQuotationToCustomerDialogDocumentIndex_Result extends TCRMEntity {
		dateUploaded: Date;
		dNotes: string;
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
	export class getState_Result extends TCRMEntity {
		countryName: string;
		description: string;
		fullName: string;
		id: number;
		idCountry: number;
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
		customers: Customer[];
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
	}
	export class OEM extends TCRMEntity {
		description: string;
		id: number;
		name: string;
		productExtendeds: ProductExtended[];
	}
	export class Opportunity extends TCRMEntity {
		asImporter: boolean;
		comments: string;
		contact: Contact;
		creditDays: number;
		currency: Currency;
		customer: Customer;
		customerContact: CustomerContact;
		dateCreated: Date;
		deliveryLocation: string;
		docType: DocType;
		estatusOpportunity: EstatusOpportunity;
		id: number;
		idContact: number;
		idCurrency: number;
		idCustomer: number;
		idCustomerContact: number;
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
	export class OpportunityDetail extends TCRMEntity {
		dateAdded: Date;
		id: number;
		idOpportunity: number;
		idProduct: number;
		itemDescription: string;
		itemExtended: number;
		itemPrice: number;
		itemQuantity: number;
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
		customers: Customer[];
		description: string;
		family: Family;
		id: number;
		idFamily: number;
		name: string;
		opportunityDetails: OpportunityDetail[];
		productExtendeds: ProductExtended[];
		productProperties: ProductProperty[];
		purchaseOrderDetails: PurchaseOrderDetail[];
		quotationFromSupplierDetails: QuotationFromSupplierDetail[];
		quotationToCustomerDetails: QuotationToCustomerDetail[];
		suppliers: Supplier[];
	}
	export class ProductExtended extends TCRMEntity {
		buyerName: string;
		customer: Customer;
		customerName: string;
		eAU: number;
		id: number;
		idCustomer: number;
		idOEM: number;
		idProduct: number;
		oEM: OEM;
		partNumberBuyer: string;
		partNumberOEM: string;
		platform: string;
		prodDescription: string;
		product: Product;
		productExtendedPrices: ProductExtendedPrice[];
		spec: number;
		thickness: number;
		width: number;
	}
	export class ProductExtendedPrice extends TCRMEntity {
		id: number;
		idProductExtended: number;
		price: number;
		productExtended: ProductExtended;
		validFrom: Date;
		validTo: Date;
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
		description: string;
		id: number;
		name: string;
		opportunityDetailSumaryProperties: OpportunityDetailSumaryProperty[];
		productProperties: ProductProperty[];
		purchaseOrderDetailSumaryProperties: PurchaseOrderDetailSumaryProperty[];
		quotationFromSupplierDetailSumaryProperties: QuotationFromSupplierDetailSumaryProperty[];
		quotationToCustomerDetailSumaryProperties: QuotationToCustomerDetailSumaryProperty[];
	}
	export class PurchaseOrder extends TCRMEntity {
		asImporter: boolean;
		bookingDate: Date;
		comments: string;
		contact: Contact;
		country: Country;
		creditDays: number;
		currency: Currency;
		customer: Customer;
		customerContact: CustomerContact;
		dateCreated: Date;
		deliveryLocation: string;
		docType: DocType;
		estatusOpportunity: EstatusOpportunity;
		id: number;
		idContact: number;
		idCountryOrigin: number;
		idCurrency: number;
		idCustomer: number;
		idCustomerContact: number;
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
		lastUpdated: Date;
		linerTerm: LinerTerm;
		market: Market;
		mill: Mill;
		offerValidity: Date;
		oppNotes: string;
		opportunity: Opportunity;
		pONumber: string;
		port: Port;
		purchaseOrderDetails: PurchaseOrderDetail[];
		purchaseOrderDialogs: PurchaseOrderDialog[];
		quotationFromSupplier: QuotationFromSupplier;
		quotationToCustomer: QuotationToCustomer;
		responsible: Responsible;
		sector: Sector;
		shipmentOffered: Date;
		sMIM: string;
		transactionFlow: TransactionFlow;
		typeOpportunity: TypeOpportunity;
		user: User;
	}
	export class PurchaseOrderDetail extends TCRMEntity {
		dateAdded: Date;
		extended: number;
		id: number;
		idProduct: number;
		idPurchaseOrder: number;
		itemDescription: string;
		itemPrice: number;
		itemQuantity: number;
		product: Product;
		purchaseOrder: PurchaseOrder;
		purchaseOrderDetailSumaries: PurchaseOrderDetailSumary[];
		salePrice: number;
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
		quantity: number;
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
	export class QuotationFromSupplier extends TCRMEntity {
		asImporter: boolean;
		country: Country;
		creditDays: number;
		currency: Currency;
		dateCreated: Date;
		dateReceived: Date;
		deliveryLocation: string;
		docType: DocType;
		estatusOpportunity: EstatusOpportunity;
		id: number;
		idCountryOrigin: number;
		idCurrency: number;
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
		extended: number;
		id: number;
		idProduct: number;
		idQuotationFromSupplier: number;
		itemDescription: string;
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

	export class QuotationToCustomer extends TCRMEntity {
		asImporter: boolean;
		country: Country;
		creditDays: number;
		currency: Currency;
		dateCreated: Date;
		dateSend: Date;
		deliveryLocation: string;
		docType: DocType;
		estatusOpportunity: EstatusOpportunity;
		id: number;
		idCountry: number;
		idCurrency: number;
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
		idProduct: number;
		idQuotationToCustomer: number;
		itemDescription: string;
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
		customers: Customer[];
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
		customers: Customer[];
		description: string;
		id: number;
		name: string;
		opportunities: Opportunity[];
		purchaseOrders: PurchaseOrder[];
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
		userName: string;
		userPassword: string;
	}


