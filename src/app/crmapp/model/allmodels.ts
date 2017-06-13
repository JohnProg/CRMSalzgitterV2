﻿    export interface IComplex { }

	export class BaseEntity implements IComplex {
		AccessToken: string;
		AuthenticationToken: string;
		CLASS_NAME: string;
		ClientID: string;
		CREATED_BY: string;
		CREATED_ON: Date;
		Description: string;
		EmailType: string;
		Id: number;
		MACHINE_NAME: string;
		Name: string;
		NameDescription: string;
		RecordStatus: number;
		RedirectURL: string;
		Selected: boolean;
		WLJsPath: string;
		IsActive: boolean;
	}
	export class TCRMEntity extends BaseEntity {
	}

	export class EditorDetailSumary extends TCRMEntity {
		Amount: number;
		Comment: string;
		DateCreated: Date;
		Id: number;
		IdDetail: number;
		Price: number;
		Quantity: number;
	}

	export class EditorDetailSumaryProperty extends TCRMEntity {
		IsRequired: boolean;
		Id: number;
		IdProperty: number;
		Property: Property;
		PropertyValue: string;
		IdParent: number;
	}

	export class BaseOrderDialog extends TCRMEntity {
		ActionOpportunity: ActionOpportunity;
		Contact: Contact;
		CustomerContact: CustomerContact;
		DateDialog: Date;
		DateSend: Date;
		DNotes: string;
		EmailSended: boolean;
		Id: number;
		IdAction: number;
		IdContact: number;
		IdCustomerContact: number;
		IdPurchaseOrder: number;
		IdResponsible: number;
		PurchaseOrder: PurchaseOrder;
		PurchaseOrderDocuments: PurchaseOrderDocument[];
		Responsible: Responsible;
		Subject: string;
		ToContact: number;
	}

	export class BaseDocument extends TCRMEntity {
		AData: number[];
		AData64: string;
		DateUploaded: Date;
		DNotes: string;
		DocId: string;
		DocName: string;
		DocumentType: DocumentType;
		Id: number;
		IdDocumentType: number;
		IdParent: number;
		ParentFolder: string;
	}


	export class ActionOpportunity extends TCRMEntity {
		ActionOpportunityDocTypes: ActionOpportunityDocType[];
		EMailTo: number;
		EstatusOpportunity: EstatusOpportunity;
		Id: number;
		IdStatus: number;
		Name: string;
		OpportunityDialogs: OpportunityDialog[];
		PurchaseOrderDialogs: PurchaseOrderDialog[];
		QuotationFromSupplierDialogs: QuotationFromSupplierDialog[];
		QuotationToCustomerDialogs: QuotationToCustomerDialog[];
		ShowActionType: number;
	}
	export class ActionOpportunityDocType extends TCRMEntity {
		ActionOpportunity: ActionOpportunity;
		DocType: DocType;
		Id: number;
		IdActionOpportunity: number;
		IdDocType: number;
		IdTemplateEmail: number;
		TemplateEMail: TemplateEMail;
	}
	export class AttachDocument extends TCRMEntity {
		DateUploaded: Date;
		DNotes: string;
		DocId: string;
		DocName: string;
		DocType: number;
		DocTypeDescription: string;
		DocTypeName: string;
		DocumentType: DocumentType;
		Id: number;
		IdDocumentType: number;
		IdParent: number;
		ParentFolder: string;
	}
	export class Bank extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
	}
	export class BreakStringIntoRows_Result extends TCRMEntity implements IComplex {
		Column1: string;
	}
	export class Broker extends TCRMEntity {
		AgentNumber: string;
		Colony: Colony;
		ContactName: string;
		Customers: Customer[];
		EMail: string;
		Id: number;
		IdColony: number;
		Name: string;
		Number: string;
		PhoneUSA: string;
		RFC: string;
		Street: string;
	}
	export class Category extends TCRMEntity {
		CategoryID: number;
		CategoryLogs: CategoryLog[];
		CategoryName: string;
	}
	export class CategoryLog extends TCRMEntity {
		Category: Category;
		CategoryID: number;
		CategoryLogID: number;
		Log: Log;
		LogID: number;
	}
	export class City extends TCRMEntity {
		Colonies: Colony[];
		Description: string;
		Id: number;
		IdState: number;
		Name: string;
		State: State;
	}
	export class CollectionDataType extends TCRMEntity {
		ApplyTax: boolean;
		AsImporter: boolean;
		CType: number;
		Description: string;
		Factor: number;
		Id: number;
		Name: string;
	}
	export class CollectionImporterRelation extends TCRMEntity {
		AsImporter: boolean;
		CType: number;
		Id: number;
		IdCollectionDataType: number;
	}
	export class Colony extends TCRMEntity {
		Brokers: Broker[];
		City: City;
		ColonyType: ColonyType;
		Companies: Company[];
		CustomerDeliveryPoints: CustomerDeliveryPoint[];
		Customers: Customer[];
		Description: string;
		Id: number;
		IdCity: number;
		IdColonyType: number;
		Name: string;
		RailSpurs: RailSpur[];
		ZipCode: string;
	}
	export class ColonyType extends TCRMEntity {
		Colonies: Colony[];
		Description: string;
		Id: number;
		Name: string;
	}
	export class Company extends TCRMEntity {
		Colony: Colony;
		CompanyName: string;
		CompanyTargets: CompanyTarget[];
		Fax: string;
		Id: number;
		IdColony: number;
		LegalResponsible: string;
		Logo: number[];
		Number: string;
		Phone: string;
		Street: string;
		TaxAmount: number;
		zipCode: string;
	}
	export class CompanyTarget extends TCRMEntity {
		Company: Company;
		Family: Family;
		Id: number;
		IdCompany: number;
		IdFamily: number;
		Target: number;
		TargetYear: number;
	}
	export class Contact extends TCRMEntity {
		CellPhone: string;
		Department: Department;
		EMail: string;
		Id: number;
		IdDepartment: number;
		IdOrganization: number;
		IsActive: boolean;
		Name: string;
		OfficePhone: string;
		Opportunities: Opportunity[];
		OpportunityDialogs: OpportunityDialog[];
		Organization: Organization;
		PurchaseOrderDialogs: PurchaseOrderDialog[];
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSupplierDialogs: QuotationFromSupplierDialog[];
		QuotationToCustomerDialogs: QuotationToCustomerDialog[];
	}
	export class Country extends TCRMEntity {
		Description: string;
		Id: number;
		Mills: Mill[];
		Name: string;
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSuppliers: QuotationFromSupplier[];
		QuotationToCustomers: QuotationToCustomer[];
		States: State[];
		Suppliers: Supplier[];
	}
	export class Currency extends TCRMEntity {
		ASign: string;
		Description: string;
		ExchangeRates: ExchangeRate[];
		Id: number;
		Name: string;
		Opportunities: Opportunity[];
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSuppliers: QuotationFromSupplier[];
		QuotationToCustomers: QuotationToCustomer[];
	}
	export class Customer extends TCRMEntity {
		Brokers: Broker[];
		Colony: Colony;
		CustomerContacts: CustomerContact[];
		CustomerDeliveryPoints: CustomerDeliveryPoint[];
		CustomerDocuments: CustomerDocument[];
		DaysCredit: number;
		Id: number;
		IdColony: number;
		IdResponsible: number;
		InterestRate: number;
		LimitCreditGermany: number;
		LimitCreditUSA: number;
		Markets: Market[];
		Name: string;
		Number: string;
		Opportunities: Opportunity[];
		Phone: string;
		ProductExtendeds: ProductExtended[];
		Products: Product[];
		PurchaseOrders: PurchaseOrder[];
		RailSpurs: RailSpur[];
		Responsible: Responsible;
		RFC: string;
		Sectors: Sector[];
		Street: string;
	}
	export class CustomerContact extends TCRMEntity {
		CellPhone: string;
		Customer: Customer;
		email: string;
		Extension: string;
		FechaNacimiento: Date;
		Id: number;
		IdCustomer: number;
		IdPosition: number;
		IsActive: boolean;
		Name: string;
		NickName: string;
		OfficePhone: string;
		Opportunities: Opportunity[];
		OpportunityDialogs: OpportunityDialog[];
		Position: Position;
		PurchaseOrderDialogs: PurchaseOrderDialog[];
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSupplierDialogs: QuotationFromSupplierDialog[];
		QuotationToCustomerDialogs: QuotationToCustomerDialog[];
	}
	export class CustomerDeliveryPoint extends TCRMEntity {
		CDPContact: string;
		CDPCP: string;
		CDPName: string;
		CDPStreet: string;
		CDPTelephone: string;
		Colony: Colony;
		Customer: Customer;
		DeliveryType: DeliveryType;
		Id: number;
		IdColony: number;
		IdCustomer: number;
		IdDeliveryType: number;
	}
	export class CustomerDocument extends TCRMEntity {
		Comment: string;
		Customer: Customer;
		DateUploaded: Date;
		DocId: string;
		DocName: string;
		Id: number;
		IdCustomer: number;
		ParentFolder: string;
	}
	export class DeliveryType extends TCRMEntity {
		CustomerDeliveryPoints: CustomerDeliveryPoint[];
		Description: string;
		Id: number;
		Name: string;
	}
	export class Department extends TCRMEntity {
		Contacts: Contact[];
		Description: string;
		Id: number;
		Name: string;
	}
	export class DocType extends TCRMEntity {
		ActionOpportunityDocTypes: ActionOpportunityDocType[];
		Description: string;
		Id: number;
		Name: string;
		Opportunities: Opportunity[];
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSuppliers: QuotationFromSupplier[];
		QuotationToCustomers: QuotationToCustomer[];
	}
	export class DocumentType extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
		OpportunityDocuments: OpportunityDocument[];
		PurchaseOrderDocuments: PurchaseOrderDocument[];
		QuotationFromSupplierDocuments: QuotationFromSupplierDocument[];
		QuotationToCustomerDocuments: QuotationToCustomerDocument[];
		TemplateEMails: TemplateEMail[];
	}
	export class EMailTemplate extends TCRMEntity {
		CustContactMail: string;
		CustContactSent: string;
		DateSent: Date;
		EmailAttachments: AttachDocument[];
		EMailBCC: GenericList[];
		EMailBody: string;
		EMailCC: GenericList[];
		EMailSubject: string;
		EMailTo: GenericList[];
		IdCustomer: number;
		IdDialog: number;
		IdOpportunity: number;
		IdQuotationFromSupplier: number;
		IdQuotationToCustomer: number;
		IdResponsible: number;
		IsSent: boolean;
		ListIdDocuments: number[];
		OneDriveDocs: string[];
		OneDriveDocsName: string[];
	}
	export class EstatusOpportunity extends TCRMEntity {
		ActionOpportunities: ActionOpportunity[];
		Description: string;
		Id: number;
		IsEditable: boolean;
		Name: string;
		Opportunities: Opportunity[];
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSuppliers: QuotationFromSupplier[];
		QuotationToCustomers: QuotationToCustomer[];
	}
	export class ExchangeRate extends TCRMEntity {
		Currency: Currency;
		Id: number;
		IdCurrency: number;
		TDate: Date;
		Value: number;
	}
	export class Family extends TCRMEntity {
		CompanyTargets: CompanyTarget[];
		Description: string;
		Id: number;
		Name: string;
		Products: Product[];
		ResponsibleTargets: ResponsibleTarget[];
	}
	export class GenericList extends TCRMEntity {
		Descripcion: string;
		IdString: string;
		Name: string;
	}
	export class GetActionDoctType_Result  extends TCRMEntity {
		DocTypeName: string;
		EMailSubject: string;
		Id: number;
		IdActionOpportunity: number;
		IdDocType: number;
		IdTemplateEmail: number;
		Name: string;
	}
	export class getAllContactsWithCustomers_Result  extends TCRMEntity {
		ATipo: string;
		EMail: string;
		Id: number;
		IsActive: boolean;
		Name: string;
	}
	export class getCitites_Result extends TCRMEntity {
		CountryName: string;
		Description: string;
		FullName: string;
		Id: number;
		IdCountry: number;
		IdState: number;
		Name: string;
		StateName: string;
	}
	export class getColonies_Result extends TCRMEntity {
		CityName: string;
		CountryName: string;
		CTypeName: string;
		Description: string;
		Id: number;
		IdCity: number;
		IdColonyType: number;
		IdCountry: number;
		IdState: number;
		Name: string;
		StateName: string;
		ZipCode: string;
	}
	export class GetColoniesFromZipCode_Result extends TCRMEntity {
		Description: string;
		Id: number;
		IdCity: number;
		IdColonyType: number;
		Name: string;
		ZipCode: string;
	}
	export class GetCompanyInfo_Result extends TCRMEntity {
		Address1: string;
		Address2: string;
		CityDescription: string;
		CityName: string;
		ColonyDescription: string;
		ColonyName: string;
		ColonyType: string;
		CompanyName: string;
		CountryDescription: string;
		CountryName: string;
		Fax: string;
		Id: number;
		IdCity: number;
		IdColony: number;
		IdColonyType: number;
		IdCountry: number;
		IdState: number;
		LegalResponsible: string;
		Logo: number[];
		Number: string;
		Phone: string;
		StateDescription: string;
		StateName: string;
		Street: string;
		ZipCode: string;
	}
	export class getCountries_Result extends TCRMEntity {
		Description: string;
		FullName: string;
		Id: number;
		Name: string;
	}
	export class getCountriesFromIdMill_Result extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
	}
	export class getCustomerContactList_Result extends TCRMEntity {
		email: string;
		Id: number;
		IdCustomer: number;
		Name: string;
		NickName: string;
	}
	export class GetCustomerDirectory_Result extends TCRMEntity {
		Address: string;
		City: string;
		id: number;
		LimitCreditGermany: number;
		LimitCreditUSA: number;
		Market: string;
		Name: string;
		Responsible: string;
		Sector: string;
	}
	export class GetCustomerProducts_Result extends TCRMEntity {
		CustomerName: string;
		FamilyName: string;
		IdCustomer: number;
		IdFamily: number;
		IdProduct: number;
		ProductName: string;
	}
	export class getCustomers_Result extends TCRMEntity {
		ColonyName: string;
		DaysCredit: number;
		Id: number;
		IdColony: number;
		IdResponsible: number;
		InterestRate: number;
		LimitCreditGermany: number;
		LimitCreditUSA: number;
		Name: string;
		Number: string;
		Phone: string;
		ResponsibleName: string;
		RFC: string;
		Street: string;
	}
	export class GetFieldForPurchaseOrder_Result extends TCRMEntity {
		AsImporter: boolean;
		DeliveryLocation: string;
		IdContact: number;
		IdCountryOrigin: number;
		IdCurrency: number;
		IdCustomer: number;
		IdCustomerContact: number;
		IdDocType: number;
		IdIncoTerm: number;
		IdLinerTerm: number;
		IdMarket: number;
		IdMill: number;
		IdOpportunity: number;
		IdPort: number;
		IdQuotationFromSupplier: number;
		IdQuotationToCustomer: number;
		IdResponsible: number;
		IdSector: number;
		IdStatus: number;
		IdTransactionFlow: number;
		IdTypeOpp: number;
		IdUser: number;
		OfferValidity: Date;
		OppNotes: string;
		ShipmentOffered: Date;
	}
	export class getListIntFomXML_Result extends TCRMEntity {
		id: number;
	}
	export class GetOppDetailsIndex_Result extends TCRMEntity {
		DateAdded: Date;
		FamilyDescription: string;
		Id: number;
		IdFamily: number;
		IdOpportunity: number;
		IdProduct: number;
		ItemDescription: string;
		ItemExtended: number;
		ItemPrice: number;
		ItemQuantity: number;
		ProductDescription: string;
	}
	export class GetOppDialogDocumentIndex_Result extends TCRMEntity {
		DateUploaded: Date;
		DNotes: string;
		DocName: string;
		DocTypeName: string;
		Id: number;
		IdDocumentType: number;
	}
	export class GetOppDialogIndex_Result extends TCRMEntity {
		ActionName: string;
		ContactName: string;
		CustContactName: string;
		DateDialog: Date;
		Id: number;
		IdOpportunity: number;
		ResponsibleName: string;
		ToContact: number;
	}
	export class GetOpportunities extends TCRMEntity {
		AsImporter: boolean;
		CustomerName: string;
		DateCreated: Date;
		DaysUpdate: number;
		Id: number;
		IdCustomer: number;
		IdStatus: number;
		IdUser: number;
		IsActive: boolean;
		LastUpdated: Date;
		PastDue: number;
		ResponsibleName: string;
		StatusName: string;
		UserName: string;
	}
	export class GetOpportunityDetails_Result extends TCRMEntity {
		DateAdded: Date;
		Id: number;
		IdOpportunity: number;
		IdProduct: number;
		ItemDescription: string;
		itemExtended: number;
		ItemPrice: number;
		ItemQuantity: number;
		ProductDescription: string;
		ProductName: string;
	}
	export class getProductProperties_Result extends TCRMEntity {
		Description: string;
		Id: number;
		IdProperty: number;
		IsRequired: boolean;
		Name: string;
		POrder: number;
	}
	export class getProducts_Result extends TCRMEntity {
		Description: string;
		FamilyDescription: string;
		FamilyName: string;
		Id: number;
		IdFamily: number;
		Name: string;
	}
	export class GetProductsPaged extends TCRMEntity {
		Description: string;
		FamilyDescription: string;
		FamilyName: string;
		Id: number;
		IdFamily: number;
		Name: string;
	}
	export class getProductsPaged_Result extends TCRMEntity {
		Description: string;
		FamilyDescription: string;
		FamilyName: string;
		Id: number;
		IdFamily: number;
		Name: string;
	}
	export class GetPurchaseOrder_Result extends TCRMEntity {
		ASign: string;
		CurrencyName: string;
		CustomerName: string;
		DocTypeName: string;
		Id: number;
		IdCurrency: number;
		IdDocType: number;
		IdMill: number;
		IdQuotationToCustomer: number;
		IdStatus: number;
		IsEditable: boolean;
		MillName: string;
		SMIM: string;
		SstatusName: string;
	}
	export class GetPurchaseOrderDetails_Result extends TCRMEntity {
		Id: number;
		IdProduct: number;
		IdPurchaseOrder: number;
		ItemDescription: string;
		ItemPrice: number;
		ItemQuantity: number;
		ProductDescription: string;
		ProductName: string;
		SalePrice: number;
	}
	export class GetPurchaseOrderDialogDocumentIndex_Result extends TCRMEntity {
		DateUploaded: Date;
		DNotes: string;
		DocName: string;
		DocTypeName: string;
		Id: number;
		IdDocumentType: number;
	}
	export class GetPurchaseOrderDialogIndex_Result extends TCRMEntity {
		ActionName: string;
		ContactName: string;
		CustContactName: string;
		DateDialog: Date;
		Id: number;
		IdPurchaseOrder: number;
		ResponsibleName: string;
		ToContact: number;
	}
	export class getQuotationFromSupplier_Result extends TCRMEntity {
		ASign: string;
		AsImporter: boolean;
		CurrencyName: string;
		CustomerName: string;
		DateReceived: Date;
		DocTypeName: string;
		Id: number;
		IdCurrency: number;
		IdDocType: number;
		IdMill: number;
		IdOpportunity: number;
		IdPort: number;
		IdStatus: number;
		IsEditable: boolean;
		MillName: string;
		PortName: string;
		SstatusName: string;
	}	
    export class GetQuotationFromSupplierDetails_Result extends TCRMEntity {
		Extended: number;
		Id: number;
		IdProduct: number;
		IdQuotationFromSupplier: number;
		ItemDescription: string;
		ItemPrice: number;
		ItemQuantity: number;
		ProductDescription: string;
		ProductName: string;
		SalePrice: number;
	}
	export class GetQuotationFromSupplierDialogDocumentIndex_Result extends TCRMEntity {
		DateUploaded: Date;
		DNotes: string;
		DocName: string;
		DocTypeName: string;
		Id: number;
		IdDocumentType: number;
	}
	export class GetQuotationFromSupplierDialogIndex_Result extends TCRMEntity {
		ActionName: string;
		ContactName: string;
		CustContactName: string;
		DateDialog: Date;
		Id: number;
		IdQuotationFromSupplier: number;
		ResponsibleName: string;
		ToContact: number;
	}
	export class GetQuotationToCustomer_Result extends TCRMEntity {
		ASign: string;
		CurrencyName: string;
		CustomerName: string;
		DocTypeName: string;
		Id: number;
		IdCurrency: number;
		IdDocType: number;
		IdMill: number;
		IdQuotationFromSupplier: number;
		IdStatus: number;
		IsEditable: boolean;
		MillName: string;
		SstatusName: string;
	}
	export class GetQuotationToCustomerDetails_Result extends TCRMEntity {
		Id: number;
		IdProduct: number;
		IdQuotationToCustomer: number;
		ItemDescription: string;
		ItemPrice: number;
		ItemQuantity: number;
		ProductDescription: string;
		ProductName: string;
		SalePrice: number;
	}
	export class GetQuotationToCustomerDialogDocumentIndex_Result extends TCRMEntity {
		DateUploaded: Date;
		DNotes: string;
		DocName: string;
		DocTypeName: string;
		Id: number;
		IdDocumentType: number;
	}
	export class GetQuotationToCustomerDialogIndex_Result extends TCRMEntity {
		ActionName: string;
		ContactName: string;
		CustContactName: string;
		DateDialog: Date;
		Id: number;
		IdQuotationToCustomer: number;
		ResponsibleName: string;
		ToContact: number;
	}
	export class getResponsible_Result extends TCRMEntity {
		CellPhone: string;
		EMail: string;
		Id: number;
		IdPosition: number;
		IsActive: boolean;
		Name: string;
		OfficePhone: string;
		PositionDescription: string;
	}
	export class getState_Result extends TCRMEntity {
		CountryName: string;
		Description: string;
		FullName: string;
		Id: number;
		IdCountry: number;
		Name: string;
	}
	export class getUsers_Result extends TCRMEntity {
		FirstName: string;
		Id: number;
		IsActive: boolean;
		LastName: string;
		UserName: string;
		userPassword: string;
		userPassword1: string;
	}
	export class IncoTerm extends TCRMEntity {
		DeliveryRequired: boolean;
		Description: string;
		Id: number;
		Name: string;
		Opportunities: Opportunity[];
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSuppliers: QuotationFromSupplier[];
		QuotationToCustomers: QuotationToCustomer[];
	}
	export class LinerTerm extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
		Opportunities: Opportunity[];
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSuppliers: QuotationFromSupplier[];
		QuotationToCustomers: QuotationToCustomer[];
	}
	export class Log extends TCRMEntity {
		AppDomainName: string;
		CategoryLogs: CategoryLog[];
		EventId: number;
		FormattedMessage: string;
		LogId: number;
		MachineName: string;
		Message: string;
		Priority: number;
		ProcessID: string;
		ProcessName: string;
		Severity: string;
		ThreadName: string;
		Timestamp: Date;
		Title: string;
		Win32ThreadId: string;
	}
	export class Market extends TCRMEntity {
		Customers: Customer[];
		Description: string;
		Id: number;
		Name: string;
		Opportunities: Opportunity[];
		PurchaseOrders: PurchaseOrder[];
	}
	export class MessageTemplate extends TCRMEntity {
		Id: number;
		MessageBody: string;
		MessageSubject: string;
	}
	export class Mill extends TCRMEntity {
		Countries: Country[];
		Description: string;
		Id: number;
		Name: string;
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSuppliers: QuotationFromSupplier[];
		QuotationToCustomers: QuotationToCustomer[];
	}
	export class OEM extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
		ProductExtendeds: ProductExtended[];
	}
	export class Opportunity extends TCRMEntity {
		AsImporter: boolean;
		Comments: string;
		Contact: Contact;
		Currency: Currency;
		Customer: Customer;
		CustomerContact: CustomerContact;
		DateCreated: Date;
		DeliveryLocation: string;
		DocType: DocType;
		EstatusOpportunity: EstatusOpportunity;
		Id: number;
		IdContact: number;
		IdCurrency: number;
		IdCustomer: number;
		IdCustomerContact: number;
		IdDocType: number;
		IdIncoTerm: number;
		IdLinerTerms: number;
		IdMarket: number;
		IdPort: number;
		IdResponsible: number;
		IdSector: number;
		IdStatus: number;
		IdTransactionFlow: number;
		IdTypeOpp: number;
		IdUser: number;
		IncoTerm: IncoTerm;
		IsActive: boolean;
		LastUpdated: Date;
		LinerTerm: LinerTerm;
		Market: Market;
		OppNotes: string;
		OpportunityDetails: OpportunityDetail[];
		OpportunityDialogs: OpportunityDialog[];
		Port: Port;
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSuppliers: QuotationFromSupplier[];
		Responsible: Responsible;
		Sector: Sector;
		TransactionFlow: TransactionFlow;
		TypeOpportunity: TypeOpportunity;
		User: User;
	}
	export class OpportunityDetail extends TCRMEntity {
		DateAdded: Date;
		Id: number;
		IdOpportunity: number;
		IdProduct: number;
		ItemDescription: string;
		ItemExtended: number;
		ItemPrice: number;
		ItemQuantity: number;
		Opportunity: Opportunity;
		OpportunityDetailSumaries: OpportunityDetailSumary[];
		Product: Product;
	}
	export class OpportunityDetailSumary extends EditorDetailSumary {
		IdOpportunityDetail: number;
		OpportunityDetailSumaryProperties: OpportunityDetailSumaryProperty[];
	}
	export class OpportunityDetailSumaryProperty extends EditorDetailSumaryProperty {
		IdOpportunityDetailSumary: number;
	}
	export class OpportunityDialog extends BaseOrderDialog {
		IdOpportunity: number;
	}
	export class OpportunityDocument extends BaseDocument {
		AData: number[];
		AData64: string;
		DateUploaded: Date;
		DNotes: string;
		DocId: string;
		DocName: string;
		DocumentType: DocumentType;
		Id: number;
		IdDocumentType: number;
		IdOpportunityDialog: number;
		OpportunityDialog: OpportunityDialog;
		ParentFolder: string;
	}
	export class Organization extends TCRMEntity {
		Contacts: Contact[];
		Description: string;
		Id: number;
		Name: string;
	}
	export class PaymentTerm extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
	}
	export class Port extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
		Opportunities: Opportunity[];
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSuppliers: QuotationFromSupplier[];
		QuotationToCustomers: QuotationToCustomer[];
	}
	export class Position extends TCRMEntity {
		CustomerContacts: CustomerContact[];
		Description: string;
		Id: number;
		Name: string;
		Responsibles: Responsible[];
	}
	export class Product extends TCRMEntity {
		CampaignTemplate: string;
		CampaignTemplateSubject: string;
		Customers: Customer[];
		Description: string;
		Family: Family;
		Id: number;
		IdFamily: number;
		Name: string;
		OpportunityDetails: OpportunityDetail[];
		ProductExtendeds: ProductExtended[];
		ProductProperties: ProductProperty[];
		PurchaseOrderDetails: PurchaseOrderDetail[];
		QuotationFromSupplierDetails: QuotationFromSupplierDetail[];
		QuotationToCustomerDetails: QuotationToCustomerDetail[];
		Suppliers: Supplier[];
	}
	export class ProductExtended extends TCRMEntity {
		BuyerName: string;
		Customer: Customer;
		CustomerName: string;
		EAU: number;
		Id: number;
		IdCustomer: number;
		IdOEM: number;
		IdProduct: number;
		OEM: OEM;
		PartNumberBuyer: string;
		PartNumberOEM: string;
		Platform: string;
		ProdDescription: string;
		Product: Product;
		ProductExtendedPrices: ProductExtendedPrice[];
		Spec: number;
		Thickness: number;
		Width: number;
	}
	export class ProductExtendedPrice extends TCRMEntity {
		Id: number;
		IdProductExtended: number;
		Price: number;
		ProductExtended: ProductExtended;
		ValidFrom: Date;
		ValidTo: Date;
	}
	export class ProductProperty extends TCRMEntity {
		Id: number;
		IdProduct: number;
		IdProperty: number;
		IsRequired: boolean;
		POrder: number;
		Product: Product;
		Property: Property;
	}
	export class Property extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
		OpportunityDetailSumaryProperties: OpportunityDetailSumaryProperty[];
		ProductProperties: ProductProperty[];
		QuotationFromSupplierDetailSumaryProperties: QuotationFromSupplierDetailSumaryProperty[];
		QuotationToCustomerDetailSumaryProperties: QuotationToCustomerDetailSumaryProperty[];
	}
	export class PurchaseOrder extends TCRMEntity {
		AsImporter: boolean;
		BookingDate: Date;
		Contact: Contact;
		Country: Country;
		Currency: Currency;
		Customer: Customer;
		CustomerContact: CustomerContact;
		DateCreated: Date;
		DeliveryLocation: string;
		DocType: DocType;
		EstatusOpportunity: EstatusOpportunity;
		Id: number;
		IdContact: number;
		IdCountryOrigin: number;
		IdCurrency: number;
		IdCustomer: number;
		IdCustomerContact: number;
		IdDocType: number;
		IdIncoTerm: number;
		IdLinerTerm: number;
		IdMarket: number;
		IdMill: number;
		IdOpportunity: number;
		IdPort: number;
		IdQuotationFromSupplier: number;
		IdQuotationToCustomer: number;
		IdResponsible: number;
		IdSector: number;
		IdStatus: number;
		IdTransactionFlow: number;
		IdTypeOpp: number;
		IdUser: number;
		IncoTerm: IncoTerm;
		IsActive: boolean;
		LastUpdated: Date;
		LinerTerm: LinerTerm;
		Market: Market;
		Mill: Mill;
		OfferValidity: Date;
		OppNotes: string;
		Opportunity: Opportunity;
		Port: Port;
		PurchaseOrderDetails: PurchaseOrderDetail[];
		PurchaseOrderDialogs: PurchaseOrderDialog[];
		QuotationFromSupplier: QuotationFromSupplier;
		QuotationToCustomer: QuotationToCustomer;
		Responsible: Responsible;
		Sector: Sector;
		ShipmentOffered: Date;
		SMIM: string;
		TransactionFlow: TransactionFlow;
		TypeOpportunity: TypeOpportunity;
		User: User;
		PONumber: string;
	    Comments: string;
	}
	export class PurchaseOrderDetail extends TCRMEntity {
		DateAdded: Date;
		
		Id: number;
		IdProduct: number;
		IdPurchaseOrder: number;
		ItemDescription: string;
		ItemPrice: number;
		Product: Product;
		PurchaseOrder: PurchaseOrder;
		PurchaseOrderDetailSumaries: PurchaseOrderDetailSumary[];

		private _itemQuantity: number;
		private _salePrice: number;
		private _extended: number;
		get ItemQuantity(): number {
			return this._itemQuantity;
		}

		set ItemQuantity(value: number) {
			this._itemQuantity = value;
			this.setExtended();
		}

		get SalePrice(): number {
			return this._salePrice;
		}
		set SalePrice(value: number) {
			this._salePrice = value;
            this.setExtended();
		}

		get Extended(): number {
			return this._extended;
		}
		set Extended(value: number) {
			debugger
			this._extended = value;
		}

		setExtended() {
			debugger
			if( this._itemQuantity !== undefined && this._salePrice !== undefined) {
				this.Extended = this._itemQuantity * this._salePrice;
			}
		}
	}
	export class PurchaseOrderDetailSumary extends EditorDetailSumary {
		Amount: number;
		Comment: string;
		DateCreated: Date;
		Id: number;
		IdPurchaseOrderDetail: number;
		Price: number;
		PurchaseOrderDetail: PurchaseOrderDetail;
		PurchaseOrderDetailSumaryProperties: PurchaseOrderDetailSumaryProperty[];
		Quantity: number;
	}
	export class PurchaseOrderDetailSumaryProperty extends EditorDetailSumaryProperty {
		IdPurchaseOrderDetailSumary: number;
		PurchaseOrderDetailSumary: PurchaseOrderDetailSumary;
	}
	export class PurchaseOrderDialog extends BaseOrderDialog {
		IdPurchaseOrder: number;
		PurchaseOrder: PurchaseOrder;
		PurchaseOrderDocuments: PurchaseOrderDocument[];
	}
	export class PurchaseOrderDocument extends BaseDocument {
		IdPurchaseOrderDialog: number;
	}
	export class QuotationFromSupplier extends TCRMEntity {
		AsImporter: boolean;
		Country: Country;
		Currency: Currency;
		DateCreated: Date;
		DateReceived: Date;
		DeliveryLocation: string;
		DocType: DocType;
		EstatusOpportunity: EstatusOpportunity;
		Id: number;
		IdCountryOrigin: number;
		IdCurrency: number;
		IdDocType: number;
		IdIncoTerm: number;
		IdLinerTerm: number;
		IdMill: number;
		IdOpportunity: number;
		IdPort: number;
		IdStatus: number;
		IdTransactionFlow: number;
		IdTypeOpp: number;
		IdUser: number;
		IncoTerm: IncoTerm;
		LinerTerm: LinerTerm;
		Mill: Mill;
		OfferValidity: Date;
		Opportunity: Opportunity;
		Port: Port;
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSupplierDetails: QuotationFromSupplierDetail[];
		QuotationFromSupplierDialogs: QuotationFromSupplierDialog[];
		QuotationToCustomers: QuotationToCustomer[];
		QuoteNotes: string;
		ShipmentOffered: Date;
		TransactionFlow: TransactionFlow;
		TypeOpportunity: TypeOpportunity;
		User: User;
	}
	export class QuotationFromSupplierDetail extends TCRMEntity {
		DateAdded: Date;
		Extended: number;
		Id: number;
		IdProduct: number;
		IdQuotationFromSupplier: number;
		ItemDescription: string;
		ItemPrice: number;
		ItemQuantity: number;
		Product: Product;
		QuotationFromSupplier: QuotationFromSupplier;
		QuotationFromSupplierDetailSumaries: QuotationFromSupplierDetailSumary[];
		SalePrice: number;
	}
	export class QuotationFromSupplierDetailSumary extends EditorDetailSumary {
		Amount: number;
		Comment: string;
		DateCreated: Date;
		Id: number;
		IdQuotationFromSupplierDetail: number;
		Price: number;
		Quantity: number;
		QuotationFromSupplierDetail: QuotationFromSupplierDetail;
		QuotationFromSupplierDetailSumaryProperties: QuotationFromSupplierDetailSumaryProperty[];
	}
	export class QuotationFromSupplierDetailSumaryProperty extends EditorDetailSumaryProperty {
		IdQuotationFromSupplierDetailSumary: number;
		QuotationFromSupplierDetailSumary: QuotationFromSupplierDetailSumary;
	}
	export class QuotationFromSupplierDialog extends BaseOrderDialog {
		IdQuotationFromSupplier: number;
	}
	export class QuotationFromSupplierDocument extends BaseDocument {
		IdQuotationFromSupplierDialog: number;
	}

	export class QuotationToCustomer extends TCRMEntity {
		AsImporter: boolean;
		Country: Country;
		Currency: Currency;
		DateCreated: Date;
		DateSend: Date;
		DeliveryLocation: string;
		DocType: DocType;
		EstatusOpportunity: EstatusOpportunity;
		Id: number;
		IdCountry: number;
		IdCurrency: number;
		IdDocType: number;
		IdIncoTerm: number;
		IdLinerTerm: number;
		IdMill: number;
		IdPort: number;
		IdQuotationFromSupplier: number;
		IdStatus: number;
		IdTypeOpp: number;
		IdUser: number;
		IncoTerm: IncoTerm;
		LinerTerm: LinerTerm;
		Mill: Mill;
		OfferValidity: Date;
		Port: Port;
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSupplier: QuotationFromSupplier;
		QuotationToCustomerDetails: QuotationToCustomerDetail[];
		QuoteNotes: string;
		ShipmentOffered: Date;
		TypeOpportunity: TypeOpportunity;
		User: User;
	}
	export class QuotationToCustomerDetail extends TCRMEntity {
		ExpenseSMIM_Cost: number;
		ExpenseSupplierSide_Cost: number;
		Id: number;
		IdProduct: number;
		IdQuotationToCustomer: number;
		ItemDescription: string;
		ItemPrice: number;
		ItemQuantity: number;
		Product: Product;
		Profit: number;
		QuotationToCustomer: QuotationToCustomer;
		QuotationToCustomerDetailSumaries: QuotationToCustomerDetailSumary[];
		SalePrice: number;
		SalesPriceBased: number;
	}
	export class QuotationToCustomerDetailSumary extends EditorDetailSumary {
		Amount: number;
		Comment: string;
		DateCreated: Date;
		Id: number;
		IdQuotationToCustomerDetail: number;
		Price: number;
		Quantity: number;
		QuotationToCustomerDetail: QuotationToCustomerDetail;
		QuotationToCustomerDetailSumaryProperties: QuotationToCustomerDetailSumaryProperty[];
	}
	export class QuotationToCustomerDetailSumaryProperty extends EditorDetailSumaryProperty {
		IdQuotationToCustomerDetailSumary: number;
		QuotationToCustomerDetailSumary: QuotationToCustomerDetailSumary;
	}
	export class QuotationToCustomerDialog extends BaseOrderDialog {
		IdQuotationToCustomer: number;
	}
	export class QuotationToCustomerDocument extends BaseDocument {
		IdQuotationToCustomerDialog: number;
	}
	export class RailSpur extends TCRMEntity {
		CarsPerDay: number;
		Colony: Colony;
		Customers: Customer[];
		Id: number;
		IdColony: number;
		IdRailSpurType: number;
		IdRailway: number;
		Name: string;
		Number: string;
		Phone: string;
		RailSpur1: string;
		RailSpurType: RailSpurType;
		Railway: Railway;
		RFC: string;
		Station: string;
		Street: string;
		Zona: string;
	}
	export class RailSpurType extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
		RailSpurs: RailSpur[];
	}
	export class Railway extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
		RailSpurs: RailSpur[];
	}
	export class Responsible extends TCRMEntity {
		CellPhone: string;
		Customers: Customer[];
		EMail: string;
		Id: number;
		IdPosition: number;
		IdUser: number;
		IsActive: boolean;
		Name: string;
		OfficePhone: string;
		Opportunities: Opportunity[];
		OpportunityDialogs: OpportunityDialog[];
		Position: Position;
		PurchaseOrderDialogs: PurchaseOrderDialog[];
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSupplierDialogs: QuotationFromSupplierDialog[];
		QuotationToCustomerDialogs: QuotationToCustomerDialog[];
		ResponsibleTargets: ResponsibleTarget[];
		RspPassword: string;
		RspUserCredential: string;
		User: User;
	}
	export class ResponsibleTarget extends TCRMEntity {
		Family: Family;
		Id: number;
		IdFamily: number;
		IdResponsible: number;
		Responsible: Responsible;
		ResponsibleTargetYear: number;
		TargetQty: number;
	}
	export class ReturnSaveRequest extends TCRMEntity {
		Data: any;
		Message: string;
	}
	export class Sector extends TCRMEntity {
		Customers: Customer[];
		Description: string;
		Id: number;
		Name: string;
		Opportunities: Opportunity[];
		PurchaseOrders: PurchaseOrder[];
	}
	export class State extends TCRMEntity {
		Cities: City[];
		Country: Country;
		Description: string;
		Id: number;
		IdCountry: number;
		Name: string;
	}
	export class Supplier extends TCRMEntity {
		Country: Country;
		Id: number;
		IdCountry: number;
		IsActive: boolean;
		Name: string;
		Products: Product[];
		ShortName: string;
		SupplierContacts: SupplierContact[];
	}
	export class SupplierContact extends TCRMEntity {
		CellPhone: string;
		Department: string;
		EMail: string;
		Id: number;
		IdSupplier: number;
		IsActive: boolean;
		Name: string;
		OfficePhone: string;
		Supplier: Supplier;
	}
	export class sysdiagram extends TCRMEntity {
		definition: number[];
		diagram_id: number;
		name: string;
		principal_id: number;
		version: number;
	}
	export class TemplateEMail extends TCRMEntity {
		ActionOpportunityDocTypes: ActionOpportunityDocType[];
		DocumentTypes: DocumentType[];
		EMailBody: string;
		EMailSubject: string;
		Id: number;
		Name: string;
	}
	export class Tender extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
	}
	export class TransactionFlow extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
		Opportunities: Opportunity[];
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSuppliers: QuotationFromSupplier[];
	}
	export class TypeOpportunity extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
		Opportunities: Opportunity[];
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSuppliers: QuotationFromSupplier[];
		QuotationToCustomers: QuotationToCustomer[];
	}
	export class User extends TCRMEntity {
		EMail: string;
		Id: number;
		IsActive: boolean;
		IsAdmin: boolean;
		Name: string;
		Opportunities: Opportunity[];
		PurchaseOrders: PurchaseOrder[];
		QuotationFromSuppliers: QuotationFromSupplier[];
		QuotationToCustomers: QuotationToCustomer[];
		Responsibles: Responsible[];
		UserName: string;
		userPassword: string;
	}


