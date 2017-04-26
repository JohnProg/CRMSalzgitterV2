

	export class BaseEntity {
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
	}
	export class TCRMEntity extends BaseEntity {
	}


	export class ActionOpportunity extends TCRMEntity {
		EMailTo: number;
		EstatusOpportunity: EstatusOpportunity;
		Id: number;
		IdStatus: number;
		IdTemplateEMail: number;
		Name: string;
		OpportunityDialogs: OpportunityDialog[];
		ShowActionType: number;
		TemplateEMail: TemplateEMail;
	}
	export class Bank extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
	}
	export class BreakStringIntoRows_Result {
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
		Name: string;
		OfficePhone: string;
		Opportunities: Opportunity[];
		OpportunityDialogs: OpportunityDialog[];
		Organization: Organization;
	}
	export class Country extends TCRMEntity {
		Description: string;
		Id: number;
		Mills: Mill[];
		Name: string;
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
	export class DocumentType extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
		OpportunityDocuments: OpportunityDocument[];
		QuotationFromSupplierDocuments: QuotationFromSupplierDocument[];
		QuotationToCustomerDocuments: QuotationToCustomerDocument[];
		TemplateEMails: TemplateEMail[];
	}
	export class EstatusOpportunity extends TCRMEntity {
		ActionOpportunities: ActionOpportunity[];
		Description: string;
		Id: number;
		IsEditable: boolean;
		Name: string;
		Opportunities: Opportunity[];
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
	export class getAllContactsWithCustomers_Result {
		ATipo: string;
		EMail: string;
		Id: number;
		Name: string;
	}
	export class getCitites_Result {
		CountryName: string;
		Description: string;
		FullName: string;
		Id: number;
		IdCountry: number;
		IdState: number;
		Name: string;
		StateName: string;
	}
	export class getColonies_Result {
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
	export class GetColoniesFromZipCode_Result {
		Description: string;
		Id: number;
		IdCity: number;
		IdColonyType: number;
		Name: string;
		ZipCode: string;
	}
	export class GetCompanyInfo_Result {
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
	export class getCountries_Result {
		Description: string;
		FullName: string;
		Id: number;
		Name: string;
	}
	export class getCountriesFromIdMill_Result {
		Description: string;
		Id: number;
		Name: string;
	}
	export class getCustomerContactList_Result {
		email: string;
		Id: number;
		IdCustomer: number;
		Name: string;
		NickName: string;
	}
	export class GetCustomerDirectory_Result {
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
	export class GetCustomerProducts_Result {
		CustomerName: string;
		FamilyName: string;
		IdCustomer: number;
		IdFamily: number;
		IdProduct: number;
		ProductName: string;
	}
	export class getCustomers_Result {
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
	export class getListIntFomXML_Result {
		id: number;
	}
	export class GetOpportunities {
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
	export class GetOpportunityDetails_Result {
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
	export class getProductProperties_Result {
		Description: string;
		Id: number;
		IdProperty: number;
		IsRequired: boolean;
		Name: string;
		POrder: number;
	}
	export class getProducts_Result {
		Description: string;
		FamilyDescription: string;
		FamilyName: string;
		Id: number;
		IdFamily: number;
		Name: string;
	}
	export class GetProductsPaged {
		Description: string;
		FamilyDescription: string;
		FamilyName: string;
		Id: number;
		IdFamily: number;
		Name: string;
	}
	export class getProductsPaged_Result {
		Description: string;
		FamilyDescription: string;
		FamilyName: string;
		Id: number;
		IdFamily: number;
		Name: string;
	}
	export class getResponsible_Result {
		CellPhone: string;
		EMail: string;
		Id: number;
		IdPosition: number;
		IsActive: boolean;
		Name: string;
		OfficePhone: string;
		PositionDescription: string;
	}
	export class getState_Result {
		CountryName: string;
		Description: string;
		FullName: string;
		Id: number;
		IdCountry: number;
		Name: string;
	}
	export class getUsers_Result {
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
		QuotationFromSuppliers: QuotationFromSupplier[];
		QuotationToCustomers: QuotationToCustomer[];
	}
	export class LinerTerm extends TCRMEntity {
		Description: string;
		Id: number;
		Name: string;
		Opportunities: Opportunity[];
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
		ProjectName: string;
		AsImporter: boolean;
		Contact: Contact;
		Currency: Currency;
		Customer: Customer;
		CustomerContact: CustomerContact;
		DateCreated: Date;
		DeliveryLocation: string;
		EstatusOpportunity: EstatusOpportunity;
		Id: number;
		IdContact: number;
		IdCurrency: number;
		IdCustomer: number;
		IdCustomerContact: number;
		IdIncoTerm: number;
		IdLinerTerms: number;
		IdMarket: number;
		IdPort: number;
		IdResponsible: number;
		IdSector: number;
		IdStatus: number;
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
		QuotationFromSuppliers: QuotationFromSupplier[];
		Responsible: Responsible;
		Sector: Sector;
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
		OpportunityDetailSumays: OpportunityDetailSumary[];
		Product: Product;
	}
	export class OpportunityDetailSumaryProperty extends TCRMEntity {
		Id: number;
		IdOpportunityDetailSumary: number;
		IdProperty: number;
		OpportunityDetailSumary: OpportunityDetailSumary;
		Property: Property;
		PropertyValue: string;
		IsRequired: boolean;
	}
	export class OpportunityDetailSumary extends TCRMEntity {
		Amount: number;
		Comment: string;
		DateCreated: Date;
		Id: number;
		IdOpportunityDetail: number;
		OpportunityDetail: OpportunityDetail;
		OpportunityDetailSumaryProperties: OpportunityDetailSumaryProperty[];
		Price: number;
		Quantity: number;
	}
	export class OpportunityDialog extends TCRMEntity {
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
		IdOpportunity: number;
		IdResponsible: number;
		Opportunity: Opportunity;
		OpportunityDocuments: OpportunityDocument[];
		Responsible: Responsible;
		Subject: string;
		ToContact: number;
	}
	export class OpportunityDocument extends TCRMEntity {
		ADocument: number[];
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
		QuotationFromSuppliers: QuotationFromSupplier[];
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
	export class QuotationFromSupplier extends TCRMEntity {
		Country: Country;
		Currency: Currency;
		DateReceived: Date;
		EstatusOpportunity: EstatusOpportunity;
		Id: number;
		IdCountryOrigin: number;
		IdCurrency: number;
		IdIncoTerm: number;
		IdLinerTerm: number;
		IdMill: number;
		IdOpportunity: number;
		IdPort: number;
		IdStatus: number;
		IdUser: number;
		IncoTerm: IncoTerm;
		LinerTerm: LinerTerm;
		Mill: Mill;
		Opportunity: Opportunity;
		Port: Port;
		QuotationFromSupplierDetails: QuotationFromSupplierDetail[];
		QuotationFromSupplierDocuments: QuotationFromSupplierDocument[];
		QuotationToCustomers: QuotationToCustomer[];
		User: User;
	}
	export class QuotationFromSupplierDetail extends TCRMEntity {
		Id: number;
		IdProduct: number;
		IdQuotationFromSupplier: number;
		Product: Product;
		QCostPrice: number;
		QProductDesc: string;
		QQuantity: number;
		QSalePrice: number;
		QuotationFromSupplier: QuotationFromSupplier;
		QuotationFromSupplierDetailSumaries: QuotationFromSupplierDetailSumary[];
	}
	export class QuotationFromSupplierDetailSumary extends TCRMEntity {
		Amount: number;
		Comment: string;
		DateCreated: Date;
		Id: number;
		IdQuotationFromSupplierDetail: number;
		Price: number;
		QSQuantity: number;
		QuotationFromSupplierDetail: QuotationFromSupplierDetail;
		QuotationFromSupplierDetailSumaryProperties: QuotationFromSupplierDetailSumaryProperty[];
	}
	export class QuotationFromSupplierDetailSumaryProperty extends TCRMEntity {
		Id: number;
		IdProperty: number;
		IdQuotationFromSupplierDetailSumary: number;
		Property: Property;
		PropertyValue: string;
		QuotationFromSupplierDetailSumary: QuotationFromSupplierDetailSumary;
	}
	export class QuotationFromSupplierDocument extends TCRMEntity {
		DateUploaded: Date;
		DocId: string;
		DocName: string;
		DocumentType: DocumentType;
		Id: number;
		IdDocumentType: number;
		IdQuotationFromSupplier: number;
		ParentFolder: string;
		QDocNotes: string;
		QuotationFromSupplier: QuotationFromSupplier;
	}
	export class QuotationToCustomer extends TCRMEntity {
		Country: Country;
		Currency: Currency;
		DateCreated: Date;
		DateSend: Date;
		EstatusOpportunity: EstatusOpportunity;
		Id: number;
		IdCountry: number;
		IdCurrency: number;
		IdIncoTerm: number;
		IdLinerTerm: number;
		IdMill: number;
		IdQuotationFromSupplier: number;
		IdStatus: number;
		IdUser: number;
		IncoTerm: IncoTerm;
		LinerTerm: LinerTerm;
		Mill: Mill;
		QuotationFromSupplier: QuotationFromSupplier;
		QuotationToCustomerDetails: QuotationToCustomerDetail[];
		QuotationToCustomerDocuments: QuotationToCustomerDocument[];
		User: User;
	}
	export class QuotationToCustomerDetail extends TCRMEntity {
		Id: number;
		IdProduct: number;
		IdQuotationToCustomer: number;
		Product: Product;
		QCCostPrice: number;
		QCExpenseSMIM_Cost: number;
		QCExpenseSupplierSide_Cost: number;
		QCProductDesc: string;
		QCProfit: number;
		QCQuantity: number;
		QCSalePrice: number;
		QCSalesPriceBased: number;
		QuotationToCustomer: QuotationToCustomer;
		QuotationToCustomerDetailSumaries: QuotationToCustomerDetailSumary[];
	}
	export class QuotationToCustomerDetailSumary extends TCRMEntity {
		Comment: string;
		DateCreated: Date;
		Id: number;
		IdQuotationToCustomerDetail: number;
		QCQuantity: number;
		QuotationToCustomerDetail: QuotationToCustomerDetail;
		QuotationToCustomerDetailSumaryProperties: QuotationToCustomerDetailSumaryProperty[];
	}
	export class QuotationToCustomerDetailSumaryProperty extends TCRMEntity {
		Id: number;
		IdProperty: number;
		IdQuotationToCustomerDetailSumary: number;
		Property: Property;
		PropertyValue: string;
		QuotationToCustomerDetailSumary: QuotationToCustomerDetailSumary;
	}
	export class QuotationToCustomerDocument extends TCRMEntity {
		DateUploaded: Date;
		DocId: string;
		DocName: string;
		DocumentType: DocumentType;
		Id: number;
		IdDocumentType: number;
		IdQuotationToCustomer: number;
		ParentFolder: string;
		QDocNotes: string;
		QuotationToCustomer: QuotationToCustomer;
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
	export class ReturnSaveRequest {
		Data: any;
		Message: string;
	}
	export class Sector extends TCRMEntity {
		Customers: Customer[];
		Description: string;
		Id: number;
		Name: string;
		Opportunities: Opportunity[];
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
		ActionOpportunities: ActionOpportunity[];
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
	export class User extends TCRMEntity {
		FirstName: string;
		Id: number;
		IsActive: boolean;
		IsAdmin: boolean;
		LastName: string;
		Opportunities: Opportunity[];
		QuotationFromSuppliers: QuotationFromSupplier[];
		QuotationToCustomers: QuotationToCustomer[];
		Responsibles: Responsible[];
		UserName: string;
		userPassword: string;

		NameDescription: string = this.FirstName + ' ' + this.LastName;
	}





export class GeGetOpportunities extends TCRMEntity{
   Idcustomer: number;
   CustomerName: string;
   ResponsibleName: string;
   DateCreated: Date;
   IdStatus: number;
   StatusName: string;
   LastUpdated: Date;
   IdUser: number;
   UserName: string;
   PastDue: number;
   DaysUpdate: number;
   IsActive: boolean;
   AsImporter: boolean;

}

export class GetProductProperty extends TCRMEntity {
   POrder: number;
   IsRequired: boolean;
   IdProperty: number;
}